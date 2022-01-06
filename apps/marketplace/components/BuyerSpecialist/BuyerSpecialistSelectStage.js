import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect from 'marketplace/components/SellerSelect/SellerSelect'
import SelectedSellersControl from 'marketplace/components/BuyerBriefFlow/SelectedSellersControl'
import RadioList from 'shared/form/RadioList'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'

// For grabbing count of ICT Labour Hire sellers
import { labourHireSupplierCount } from 'marketplace/actions/supplierActions'

// For warning  message
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import mainStyles from '../../main.scss'

// Components outside of the React Component so they are not crontrolled by strict javascript variable requirement
let isBuyerSpecialistSelectStageMounted = false // Allows to tell if we can set the state so we dont get React errors setting sellerCOunt

const requiredCategory = v => v.sellerCategory
const requiredChoice = v => !v.sellerCategory || v.openTo
const atLeastOneSeller = v =>
  !v.openTo || v.openTo === 'all' || (v.openTo === 'selected' && v.sellers && Object.keys(v.sellers).length > 0)

export const done = v => requiredCategory(v) && requiredChoice(v) && atLeastOneSeller(v)

export class BuyerSpecialistSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerSelect = this.handleSellerSelect.bind(this)
    this.handleSellerCategorySelect = this.handleSellerCategorySelect.bind(this)
  }

  // For some reason this gets called twice but a not big issue because this is called once per page load for a buyer making a whole new opportunity
  componentDidMount() {
    isBuyerSpecialistSelectStageMounted = true

    labourHireSupplierCount()
      .then(data => {
        if (isBuyerSpecialistSelectStageMounted) {
          this.setState({ sellerCount: data })
        }
      })
      .catch(() => {})

    // This is our dummy category since we dont need an actual category anymore because there is no category picker
    this.handleSellerCategorySelect('labour_hire')
  }

  componentWillUnmount() {
    isBuyerSpecialistSelectStageMounted = false
  }

  handleSellerSelect(seller) {
    const newState = { ...this.props[this.props.model].sellers }
    newState[seller.code] = { name: seller.name }
    this.props.updateSelectedSellers(newState)
  }

  handleLabourHireSellerSelect(seller) {
    this.handleSellerSelect(seller)
  }

  handleSellerCategorySelect(category) {
    if (category !== this.props[this.props.model].sellerCategory) {
      this.props.updateSelectedSellerCategory(category)
      this.props.resetOpenTo()
      this.props.resetSelectedSellers()
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

    // This is our dummy category which allows us to have the filter not use category and use seller_types.labour_hire
    categories.push({
      value: '0000000',
      text: 'labour_hire'
    })

    return (
      <Form
        model={this.props.model}
        validators={{
          '': {
            requiredCategory,
            requiredChoice,
            atLeastOneSeller
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
        {
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
                onChange={() => this.props.resetSelectedSellers()}
              />
            </div>
            {this.props[this.props.model].openTo === 'all' && this.state != null && (
              <AUpageAlert
                as="warning"
                className={`${mainStyles.pageAlert} ${mainStyles.marginTop2} ${mainStyles.marginRight2}`}
              >
                <AUheading level="2" size="lg">
                  You are about to invite all {this.state.sellerCount || ''} sellers.
                </AUheading>
                <div className={`${mainStyles.marginTop1} ${mainStyles.noMaxWidth}`}>
                  <p className={mainStyles.noMaxWidth}>
                    You will need to reply to all seller questions, evaluate all quotes and debrief all unsuccessful
                    sellers (where requested).
                    <br />
                    You should only invite all sellers if there is a business need for this approach. If you have
                    questions, please
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
                  selectedCategory={'labour_hire'}
                  allSuppliers
                  searchParams={'?type=ICT Labour Hire&sort_by=a-z&view=sellers&user_role=buyer'}
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
          </div>
        }
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
  resetSelectedSellers: () => dispatch(actions.change(`${props.model}.sellers`, {})),
  updateSelectedSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers)),
  resetOpenTo: () => dispatch(actions.change(`${props.model}.openTo`, '')),
  updateSelectedSellerCategory: category => dispatch(actions.change(`${props.model}.sellerCategory`, category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerSpecialistSelectStage)
