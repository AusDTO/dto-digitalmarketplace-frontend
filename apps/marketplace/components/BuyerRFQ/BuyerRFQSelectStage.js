import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect from 'marketplace/components/SellerSelect/SellerSelect'
import styles from './BuyerRFQSelectStage.scss'

export class BuyerRFQSelectStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellers: { ...props.model.sellers }
    }

    this.handleSellerSelect = this.handleSellerSelect.bind(this)
  }

  handleSellerSelect(seller) {
    this.setState(curState => {
      const newState = { ...curState }
      newState.sellers[seller.code] = seller
      this.props.updateModel(newState)
      return newState
    })
  }

  removeSeller(sellerCode) {
    this.setState(curState => {
      const newState = { ...curState }
      delete newState.sellers[sellerCode]
      this.props.updateModel(newState)
      return newState
    })
  }

  render() {
    return (
      <div>
        <AUheading level="1" size="xl">
          Select sellers
        </AUheading>
        {Object.keys(this.state.sellers).length > 0 && (
          <ol className={styles.selectedSellers}>
            {Object.keys(this.state.sellers).map(sellerCode => (
              <li key={sellerCode}>
                {this.state.sellers[sellerCode].name}
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
  updateModel: PropTypes.func.isRequired
}

export default BuyerRFQSelectStage
