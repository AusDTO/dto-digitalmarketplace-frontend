import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './SellerNotify.scss'

export class SellerNotifySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: !props.hasSelectedASeller()
    }
    this.handleContinueClick = this.handleContinueClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('select', 'doing')
  }

  handleContinueClick(e) {
    e.preventDefault()
    if (this.props.hasSelectedASeller()) {
      this.props.setStageStatus('select', 'done')
      this.props.setStageDoneStatus('select', true)
      this.props.moveToNextStage('select')
    }
  }

  handleChange(e) {
    const el = e.target
    const checked = el.checked
    const callback = () => {
      this.setState({
        disabled: !this.props.hasSelectedASeller()
      })
      if (!this.props.hasSelectedASeller()) {
        this.props.setStageDoneStatus('select', false)
      } else {
        this.props.setStageDoneStatus('select', true)
      }
    }
    if (checked) {
      this.props.selectSeller(el.name, callback)
    } else {
      this.props.deselectSeller(el.name, callback)
    }
  }

  isSelected(supplierCode) {
    let selected = false
    this.props.selectedSellers.map(seller => {
      if (seller.supplier_code === parseInt(supplierCode, 10)) {
        selected = true
      }
      return true
    })
    return selected
  }

  render() {
    const sellers = this.props.sellers.filter(response => response.successful === null)

    if (sellers.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <AUheading size="lg" level="2">
              Select sellers
            </AUheading>
            <p>There a no sellers to select.</p>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <AUheading size="lg" level="2">
            Select sellers
          </AUheading>
          <ul className={styles.sellerList}>
            {sellers.map(response =>
              <li key={response.supplier_code}>
                <AUcheckbox
                  name={`${response.supplier_code}`}
                  label={response.supplier_name}
                  value=""
                  onChange={this.handleChange}
                  checked={this.isSelected(response.supplier_code)}
                />
              </li>
            )}
          </ul>
          <p>
            <AUbutton onClick={this.handleContinueClick} disabled={this.state.disabled}>
              Continue
            </AUbutton>
          </p>
        </div>
      </div>
    )
  }
}

SellerNotifySelect.propTypes = {
  sellers: PropTypes.array.isRequired,
  selectedSellers: PropTypes.array.isRequired,
  hasSelectedASeller: PropTypes.func.isRequired,
  setStageStatus: PropTypes.func.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired,
  selectSeller: PropTypes.func.isRequired,
  deselectSeller: PropTypes.func.isRequired,
  moveToNextStage: PropTypes.func.isRequired
}

export default SellerNotifySelect
