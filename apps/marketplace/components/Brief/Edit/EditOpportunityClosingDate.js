import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import { getBriefLastQuestionDate } from 'marketplace/components/helpers'
import { dateIs2DaysInFuture, required } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'

import styles from '../../../main.scss'

const ClosingDateIsNotTwoDaysInFutureMessage = (
  <AUbutton
    as="tertiary"
    className={`${styles.border0} ${styles.padding0}`}
    onClick={() => document.getElementById('day').focus()}
  >
    {`The closing date must be on or after ${format(addDays(new Date(), 2), 'DD MMMM YYYY')}.`}
  </AUbutton>
)

class EditOpportunityClosingDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasErrors: false,
      initialClosingDate: props[props.model].closingDate
        ? props[props.model].closingDate
        : format(new Date(props.brief.dates.closing_time), 'YYYY[-]MM[-]DD'),
      redirectToEditsTable: false
    }

    props.setClosingDate(this.state.initialClosingDate)

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.isClosingDateTwoDaysInFuture = this.isClosingDateTwoDaysInFuture.bind(this)
  }

  handleCancelClick = () => {
    const { initialClosingDate } = this.state

    this.props.setClosingDate(initialClosingDate)
    this.setState({
      hasErrors: false,
      redirectToEditsTable: true
    })
  }

  handleContinueClick = data => {
    this.props.setClosingDate(data.closingDate)
    this.props.setOnlySellersEdited(false)
    this.setState({
      hasErrors: false,
      redirectToEditsTable: true
    })
  }

  handleDateChange = date => {
    this.props.setClosingDate(`${date.year}-${date.month}-${date.day}`)
    this.props.resetFormValidity()
    this.setState({
      hasErrors: false
    })
  }

  isClosingDateTwoDaysInFuture = formValues => {
    const dateIsValid = formValues.closingDate && dateIs2DaysInFuture(formValues.closingDate)

    if (!dateIsValid) {
      this.setState({
        hasErrors: true
      })
    }

    return dateIsValid
  }

  render = () => {
    const { model } = this.props
    const { hasErrors, redirectToEditsTable } = this.state

    if (redirectToEditsTable) {
      return <Redirect to="/" />
    }

    return (
      <Form
        model={model}
        onSubmit={this.handleContinueClick}
        onSubmitFailed={() => {}}
        validateOn="submit"
        validators={{
          '': {
            closingDateIsTwoDaysInFuture: this.isClosingDateTwoDaysInFuture
          }
        }}
      >
        <div className="row">
          <AUheading level="1" size="xl">
            Extend the closing date
          </AUheading>
        </div>
        <div className="row">
          {hasErrors && (
            <ErrorAlert
              model={model}
              messages={{
                closingDateIsTwoDaysInFuture: ClosingDateIsNotTwoDaysInFutureMessage
              }}
            />
          )}
        </div>
        <div className="row">
          <DateControl
            id="closingDate"
            model={`${model}.closingDate`}
            onDateChange={this.handleDateChange}
            validators={{
              required
            }}
            messages={{
              required: 'Closing date is required'
            }}
          />
        </div>
        <div className={`row ${styles.marginTop2}`}>
          <p className={styles.bold}>Last day sellers can ask questions:</p>
          <span>
            {format(
              getBriefLastQuestionDate(new Date(this.props[model].closingDate)),
              'dddd DD MMMM YYYY [at 6pm (in Canberra)]'
            )}
          </span>
        </div>
        <div className={`row ${styles.marginTop2}`}>
          <AUbutton type="submit">Continue</AUbutton>
          <AUbutton as="tertiary" onClick={this.handleCancelClick}>
            Cancel update
          </AUbutton>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  resetFormValidity: () => dispatch(actions.resetValidity(`${props.model}.closingDate`)),
  setClosingDate: closingDate => dispatch(actions.change(`${props.model}.closingDate`, closingDate)),
  setOnlySellersEdited: onlySellersEdited =>
    dispatch(actions.change(`${props.model}.onlySellersEdited`, onlySellersEdited))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunityClosingDate)
