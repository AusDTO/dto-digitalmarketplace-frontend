import React, { Component } from 'react'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import PropTypes from 'prop-types'
import formProps from 'shared/form/formPropsSelector'
import RadioList from 'shared/form/RadioList'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { Form, actions } from 'react-redux-form'
import { AUcheckbox } from '@gov.au/control-input'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { hasPermission } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import { submitDownloadReportsRequest } from 'marketplace/actions/downloadReportsActions'
import { required, validDate, startDateIsBeforeEndDate } from 'marketplace/components/validators'

import styles from '../../main.scss'

const model = 'downloadReports'
const startDateIsValid = v => v.reportType === 'sellersCatalogue' || validDate(v.startDate, false)
const endDateIsValid = v => v.reportType === 'sellersCatalogue' || validDate(v.endDate, false)
const startAndEndIsValid = v =>
  !(startDateIsValid(v) && endDateIsValid(v)) ||
  (v.reportType === 'sellersCatalogue' || startDateIsBeforeEndDate(v.startDate, v.endDate))

const handleSubmit = values => {
  const url = `/api/2/buyer/download/reports?reportType=${values.reportType}&startDate=${values.startDate}&endDate=${
    values.endDate
  }`
  window.location.href = url
}

export class DownloadReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acceptEnabled: false,
      errorMessage: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(prop, date) {
    this.props.setDate(prop, `${date.year}-${date.month}-${date.day}`)
  }

  render() {
    const { isPartOfTeam, isTeamLead, teams } = this.props

    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'download_reports')) {
      return <Redirect to={`${rootPath}/request-access/download_reports`} />
    }
    return (
      <Form
        model={model}
        validators={{
          '': {
            startDateIsValid,
            endDateIsValid,
            startAndEndIsValid
          }
        }}
        onSubmit={data => handleSubmit(data)}
        validateOn="submit"
      >
        <AUheading size="xl" level="1">
          Activity reports
        </AUheading>
        <p>Download opportunity report data for your agency or a current list of approved sellers.</p>
        <ErrorAlert
          title="An error occurred"
          model={model}
          messages={{
            startDateIsValid: 'Please enter a valid start date',
            endDateIsValid: 'Please enter a valid end date',
            startAndEndIsValid: 'Please ensure that the start date is before the end date.'
          }}
        />
        <div className="col-sm-8 col-xs-12">
          <RadioList
            className={styles['space-top-2x']}
            model={`${model}.reportType`}
            name="reportType"
            id="reportType"
            label="Choose the type of report you would like to download for your agency."
            onChange={() => {
              this.setState({
                acceptEnabled: false
              })
            }}
            options={[
              {
                value: 'sellersCatalogue',
                label: 'Current approved sellers catalogue'
              },
              {
                value: 'sellerResponses',
                label: 'Seller responses to your briefs'
              },
              {
                value: 'specialist',
                label: 'Digital specialist opportunities'
              },
              {
                value: 'atm',
                label: 'Ask the market opportunities'
              },
              {
                value: 'rfx',
                label: 'RFx opportunities'
              }
            ]}
          />
          {this.props[model].reportType === 'sellersCatalogue' && (
            <React.Fragment>
              <div>
                <AUcheckbox
                  className={styles['space-top-bottom-2x']}
                  id="cb-declaration1"
                  name="procurementAccessCB"
                  checked={this.state.acceptEnabled}
                  onClick={e => {
                    this.setState({
                      acceptEnabled: e.target.checked
                    })
                  }}
                  label="I am authorised to access procurement reporting documents across my organisation and I will store, transmit and use the report in line with my agency's privacy and data policies."
                />
                <AUbutton type="submit" disabled={!this.state.acceptEnabled}>
                  Download reports
                </AUbutton>
              </div>
            </React.Fragment>
          )}
          {this.props[model].reportType !== 'sellersCatalogue' && (
            <React.Fragment>
              <DateControl
                className={styles['space-top']}
                id="startDate"
                model={`${model}.startDate`}
                onDateChange={date => this.handleDateChange('startDate', date)}
                defaultValue={this.props[model].startDate}
                label="Start Date"
                description=""
                validators={{
                  required
                }}
              />
              <DateControl
                className={styles['space-top']}
                id="endDate"
                model={`${model}.endDate`}
                onDateChange={date => this.handleDateChange('endDate', date)}
                defaultValue={this.props[model].endDate}
                label="End Date"
                description=""
                validators={{
                  required
                }}
              />
              <AUcheckbox
                className={styles['space-top-bottom-2x']}
                checked={this.state.acceptEnabled}
                id="cb-declaration"
                name="procurementAccessCB"
                onClick={e => {
                  this.setState({
                    acceptEnabled: e.target.checked
                  })
                }}
                label="I am authorised to access procurement reporting documents across my organisation and I will store, transmit and use the report in line with my agency's privacy and data policies."
              />
              <AUbutton type="submit" disabled={!this.state.acceptEnabled}>
                Download reports
              </AUbutton>
            </React.Fragment>
          )}
        </div>
      </Form>
    )
  }
}

DownloadReports.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

const mapStateToProps = state => ({
  model: PropTypes.string.isRequired,
  ...formProps(state, model),
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

const mapDispatchToProps = dispatch => ({
  setDate: (prop, date) => dispatch(actions.change(`${model}.${prop}`, date)),
  submitDownloadReportsRequest: values => dispatch(submitDownloadReportsRequest(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadReports)
