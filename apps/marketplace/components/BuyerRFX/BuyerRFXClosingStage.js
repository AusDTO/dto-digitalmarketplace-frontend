import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { required, validPhoneNumber, dateIs2DaysInFuture } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from './ErrorAlert'
import ClosingDateControl from './ClosingDateControl'
import styles from './BuyerRFXClosingStage.scss'

class BuyerRFXClosingStage extends Component {
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
        model={model}
        validators={{
          '': {
            closingDateIsValid: formValues => formValues.closedAt && dateIs2DaysInFuture(formValues.closedAt),
            requiredContact: formValues => required(formValues.contactNumber),
            contactValidPhone: formValues => validPhoneNumber(formValues.contactNumber)
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Closing date
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
        <ClosingDateControl
          id="closed_at"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[this.props.model].closedAt}
          className={styles.closingDateControl}
        />
        <Textfield
          model={`${this.props.model}.contactNumber`}
          label="Contact number for Marketplace support"
          description="This number will not be visible on the Digital Marketplace. It will only be used by the Marketplace operations team in case they need to contact you."
          name="contact"
          id="contact"
          htmlFor="contact"
          defaultValue={this.props[this.props.model].contactNumber}
          maxLength={100}
          validators={{
            required
          }}
        />
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerRFXClosingStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerRFXClosingStage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFXClosingStage)
