import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import isAfter from 'date-fns/is_after'
import {
  required,
  validPhoneNumber,
  validDate,
  dateIs2DaysInFuture,
  dateIsBefore,
  dateIsOutsideBlackout
} from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import mainStyles from 'marketplace/main.scss'
import styles from '../BuyerSpecialist/BuyerSpecialistAdditionalInformationStage.scss'

let blackoutStartDate = null
let blackoutEndDate = null

const requiredContactNumber = v => required(v.contactNumber)
const contactNumberFormat = v => validPhoneNumber(v.contactNumber)
const requiredClosedAt = v => required(v.closedAt)
const closedAtIsValid = v => validDate(v.closedAt)
const closedAtIs2DaysInFuture = v => !closedAtIsValid(v) || dateIs2DaysInFuture(v.closedAt)
const closedAtIsBefore = v => !closedAtIsValid(v) || dateIsBefore(v.closedAt, addDays(new Date(), 366))
const closedAtIsOutsideBlackout = v =>
  !closedAtIsValid(v) || dateIsOutsideBlackout(v.closedAt, blackoutStartDate, blackoutEndDate)

export const done = v =>
  requiredContactNumber(v) &&
  contactNumberFormat(v) &&
  requiredClosedAt(v) &&
  closedAtIsValid(v) &&
  closedAtIs2DaysInFuture(v) &&
  closedAtIsBefore(v) &&
  closedAtIsOutsideBlackout(v)

export class BuyerATMAdditionalInformationStage extends Component {
  constructor(props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this)
    if (!this.props[this.props.model].closedAt) {
      const date = addDays(new Date(), 14)
      this.props.setDate(format(date, 'YYYY-MM-DD'))
    }
    blackoutStartDate = this.props.blackoutPeriod.startDate
    blackoutEndDate = this.props.blackoutPeriod.endDate
  }

  handleDateChange(date) {
    this.props.setDate(`${date.year}-${date.month}-${date.day}`)
  }

  render() {
    const { model, blackoutPeriod } = this.props
    const isBlackoutPeriod = blackoutPeriod.startDate && blackoutPeriod.endDate
    let closingTime = '6pm'
    if (isBlackoutPeriod && isAfter(new Date(this.props[this.props.model].closedAt), blackoutPeriod.startDate)) {
      closingTime = '11:59pm'
    }

    return (
      <Form
        className={styles.additionalInformationContainer}
        model={model}
        validators={{
          '': {
            requiredContactNumber,
            contactNumberFormat,
            requiredClosedAt,
            closedAtIsValid,
            closedAtIs2DaysInFuture,
            closedAtIsBefore,
            closedAtIsOutsideBlackout
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Additional information
        </AUheading>
        <ErrorAlert
          model={model}
          messages={{
            requiredContactNumber: 'Contact number is required',
            contactNumberFormat: 'Contact number must be a valid phone number, including an area code',
            closedAtIsValid: 'You must enter a valid closing date',
            closedAtIs2DaysInFuture: 'You must enter a closing date at least 2 days from now',
            requiredClosedAt: 'You must enter the closing date for this opportunity',
            closedAtIsBefore: 'You must enter a closing date no more than one year from now',
            closedAtIsOutsideBlackout: `You can't set a closing date between
            ${format(blackoutPeriod.startDate, 'D MMMM')} and
            ${format(blackoutPeriod.endDate, 'D MMMM YYYY')}, as Digital Marketplace is moving to BuyICT.`
          }}
        />

        <Textfield
          model={`${this.props.model}.contactNumber`}
          label="Contact number for Marketplace support"
          description="This number will not be visible on the Digital Marketplace. It will only be used by the Marketplace operations team in case they need to contact you. Please include the area code."
          name="contactNumber"
          id="contactNumber"
          htmlFor="contactNumber"
          defaultValue={this.props[this.props.model].contactNumber}
          maxLength={100}
          validators={{
            required,
            validPhoneNumber
          }}
        />
        <Textfield
          model={`${this.props.model}.internalReference`}
          label="Internal reference (optional)"
          description="For example, business unit or internal procurement ID number. This will not be visible to anyone outside your organisation."
          name="internalReference"
          id="internalReference"
          htmlFor="internalReference"
          defaultValue={this.props[this.props.model].internalReference}
          maxLength={100}
          validators={{}}
        />
        {isBlackoutPeriod && (
          <AUpageAlert as="warning" className={`${mainStyles.marginTop3} ${mainStyles.marginBottom1}`}>
            <p>
              Digital Marketplace is{' '}
              <a href="/api/2/r/buyict" target="_blank">
                moving to BuyICT
              </a>{' '}
              soon. The closing date must be{' '}
              <b>
                before {format(blackoutPeriod.startDate, 'D MMMM')} or after{' '}
                {format(blackoutPeriod.endDate, 'D MMMM YYYY')}
              </b>
              .
            </p>
          </AUpageAlert>
        )}
        <DateControl
          id="closedAt"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[model].closedAt}
          label="Closing date for opportunity"
          description={`This date must be at least 2 days after you publish this request. Responses will be available after ${closingTime} Canberra time.`}
        />
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerATMAdditionalInformationStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {},
  blackoutPeriod: {
    startDate: null,
    endDate: null
  }
}

BuyerATMAdditionalInformationStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  blackoutPeriod: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  blackoutPeriod: state.brief.blackoutPeriod
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerATMAdditionalInformationStage)
