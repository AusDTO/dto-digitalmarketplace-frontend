import React from 'react'
import { connect } from 'react-redux'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { AUradio } from '@gov.au/control-input'
import { downloadReport } from '../../redux/modules/report'

import styles from './AdminReports.css'

export class AdminReports extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      reportType: 'maxDailyRates'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.downloadReport(this.state.reportType)
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
          Reports
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

const mapStateToProps = ({ meta }) => {
  return { meta }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadReport: reportType => dispatch(downloadReport(reportType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminReports)
