import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect from 'marketplace/components/SellerSelect/SellerSelect'
import RadioList from 'shared/form/RadioList'
import { required } from 'marketplace/components/validators'
import SelectedSellersControl from './SelectedSellersControl'
import ErrorAlert from './ErrorAlert'
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
            requiredWhoCanRespond: formValues => required(formValues.sellerSelector),
            requiredSellers: formValues =>
              formValues.sellerSelector === 'allSellers' ||
              (formValues.sellerSelector === 'someSellers' && Object.keys(formValues.sellers).length > 0)
          }
        }}
        onSubmit={this.props.onSubmit}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Who can respond?
        </AUheading>
        <ErrorAlert
          title="An error occurred"
          model={this.props.model}
          messages={{
            requiredWhoCanRespond: 'Who can respond is required',
            requiredSellers: 'You must select at least one seller'
          }}
        />
        <div className={styles.sellerSelector}>
          <RadioList
            id="sellerSelector"
            label=""
            name="sellerSelector"
            model={`${this.props.model}.sellerSelector`}
            options={[
              {
                label: 'Accept responses from any seller on the panel',
                value: 'allSellers'
              },
              {
                label: 'Only accept responses from specific sellers',
                value: 'someSellers'
              }
            ]}
            messages={{}}
          />
        </div>
        {this.props[this.props.model].sellerSelector === 'someSellers' && (
          <span>
            <p>
              Only sellers approved in the category you select can respond. You can see each seller&apos;s categories in
              the <a href="/search/sellers">seller catalogue</a>.
            </p>
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <div className={styles.selectSellers}>
                  <SellerSelect
                    label="Seller name"
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
            </div>
          </span>
        )}
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerATMSelectStage.defaultProps = {
  onSubmit: () => {}
}

BuyerATMSelectStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveModel: PropTypes.func.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  domains: state.brief.domains
})

const mapDispatchToProps = (dispatch, props) => ({
  updateSelectedSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers)),
  resetSelectedSellers: () => dispatch(actions.change(`${props.model}.sellers`, {})),
  updateSelectedSellerCategory: category => dispatch(actions.change(`${props.model}.sellerCategory`, category))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerATMSelectStage)
