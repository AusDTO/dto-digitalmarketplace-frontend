import React from 'react'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
    const url = `./download_activity_reports/${this.state.reportType}`
    window.location.href = url
    this.props.history.push('./activity_reports')


  }

  handleChange(event) {
    this.setState({
      reportType: event.target.value
    })
  }

  render() {
      return (
        <form method="GET">
          <AUheading size="xl" level="1">
          Activity reports
          </AUheading>
          <input type="radio" id="allSellersCategoryMaxDailyRates" name="reportType" value="maxDailyRates" onChange={this.handleChange} checked/>
          <label htmlFor="allSellersCategoryMaxDailyRates">All sellers category max daily rates</label>
          <input type="radio" id="allSellersApprovedInCategory" name="reportType" value="approvedInCategory" onChange={this.handleChange}/>
          <label htmlFor="allSellersApprovedInCategory">All sellers approved in a category</label>
          <AUbutton  onClick={this.handleSubmit}>
          Download reports
          </AUbutton>
        
        </form>
      )
  }
}


export default ActivityReports
