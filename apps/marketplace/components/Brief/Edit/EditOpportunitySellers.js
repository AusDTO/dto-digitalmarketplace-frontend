import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Link, Redirect } from 'react-router-dom'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import { findSuppliers } from 'marketplace/actions/supplierActions'
import ItemSelect from 'marketplace/components/ItemSelect/ItemSelect'
import { required } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import AddSellerActions from './AddSellerActions'
import AddSellerListItems from './AddSellerListItems'

import styles from '../../../main.scss'

class EditOpportunitySellers extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0)

    this.state = {
      daysOpportunityOpenFor: differenceInCalendarDays(
        format(new Date(props.brief.dates.closing_time), 'YYYY-MM-DD'),
        props.brief.dates.published_date
      ),
      daysUntilOpportunityCloses: differenceInCalendarDays(props.brief.dates.closing_time, new Date()),
      initialSellers: props[props.model].sellers ? props[props.model].sellers : [],
      redirectToEditsTable: false,
      searchResults: [],
      sellerName: '',
      sellers: [],
      showClosingDateWarning: false,
      timeoutId: null
    }

    this.state.daysUntilOpportunityCloses =
      this.state.daysUntilOpportunityCloses < 0 ? 0 : this.state.daysUntilOpportunityCloses

    if (
      this.state.daysUntilOpportunityCloses <= 2 ||
      this.state.daysUntilOpportunityCloses <= Math.round(this.state.daysOpportunityOpenFor / 2)
    ) {
      this.state.showClosingDateWarning = true
    }

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
    this.handleRemoveSellerClick = this.handleRemoveSellerClick.bind(this)
    this.handleSellerClick = this.handleSellerClick.bind(this)
    this.handleSellerSearchChange = this.handleSellerSearchChange.bind(this)
  }

  handleCancelClick = () => {
    const { initialSellers } = this.state

    this.props.updateSellers(initialSellers)
    this.setState({
      redirectToEditsTable: true
    })
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
          findSuppliers(this.state.sellerName, brief.sellerCategory, false, Object.keys(brief.sellers))
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
    const { model } = this.props
    const { daysUntilOpportunityCloses, showClosingDateWarning } = this.state
    const hasSelectedSellers = Object.keys(this.props[model].sellers).length > 0

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
        {hasSelectedSellers && showClosingDateWarning && (
          <div className={`row ${styles.marginTop1}`}>
            <AUpageAlert as="warning" className={styles.pageAlert}>
              <AUheading level="2" size="lg">
                {daysUntilOpportunityCloses === 0 && 'Opportunity closing today!'}
                {daysUntilOpportunityCloses !== 0 &&
                  `Opportunity closing in ${daysUntilOpportunityCloses} day${`${
                    daysUntilOpportunityCloses > 1 ? 's' : ''
                  }`}!`}
              </AUheading>
              <p className={styles.noMaxWidth}>
                We recommend you <Link to="/closing-date">extend the closing date</Link> to allow invited sellers you
                added enough time to prepare and submit their responses.
              </p>
            </AUpageAlert>
          </div>
        )}
        <div className={`row ${styles.marginTop2}`}>
          <AUbutton type="submit">Continue</AUbutton>
          <AUbutton as="tertiary" onClick={this.handleCancelClick}>
            Cancel update
          </AUbutton>
        </div>
      </Form>
    )
  }
}

EditOpportunitySellers.defaultProps = {
  brief: {
    dates: {
      closing_time: '',
      published_date: ''
    }
  },
  model: ''
}

EditOpportunitySellers.propTypes = {
  brief: PropTypes.shape({
    dates: PropTypes.shape({
      closing_time: PropTypes.string.isRequired,
      published_date: PropTypes.string.isRequired
    }).isRequired
  }),
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  findSellers: (keyword, category, allSellers, exclude) =>
    dispatch(findSuppliers(keyword, category, allSellers, exclude)),
  updateSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunitySellers)
