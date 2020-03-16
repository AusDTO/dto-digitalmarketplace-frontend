import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import { getBriefLastQuestionDate, getClosingTime } from 'marketplace/components/helpers'
import { required, validDate } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'

import styles from '../../../main.scss'

const ClosingDateIsNotValidMessage = props => {
  const { closingDate } = props

  return (
    <AUbutton
      as="tertiary"
      className={`${styles.border0} ${styles.padding0}`}
      onClick={() => document.getElementById('day').focus()}
    >
      {`The closing date must be a valid date after ${format(closingDate, 'DD MMMM YYYY')}.`}
    </AUbutton>
  )
}

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
    this.handleDateInput = this.handleDateInput.bind(this)
    this.isClosingDateValid = this.isClosingDateValid.bind(this)
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

  handleDateInput = e => {
    let { value } = e.target
    const { id } = e.target
    const { closingDate } = this.props[this.props.model]

    if (value.length === 1) {
      value = value.padStart(2, '0')
    }

    const currentClosingDate = closingDate.split('-')
    let year = currentClosingDate[0]
    let month = currentClosingDate[1]
    let day = currentClosingDate[2]

    switch (id) {
      case 'day':
        day = value
        break
      case 'month':
        month = value
        break
      case 'year':
        year = value
        break
      default:
        break
    }

    this.props.setClosingDate(`${year}-${month}-${day}`)
    this.props.resetFormValidity()
    this.setState({
      hasErrors: false
    })
  }

  isClosingDateValid = formValues => {
    const { brief } = this.props
    const currentClosingDate = new Date(getClosingTime(brief))
    const dateIsValid =
      formValues.closingDate &&
      validDate(formValues.closingDate) &&
      isAfter(new Date(formValues.closingDate), currentClosingDate)

    if (!dateIsValid) {
      this.setState({
        hasErrors: true
      })
    }

    return dateIsValid
  }

  render = () => {
    const { brief, model } = this.props
    const { hasErrors, redirectToEditsTable } = this.state
    const InvalidClosingDateMessage = <ClosingDateIsNotValidMessage closingDate={getClosingTime(brief)} />

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
            closingDateIsValid: this.isClosingDateValid
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
                closingDateIsValid: InvalidClosingDateMessage
              }}
            />
          )}
        </div>
        <div className="row">
          <DateControl
            id="closingDate"
            model={`${model}.closingDate`}
            onDateInput={this.handleDateInput}
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
