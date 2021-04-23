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

import styles from '../../main.scss'

import { saveAgency } from '../../redux/modules/agency'

const model = 'downloadReports'
const startDateIsValid = v => v.reportType === 'sellersCatalogue' || validDate(v.startDate, false)
const endDateIsValid = v => v.reportType === 'sellersCatalogue' || validDate(v.endDate, false)
const startAndEndIsValid = v =>
  !(startDateIsValid(v) && endDateIsValid(v)) ||
  (v.reportType === 'sellersCatalogue' || startDateIsBeforeEndDate(v.startDate, v.endDate))

const handleSubmit = values => {
    const url = `/api/2/buyer/download/reports?reportType=`
    window.location.href = url
  }
  
  const handleSubmitFailed = () => {
    window.scrollTo(0, 0)
  }
  
export class ActivityReports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      acceptEnabled: true,
      errorMessage: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }
  handleDateChange(prop, date) {
    this.props.setDate(prop, `${date.year}-${date.month}-${date.day}`)
  }
  render() {
      return (
        <div>
        <AUheading size="xl" level="1">
          Activity reports
        </AUheading>
        <p>Download opportunity report data for your agency or a current list of approved sellers.</p>
        <AUcheckbox
          id="cb-declaration1"
          name="procurementAccessCB"
          label="I am authorised to access procurement reporting documents across my organisation and I will store, transmit and use the report in line with my agency's privacy and data policies."
        />
        <AUbutton type="submit" disabled={!this.state.acceptEnabled}>
          Download reports
        </AUbutton>
        </div>
      )
  }
}

const mapStateToProps = ({ loading}) => {
    return { loading }
  }

  const mapDispatchToProps = dispatch => {
    return {
      saveAgency: data => dispatch(saveAgency(data))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ActivityReports)



