import React from 'react'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
  
export class ActivityReports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      reportType: '',
      acceptEnabled: false
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
      reportType: event.target.value,
      acceptEnabled: true
    })
  }

  render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <AUheading size="xl" level="1">
          Activity reports
        </AUheading>
        <p>Download opportunity report data for your agency or a current list of approved sellers.</p>
        <input type="radio" id="report1" name="reportType" value="report1" onChange={this.handleChange}/>
        <label htmlFor="report1">All Sellers Category Max Daily Rates</label>
        <input type="radio" id="report2" name="reportType" value="report2" onChange={this.handleChange}/>
        <label htmlFor="report2">All Sellers Approved in a Category</label>
        <AUbutton type="submit" disabled={!this.state.acceptEnabled}>
          Download reports
        </AUbutton>
        </form>
      )
  }
}


export default ActivityReports



