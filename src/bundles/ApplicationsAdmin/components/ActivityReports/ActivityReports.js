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

  handleSubmit_old(event) {
    //event.preventDefault();
    //const url = `./download_activity_reports/${this.state.reportType}`
    //window.location.href = url
    //this.props.history.push('./activity_reports')
    event.preventDefault();
    const url = `/download_activity_reports/${this.state.reportType}`
    console.log('ddd111')
    console.log(this.state.reportType)
    var my = window.location.href
    console.log(my)
    var len = my.length;
    console.log(len)
    var rootbase = my.trim().substr(0,my.length-17)
    var fullurl = rootbase + url
    window.location.href = rootbase + url

    this.props.history.push('./activity_reports')
    //this.props.history.push(fullurl)
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
