import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect from 'marketplace/components/SellerSelect/SellerSelect'
import SelectedSellersControl from './SelectedSellersControl'

export class BuyerRFQSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerSelect = this.handleSellerSelect.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { model } = this.props
    if (JSON.stringify(prevProps[model].sellers) !== JSON.stringify(this.props[model].sellers)) {
      this.props.saveBrief()
    }
  }

  handleSellerSelect(seller) {
    const newState = { ...this.props[this.props.model].sellers }
    newState[seller.code] = { name: seller.name }
    this.props.updateSelectedSellers(newState)
  }

  removeSeller(sellerCode) {
    const newState = { ...this.props[this.props.model].sellers }
    delete newState[sellerCode]
    this.props.updateSelectedSellers(newState)
  }

  render() {
    return (
      <div>
        <AUheading level="1" size="xl">
          Select sellers
        </AUheading>
        <SelectedSellersControl
          id="selected-sellers"
          model={`${this.props.model}.sellers`}
          onRemoveClick={sellerCode => this.removeSeller(sellerCode)}
          validators={{
            required: val => val && Object.keys(val).length > 0
          }}
          messages={{
            required: 'You must select at least one seller'
          }}
        />
        <SellerSelect showSelected={false} showSearchButton={false} onSellerSelect={this.handleSellerSelect} />
      </div>
    )
  }
}

BuyerRFQSelectStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveBrief: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  updateSelectedSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQSelectStage)
