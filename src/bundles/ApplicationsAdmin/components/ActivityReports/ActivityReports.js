import React from 'react'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
  
export class ActivityReports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reportType: 'allSellersCategoryMaxDailyRates'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    const url = `/admin/download_reports/${this.state.reportType}`
    window.location.href = url
  }

  handleChange(event) {
    this.setState({
      reportType: event.target.value
    })
  }

  render() {
      return (
        <form>
        <AUheading size="xl" level="1">
          Activity reports
        </AUheading>
        <p>Download opportunity report data for your agency or a current list of approved sellers.</p>
        <input type="radio" id="allSellersCategoryMaxDailyRates" name="reportType" value="allSellersCategoryMaxDailyRates" onChange={this.handleChange} checked/>
        <label htmlFor="allSellersCategoryMaxDailyRates">All Sellers Category Max Daily Rates</label>
        <input type="radio" id="allSellersApprovedInCategory" name="reportType" value="allSellersApprovedInCategory" onChange={this.handleChange}/>
        <label htmlFor="allSellersApprovedInCategory">All Sellers Approved in a Category</label>
        <AUbutton  onClick={this.handleSubmit}>
          Download reports
        </AUbutton>
        </form>
      )
  }
}


export default ActivityReports



