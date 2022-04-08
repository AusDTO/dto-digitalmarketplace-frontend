import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import { getBriefLastQuestionDate, getClosingTime, getLockoutStatus } from 'marketplace/components/helpers'
import { required, validDate, dateIsOutsideLockout } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'

import styles from '../../../main.scss'

const ClosingDateIsNotValidMessage = props => {
  const { closingDate, lockoutPeriod } = props
  const { lockoutDatesProvided, showLockoutDates, minValidDate } = getLockoutStatus(lockoutPeriod, closingDate)

  return (
    <div>
      {(!lockoutDatesProvided || (lockoutDatesProvided && !showLockoutDates)) && (
        <AUbutton
          as="tertiary"
          className={`${styles.border0} ${styles.padding0}`}
          onClick={() => document.getElementById('day').focus()}
        >
          {`The closing date must be a valid date after ${format(minValidDate, 'DD MMMM YYYY')}`}
        </AUbutton>
      )}

      {lockoutDatesProvided && showLockoutDates && (
        <AUbutton
          as="tertiary"
          className={`${styles.border0} ${styles.padding0}`}
          onClick={() => document.getElementById('day').focus()}
        >
          {`The closing date must be a valid date after ${format(
            minValidDate,
            'DD MMMM YYYY'
          )}, and not between ${format(lockoutPeriod.startDate, 'DD MMMM')} and ${format(
            lockoutPeriod.endDate,
            'DD MMMM YYYY'
          )}`}
        </AUbutton>
      )}
    </div>
  )
}

class EditOpportunityClosingDate extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0)

    this.state = {
      hasErrors: false,
      initialClosingDate: props[props.model].closingDate
        ? props[props.model].closingDate
        : format(new Date(props.brief.dates.closing_time), 'YYYY[-]MM[-]DD'),
      redirectToEditsTable: false
    }

    // This reset clears any invalid state from the parent form which prevents submit events from this component.
    props.resetValidity(props.model)
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
    const { model } = this.props
    const { closingDate } = this.props[model]

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
    this.props.resetValidity(`${model}.closingDate`)
    this.setState({
      hasErrors: false
    })
  }

  isClosingDateValid = formValues => {
    const { brief, lockoutPeriod } = this.props
    const currentClosingDate = new Date(getClosingTime(brief))
    const dateIsValid =
      formValues.closingDate &&
      validDate(formValues.closingDate) &&
      isAfter(new Date(formValues.closingDate), currentClosingDate) &&
      dateIsOutsideLockout(formValues.closingDate, lockoutPeriod.startDate, lockoutPeriod.endDate)

    if (!dateIsValid) {
      this.setState({
        hasErrors: true
      })
    }

    return dateIsValid
  }

  render = () => {
    const { brief, model, lockoutPeriod } = this.props
    const { hasErrors, redirectToEditsTable } = this.state
    const invalidClosingDateMessage = (
      <ClosingDateIsNotValidMessage closingDate={getClosingTime(brief)} lockoutPeriod={lockoutPeriod} />
    )
    const {
      lockoutDatesProvided,
      minValidDate,
      lastQuestions,
      showLockoutDates,
      isAfterLockoutEnds
    } = getLockoutStatus(lockoutPeriod, getClosingTime(brief), this.props[model].closingDate)

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
        {lockoutDatesProvided && !isAfterLockoutEnds && (
          <div className="row">
            <AUpageAlert as="warning" className={`${styles.pageAlert} ${styles.marginBottom1}`}>
              {!showLockoutDates && (
                <p className={styles.noMaxWidth}>
                  Digital Marketplace is{' '}
                  <a href="/api/2/r/buyict" target="_blank">
                    moving to BuyICT
                  </a>{' '}
                  soon. The closing date must be <b>after {format(minValidDate, 'D MMMM YYYY')}</b>.
                </p>
              )}
              {showLockoutDates && (
                <p className={styles.noMaxWidth}>
                  Digital Marketplace is{' '}
                  <a href="/api/2/r/buyict" target="_blank">
                    moving to BuyICT
                  </a>{' '}
                  soon. The closing date must be{' '}
                  <b>
                    before {format(lockoutPeriod.startDate, 'D MMMM')} or after{' '}
                    {format(lockoutPeriod.endDate, 'D MMMM YYYY')}
                  </b>
                  .
                </p>
              )}
            </AUpageAlert>
          </div>
        )}
        <div className="row">
          {hasErrors && (
            <ErrorAlert
              model={model}
              messages={{
                closingDateIsValid: invalidClosingDateMessage
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
              getBriefLastQuestionDate(new Date(this.props[model].closingDate), new Date(), lockoutPeriod),
              `dddd DD MMMM YYYY [at ${lastQuestions.closingTime} (in Canberra)]`
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

EditOpportunityClosingDate.defaultProps = {
  brief: {
    dates: {
      closing_time: ''
    }
  },
  model: '',
  lockoutPeriod: {
    startDate: null,
    endDate: null
  }
}

EditOpportunityClosingDate.propTypes = {
  brief: PropTypes.shape({
    dates: PropTypes.shape({
      closing_time: PropTypes.string.isRequired
    }).isRequired
  }),
  model: PropTypes.string.isRequired,
  lockoutPeriod: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  lockoutPeriod: state.brief.lockoutPeriod
})

const mapDispatchToProps = (dispatch, props) => ({
  resetValidity: model => dispatch(actions.setValidity(model, true)),
  setClosingDate: closingDate => dispatch(actions.change(`${props.model}.closingDate`, closingDate)),
  setOnlySellersEdited: onlySellersEdited =>
    dispatch(actions.change(`${props.model}.onlySellersEdited`, onlySellersEdited))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunityClosingDate)
