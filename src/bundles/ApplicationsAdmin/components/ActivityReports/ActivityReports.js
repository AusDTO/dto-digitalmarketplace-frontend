import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { AUradio } from '@gov.au/control-input'

import styles from './ActivityReports.css'

export class ActivityReports extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      reportType: 'maxDailyRates'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = `/download_activity_reports/${this.state.reportType}`
    window.location.href = url

  }

  handleChange(event) {
    this.setState({
      reportType: event.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <AUheading size="xl" level="1">
          Activity reports
        </AUheading>
        <div styleName="radio-block">
          <AUradio
            label="All sellers category max daily rates"
            name="reportType"
            id="allSellersCategoryMaxDailyRates"
            value="maxDailyRates"
            onChange={this.handleChange}
            block
          />
          <AUradio
            label="All sellers approved in a category"
            name="reportType"
            id="allSellersApprovedInCategory"
            value="approvedInCategory"
            onChange={this.handleChange}
            block
          />
        </div>
        <AUbutton  onClick={this.handleSubmit}>
          Download reports
        </AUbutton>
      </React.Fragment>
    )
  }
}


export default ActivityReports
