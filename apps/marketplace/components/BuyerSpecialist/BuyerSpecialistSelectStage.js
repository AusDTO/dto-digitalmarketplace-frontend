import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect, { PanelCategorySelect } from 'marketplace/components/SellerSelect/SellerSelect'
import SelectedSellersControl from 'marketplace/components/BuyerBriefFlow/SelectedSellersControl'
import RadioList from 'shared/form/RadioList'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'

export const done = v =>
  requiredCategory(v) &&
  requiredChoice(v) &&
  atLeastOneSeller(v)

const requiredCategory = v => v.sellerCategory
const requiredChoice = v => !v.sellerCategory || v.openTo
const atLeastOneSeller = v => (!v.openTo || v.openTo === 'all') || (v.openTo === 'category' && v.sellers && Object.keys(v.sellers).length > 0)

export class BuyerSpecialistSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerSelect = this.handleSellerSelect.bind(this)
    this.handleSellerCategorySelect = this.handleSellerCategorySelect.bind(this)
  }

  handleSellerSelect(seller) {
    const newState = { ...this.props[this.props.model].sellers }
    newState[seller.code] = { name: seller.name }
    this.props.updateSelectedSellers(newState)
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
          title="An error occurred"
          model={this.props.model}
          messages={{
            requiredCategory: 'You must select a panel category',
            requiredChoice: 'You must select who can respond',
            atLeastOneSeller: 'You must select at least one seller',
          }}
        />
        <PanelCategorySelect
          id="select-seller"
          categories={categories}
          onChange={e => this.handleSellerCategorySelect(e.target.value)}
          selectedCategory={this.props[this.props.model].sellerCategory}
        />
        {this.props[this.props.model].sellerCategory && (
          <div>
            <div>
              <RadioList
                id="openTo"
                label="Accept responses from:"
                name="openTo"
                model={`${this.props.model}.openTo`}
                options={[
                  {
                    label: 'Any seller in the panel category',
                    value: 'all'
                  },
                  {
                    label: 'Specific sellers in the panel category',
                    value: 'category'
                  }
                ]}
                messages={{}}
                onChange={() => this.props.resetSelectedSellers()}
              />
            </div>
            {this.props[this.props.model].openTo === 'category' && (
              <div>
                <div>
                  <SellerSelect
                    label="Seller name"
                    description={
                      <span>
                        Only sellers approved in the category you have selected can respond. You can see each seller&apos;s
                        categories in the{' '}
                        <a href="/search/sellers" target="_blank" rel="noopener noreferrer">
                          seller catalogue
                        </a>.
                      </span>
                    }
                    showSelected={false}
                    showSearchButton={false}
                    categories={categories}
                    onSellerSelect={this.handleSellerSelect}
                    onSellerCategorySelect={this.handleSellerCategorySelect}
                    selectedCategory={this.props[this.props.model].sellerCategory}
                    showCategorySelect={false}
                  />
                </div>
                <SelectedSellersControl
                  id="selected-sellers"
                  model={`${this.props.model}.sellers`}
                  onRemoveClick={sellerCode => this.removeSeller(sellerCode)}
                />
              </div>
            )}
          </div>
        )}
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
  resetOpenTo: () => dispatch(actions.change(`${props.model}.openTo`, null)),
  updateSelectedSellerCategory: category => dispatch(actions.change(`${props.model}.sellerCategory`, category))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSpecialistSelectStage)
