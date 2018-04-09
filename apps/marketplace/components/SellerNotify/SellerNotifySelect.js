import React, { Component } from 'react'
import { Checkbox } from '@gov.au/control-input/lib/js/react.js'
import Button from '@gov.au/buttons/lib/js/react.js'
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
      this.props.moveToNextStage('select')
    }
  }

  handleChange(e) {
    const el = e.currentTarget
    const checked = el.checked
    const setDisabledState = () => {
      this.setState({
        disabled: !this.props.hasSelectedASeller()
      })
    }
    if (checked) {
      this.props.selectSeller(el.name, setDisabledState)
    } else {
      this.props.deselectSeller(el.name, setDisabledState)
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
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Select sellers</h2>
          <ul className={styles.sellerList}>
            {this.props.sellers.map(response =>
              <li key={response.supplier_code}>
                <Checkbox
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
            <Button onClick={this.handleContinueClick} disabled={this.state.disabled} text="Continue" />
          </p>
        </div>
      </div>
    )
  }
}

export default SellerNotifySelect
