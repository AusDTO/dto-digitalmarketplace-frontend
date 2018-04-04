import React, { Component } from 'react'
import { Checkbox } from '@gov.au/control-input/lib/js/react.js'
import Button from '@gov.au/buttons/lib/js/react.js'
import styles from './SellerUnsuccessful.scss'

export class SellerUnsuccessfulSelect extends Component {
  constructor(props) {
    super(props)
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
    if (checked) {
      this.props.selectSeller(el.name)
    } else {
      this.props.deselectSeller(el.name)
    }
  }

  isSelected(id) {
    let selected = false
    this.props.selectedSellers.map(seller => {
      if (seller.id === parseInt(id, 10)) {
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
            {this.props.briefResponses.map(response =>
              <li key={response.supplierCode}>
                <Checkbox
                  name={`${response.supplierCode}`}
                  label={response.supplierName}
                  value=""
                  onChange={this.handleChange}
                  checked={this.isSelected(response.supplierCode)}
                />
              </li>
            )}
          </ul>
          <p>
            <Button onClick={this.handleContinueClick} text="Continue" />
          </p>
        </div>
      </div>
    )
  }
}

export default SellerUnsuccessfulSelect
