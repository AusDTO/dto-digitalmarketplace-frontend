import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { required, validPhoneNumber, dateIs2DaysInFuture } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import styles from './BuyerTrainingAdditionalInformationStage.scss'

const closingDateIsValid = formValues => formValues.closedAt && dateIs2DaysInFuture(formValues.closedAt)
const requiredContact = formValues => required(formValues.contactNumber)
const contactValidPhone = formValues => validPhoneNumber(formValues.contactNumber)

export const done = v => closingDateIsValid(v) && requiredContact(v) && contactValidPhone(v)

class BuyerTrainingAdditionalInformationStage extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.props.setDate(`${date.year}-${date.month}-${date.day}`)
  }

  render() {
    const { model } = this.props
    return (
      <Form
        className={styles.closingStageContainer}
        model={model}
        validators={{
          '': {
            closingDateIsValid,
            requiredContact,
            contactValidPhone
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
          title="An error occurred"
          model={model}
          messages={{
            closingDateIsValid: 'You must add a closing date at least 2 days from now',
            requiredContact: 'You must add a contact number',
            contactValidPhone: 'Contact number must be a valid phone number, including an area code'
          }}
        />
        <DateControl
          id="closedAt"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[model].closedAt}
          className={styles.closingDateControl}
          label="Closing date"
          description="This date must be at least 2 days after you publish this request. Responses will be available after 6pm Canberra time."
        />
        <Textfield
          model={`${this.props.model}.contactNumber`}
          label="Contact number for Marketplace support"
          description="This number will not be visible on the Digital Marketplace. It will only be used by the Marketplace operations team in case they need to contact you. Please include the area code for landline numbers."
          name="contact"
          id="contact"
          htmlFor="contact"
          defaultValue={this.props[this.props.model].contactNumber}
          maxLength={100}
          validators={{
            required
          }}
        />
        <AUheading level="2" size="sm">
          Comprehensive terms
        </AUheading>
        <p className={styles.reduceVerticalSpacing}>
          We recommend that the{' '}
          <a href="/api/2/r/comprehensive-terms-current.pdf" rel="noopener noreferrer" target="_blank">
            comprehensive terms
          </a>{' '}
          only be applied to procurements that are complex or high value. The terms will apply to your work order, in
          addition to the Master Agreement.
        </p>
        <p>
          <CheckboxDetailsField
            model={`${this.props.model}.comprehensiveTerms`}
            id="comprehensiveTerms"
            name="comprehensiveTerms"
            label="Apply the comprehensive terms to this opportunity"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
          />
        </p>
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
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerTrainingAdditionalInformationStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerTrainingAdditionalInformationStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerTrainingAdditionalInformationStage)
