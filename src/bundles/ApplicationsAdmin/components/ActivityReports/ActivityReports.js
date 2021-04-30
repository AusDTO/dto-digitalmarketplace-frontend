import React from 'react'
import { connect } from 'react-redux'

import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import PropTypes from 'prop-types'
//import formProps from 'shared/form/formPropsSelector'
//import RadioList from 'shared/form/RadioList'
//import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
// mport ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
//import { Form, actions } from 'react-redux-form'
import { AUcheckbox } from '@gov.au/control-input'

//import styles from '../../main.scss'

import { saveAgency } from '../../redux/modules/agency'
import { downloadReports } from '../../redux/modules/activity_reports'
const model = 'downloadReports'
const startDateIsValid = v => v.reportType === 'sellersCatalogue' || validDate(v.startDate, false)
const endDateIsValid = v => v.reportType === 'sellersCatalogue' || validDate(v.endDate, false)
const startAndEndIsValid = v =>
  !(startDateIsValid(v) && endDateIsValid(v)) ||
  (v.reportType === 'sellersCatalogue' || startDateIsBeforeEndDate(v.startDate, v.endDate))

const handleSubmit = values => {
    const url = '/api/2/admin/download/reports/' + this.state.reportType
    window.location.href = url
  }
  
  const handleSubmitFailed = () => {
    window.scrollTo(0, 0)
  }
  
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
    // alert('You are submitting ' + this.state.reportType)
    const url = `/admin/download_reports/${this.state.reportType}`
    window.location.href = url
    //this.props.downloadReports(this.state.reportType)
    
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

const mapStateToProps = ({ loading}) => {
    return { loading }
  }

  const mapDispatchToProps = dispatch => {
    return {
      downloadReports: reportType => dispatch(downloadReports(reportType))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ActivityReports)



