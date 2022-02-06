import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import SellerSelect, { PanelCategorySelect } from 'marketplace/components/SellerSelect/SellerSelect'
import SelectedSellersControl from 'marketplace/components/BuyerBriefFlow/SelectedSellersControl'
import RadioList from 'shared/form/RadioList'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { countLabourHireSellers } from 'marketplace/actions/supplierActions'

import mainStyles from '../../main.scss'

const requiredChoice = v => v.openTo
const atLeastOneSeller = v =>
  !v.openTo || v.openTo === 'all' || (v.openTo === 'selected' && v.sellers && Object.keys(v.sellers).length > 0)
const requiredCategory = v => v.sellerCategory

export const done = v => requiredCategory(v) && requiredChoice(v) && atLeastOneSeller(v)

export class BuyerSpecialistSelectStage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalLabourHireSellers: 0
    }

    this.handleSellerSelect = this.handleSellerSelect.bind(this)
    this.handleSellerCategorySelect = this.handleSellerCategorySelect.bind(this)
  }

  componentDidMount() {
    this.props
      .countSellers()
      .then(response => {
        if (response.status === 200) {
          this.setState({
            totalLabourHireSellers: response.data
          })
        }
      })
      .catch(() => {
        this.setState({
          totalLabourHireSellers: 0
        })
      })
  }

  handleSellerSelect(seller) {
    const newState = { ...this.props[this.props.model].sellers }
    newState[seller.code] = { name: seller.name }
    this.props.updateSelectedSellers(newState)
  }

  handleSellerCategorySelect(category) {
    if (category !== this.props[this.props.model].sellerCategory) {
      this.props.updateSelectedSellerCategory(category)
    }
  }

  removeSeller(sellerCode) {
    const newState = { ...this.props[this.props.model].sellers }
    delete newState[sellerCode]
    this.props.updateSelectedSellers(newState)
  }

  render() {
    const categories = [
      {
        value: '',
        text: 'Select category'
      }
    ]
    this.props.domains.map(domain => {
      categories.push({
        value: domain.id,
        text: domain.name
      })
      return true
    })

    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            requiredChoice,
            atLeastOneSeller,
            requiredCategory
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Who can respond?
        </AUheading>
        <ErrorAlert
          model={this.props.model}
          messages={{
            requiredCategory: 'You must select a category',
            requiredChoice: 'You must select who can respond',
            atLeastOneSeller: 'You must add at least one seller'
          }}
        />
        <div>
          <div>
            <RadioList
              id="openTo"
              label="Accept responses from:"
              name="openTo"
              model={`${this.props.model}.openTo`}
              options={[
                {
                  label: 'Any seller that provides ICT Labour Hire',
                  value: 'all'
                },
                {
                  label: 'Specific ICT Labour Hire sellers',
                  value: 'selected'
                }
              ]}
              messages={{}}
            />
          </div>
          {this.props[this.props.model].openTo === 'all' && (
            <AUpageAlert as="warning">
              <AUheading level="2" size="lg">
                You are about to invite{' '}
                {this.state.totalLabourHireSellers >= 1 ? this.state.totalLabourHireSellers : 'all'} seller
                {this.state.totalLabourHireSellers === 1 ? '' : 's'}.
              </AUheading>
              <div className={mainStyles.marginTop1}>
                <p>
                  You will need to reply to all seller questions, evaluate all quotes and debrief all unsuccessful
                  sellers (where requested).
                </p>
                <p>
                  You should only invite all sellers if there is a business need for this approach. If you have
                  questions, please{' '}
                  <a href="/contact-us" rel="noopener noreferrer" target="_blank">
                    contact us
                  </a>
                  .
                </p>
              </div>
            </AUpageAlert>
          )}
          {this.props[this.props.model].openTo === 'selected' && (
            <React.Fragment>
              <SellerSelect
                briefId={this.props[this.props.model].id}
                label="Seller name"
                showSelected={false}
                showSearchButton={false}
                categories={categories}
                onSellerSelect={this.handleSellerSelect}
                onSellerCategorySelect={this.handleSellerCategorySelect}
                showCategorySelect={false}
                notFoundMessage="Seller is not on the Digital Marketplace"
                selectedCategory="labourHire"
                showSellerCatalogueLink
              />
              <br />
              <SelectedSellersControl
                id="selected-sellers"
                model={`${this.props.model}.sellers`}
                onRemoveClick={sellerCode => this.removeSeller(sellerCode)}
              />
            </React.Fragment>
          )}
          <PanelCategorySelect
            id="select-seller"
            categories={categories}
            onChange={e => this.handleSellerCategorySelect(e.target.value)}
            selectedCategory={this.props[this.props.model].sellerCategory}
            label="Category"
            description="Please select the category that best suits your opportunity. This is for reporting purposes only and will not limit who can respond."
            helpLabel="View category descriptions"
          />
        </div>
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerSpecialistSelectStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerSpecialistSelectStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  domains: state.brief.domains
})

const mapDispatchToProps = (dispatch, props) => ({
  countSellers: () => dispatch(countLabourHireSellers()),
  updateSelectedSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers)),
  updateSelectedSellerCategory: category => dispatch(actions.change(`${props.model}.sellerCategory`, category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerSpecialistSelectStage)
