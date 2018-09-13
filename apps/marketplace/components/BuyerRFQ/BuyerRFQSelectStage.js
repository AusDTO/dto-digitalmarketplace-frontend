import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerSelect from 'marketplace/components/SellerSelect/SellerSelect'
import styles from './BuyerRFQSelectStage.scss'

export class BuyerRFQSelectStage extends Component {
  constructor(props) {
    super(props)
    this.handleSellerSelect = this.handleSellerSelect.bind(this)
  }

  componentDidMount() {
    this.updateDoneStatus()
  }

  componentDidUpdate(prevProps) {
    this.updateDoneStatus()

    const { model } = this.props
    if (JSON.stringify(prevProps[model].sellers) !== JSON.stringify(this.props[model].sellers)) {
      this.props.saveBrief()
    }
  }

  updateDoneStatus() {
    const { model } = this.props
    // set this stage to done when props update and there is atleast one selected seller
    // and set it back to not-done when there is no seller selected
    if (Object.keys(this.props[model].sellers).length > 0 && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if (Object.keys(this.props[model].sellers).length === 0 && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
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
    const { model } = this.props
    return (
      <div>
        <AUheading level="1" size="xl">
          Select sellers
        </AUheading>
        {Object.keys(this.props[model].sellers).length > 0 && (
          <ol className={styles.selectedSellers}>
            {Object.keys(this.props[model].sellers).map(sellerCode => (
              <li key={sellerCode}>
                {this.props[model].sellers[sellerCode].name}
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
  model: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired,
  saveBrief: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  updateSelectedSellers: sellers => dispatch(actions.change(`${props.model}.sellers`, sellers))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQSelectStage)
