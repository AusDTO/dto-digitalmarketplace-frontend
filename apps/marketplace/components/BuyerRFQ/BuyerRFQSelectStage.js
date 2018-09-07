import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect from 'marketplace/components/SellerSelect/SellerSelect'
import styles from './BuyerRFQSelectStage.scss'

export class BuyerRFQSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerSelect = this.handleSellerSelect.bind(this)
  }

  componentDidUpdate() {
    // set this stage to done when props update and there is atleast one selected seller
    // and set it back to not-done when there is no seller selected
    if (Object.keys(this.props.model.sellers).length > 0 && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if (Object.keys(this.props.model.sellers).length === 0 && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
    }
  }

  handleSellerSelect(seller) {
    const newState = { ...this.props.model }
    newState.sellers[seller.code] = seller
    this.props.updateModel(newState)
  }

  removeSeller(sellerCode) {
    const newState = { ...this.props.model }
    delete newState.sellers[sellerCode]
    this.props.updateModel(newState)
  }

  render() {
    return (
      <div>
        <AUheading level="1" size="xl">
          Select sellers
        </AUheading>
        {Object.keys(this.props.model.sellers).length > 0 && (
          <ol className={styles.selectedSellers}>
            {Object.keys(this.props.model.sellers).map(sellerCode => (
              <li key={sellerCode}>
                {this.props.model.sellers[sellerCode].name}
                <a
                  href="#remove"
                  onClick={e => {
                    e.preventDefault()
                    this.removeSeller(sellerCode)
                  }}
                >
                  Remove
                </a>
              </li>
            ))}
          </ol>
        )}
        <SellerSelect showSelected={false} showSearchButton={false} onSellerSelect={this.handleSellerSelect} />
      </div>
    )
  }
}

BuyerRFQSelectStage.propTypes = {
  model: PropTypes.object.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  updateModel: PropTypes.func.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired
}

export default BuyerRFQSelectStage
