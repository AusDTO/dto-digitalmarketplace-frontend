import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { findSuppliers } from 'marketplace/actions/supplierActions'
import { required } from 'marketplace/components/validators'
import { rootPath } from 'marketplace/routes'
import formProps from 'shared/form/formPropsSelector'
import ItemSelect from 'marketplace/components/ItemSelect/ItemSelect'
import AddSellerActions from './AddSellerActions'
import AddSellerListItems from './AddSellerListItems'

import styles from '../../../main.scss'

class EditOpportunitySellers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToEditsTable: false,
      searchResults: [],
      sellerName: '',
      sellers: [],
      timeoutId: null
    }

    this.handleContinueClick = this.handleContinueClick.bind(this)
    this.handleRemoveSellerClick = this.handleRemoveSellerClick.bind(this)
    this.handleSellerClick = this.handleSellerClick.bind(this)
    this.handleSellerSearchChange = this.handleSellerSearchChange.bind(this)
  }

  handleContinueClick = data => {
    this.props.updateSellers(data.sellers)
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleRemoveSellerClick = code => {
    const updatedSellers = { ...this.props[this.props.model].sellers }
    delete updatedSellers[code]

    this.setState({
      sellers: updatedSellers
    })

    this.props.updateSellers(updatedSellers)
  }

  handleSellerClick = (code, sellerName) => {
    const sellers = { ...this.props[this.props.model].sellers }
    sellers[code] = {
      name: sellerName
    }

    this.setState({
      sellerName: '',
      sellers
    })

    this.props.updateSellers(sellers)
  }

  handleSellerSearchChange = e => {
    const { brief } = this.props

    this.setState({
      sellerName: e.target.value
    })

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId)
    }

    this.setState({
      timeoutId: setTimeout(() => {
        if (this.state.sellerName && this.state.sellerName.length >= 2) {
          findSuppliers(this.state.sellerName, brief.sellerCategory, false)
            .then(data => {
              this.setState({
                searchResults: data.sellers
              })
            })
            .catch(() => {})
        } else {
          this.setState({
            searchResults: []
          })
        }
      }, 500)
    })
  }

  render = () => {
    const { brief, model } = this.props

    if (this.state.redirectToEditsTable) {
      return <Redirect to="/" />
    }

    return (
      <Form
        model={model}
        onSubmit={this.handleContinueClick}
        onSubmitFailed={() => {}}
        validateOn="submit"
        validators={{
          '': {
            required
          }
        }}
      >
        <div className="row">
          <AUheading level="1" size="xl">
            Add sellers
          </AUheading>
        </div>
        <div className={`row ${styles.marginTop1}`}>
          <ItemSelect
            emptyResultsMessage={<li>Seller cannot be found in this category.</li>}
            handleSearchChange={this.handleSellerSearchChange}
            htmlFor="sellers"
            id="sellers"
            inputValue={this.state.sellerName}
            items={this.state.searchResults}
            label="Seller name"
            minimumSearchChars={2}
            model={`${model}.sellers`}
            name="sellers"
            placeholder=""
            resultIsEmpty={this.state.sellers.length < 1}
            resultListItems={
              <AddSellerListItems onSellerClick={this.handleSellerClick} sellers={this.state.searchResults} />
            }
            selectedItemActions={<AddSellerActions onRemoveSellerClick={this.handleRemoveSellerClick} />}
            selectedItemsHeading="Additional sellers to be invited"
            showSearchButton={false}
            validators={{}}
          />
        </div>
        <div className={`row ${styles.marginTop2}`}>
          <AUbutton type="submit">Continue</AUbutton>
          <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/edit`}>
            Cancel update
          </AUbutton>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  findSellers: (keyword, category, allSellers) => dispatch(findSuppliers(keyword, category, allSellers)),
  updateSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunitySellers)
