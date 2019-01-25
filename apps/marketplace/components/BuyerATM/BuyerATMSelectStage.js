import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect, { PanelCategorySelect } from 'marketplace/components/SellerSelect/SellerSelect'
import RadioList from 'shared/form/RadioList'
import SelectedSellersControl from 'marketplace/components/BuyerBriefFlow/SelectedSellersControl'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import styles from './BuyerATMSelectStage.scss'

export class BuyerATMSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerSelect = this.handleSellerSelect.bind(this)
    this.handleSellerCategorySelect = this.handleSellerCategorySelect.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { model } = this.props
    if (JSON.stringify(prevProps[model].sellers) !== JSON.stringify(this.props[model].sellers)) {
      this.props.saveModel()
    }
  }

  handleSellerSelect(seller) {
    const newState = { ...this.props[this.props.model].sellers }
    newState[seller.code] = { name: seller.name }
    this.props.updateSelectedSellers(newState)
  }

  handleSellerCategorySelect(category) {
    if (category !== this.props[this.props.model].sellerCategory) {
      this.props.updateSelectedSellerCategory(category)
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
            requiredChoice: formValues => formValues.openTo,
            requiredCategory: formValues =>
              !formValues.openTo ||
              formValues.openTo === 'all' ||
              formValues.openTo === 'selected' ||
              (formValues.openTo === 'category' && formValues.sellerCategory),
            requiredSeller: formValues =>
              !formValues.openTo ||
              formValues.openTo === 'all' ||
              formValues.openTo === 'category' ||
              Object.keys(formValues.sellers).length > 0
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
            requiredChoice: 'You must select who can respond',
            requiredCategory: 'You must select at least one panel category',
            requiredSeller: 'You must select at least one seller'
          }}
        />
        <div className={styles.sellerSelector}>
          <RadioList
            id="openTo"
            label=""
            name="openTo"
            model={`${this.props.model}.openTo`}
            options={[
              {
                label: 'Accept responses from any seller on the panel',
                value: 'all'
              },
              {
                label: 'Any seller in a panel category',
                value: 'category'
              },
              {
                label: 'Only accept responses from specific sellers',
                value: 'selected'
              }
            ]}
            messages={{}}
            onChange={() => this.props.resetSelectedSellerCategory()}
          />
        </div>
        {this.props[this.props.model].openTo === 'category' && (
          <PanelCategorySelect
            id="select-seller"
            categories={categories}
            onChange={e => this.handleSellerCategorySelect(e.target.value)}
            selectedCategory={this.props[this.props.model].sellerCategory}
          />
        )}
        {this.props[this.props.model].openTo === 'selected' && (
          <div className="row">
            <div className="col-xs-12 col-sm-9">
              <div className={styles.selectSellers}>
                <SellerSelect
                  label="Seller name"
                  description={
                    <span>
                      Only sellers approved in the category you have selected can respond. You can see each
                      seller&apos;s categories in the{' '}
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
                />
              </div>
              <SelectedSellersControl
                id="selected-sellers"
                model={`${this.props.model}.sellers`}
                onRemoveClick={sellerCode => this.removeSeller(sellerCode)}
              />
            </div>
          </div>
        )}
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerATMSelectStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerATMSelectStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveModel: PropTypes.func.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  domains: state.brief.domains
})

const mapDispatchToProps = (dispatch, props) => ({
  updateSelectedSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers)),
  resetSelectedSellers: () => dispatch(actions.change(`${props.model}.sellers`, {})),
  resetSelectedSellerCategory: () => dispatch(actions.change(`${props.model}.sellerCategory`, '')),
  updateSelectedSellerCategory: category => dispatch(actions.change(`${props.model}.sellerCategory`, category))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerATMSelectStage)
