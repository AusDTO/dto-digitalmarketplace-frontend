import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { required, validPhoneNumber, validDate } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'
import Textfield from 'shared/form/Textfield'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from './ErrorAlert'
import ClosingDateControl from './ClosingDateControl'

class BuyerRFXMarketApproachStage extends Component {
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
            closingDateIsValid: formValues => formValues.closedAt && validDate(formValues.closedAt),
            requiredContact: formValues => required(formValues.contactNumber),
            contactValidPhone: formValues => validPhoneNumber(formValues.contactNumber)
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Briefing and closing date
        </AUheading>
        <ErrorAlert
          title="An error occurred"
          model={model}
          messages={{
            closingDateIsValid: 'You must input a valid closing date in the future.',
            requiredContact: 'A contact number is required.',
            contactValidPhone: 'Contact number must be a valid phone number including area code.'
          }}
        />
        <Textarea
          model={`${model}.industryBriefing`}
          label="Industry briefing (optional)"
          description="Make sure you include the date, time and access details of your briefing."
          name="industryBriefing"
          id="industryBriefing"
          htmlFor="industryBriefing"
          defaultValue={this.props[model].industryBriefing}
          controlProps={{ limit: 150 }}
        />
        <ClosingDateControl
          id="closed_at"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[this.props.model].closedAt}
        />
        <Textfield
          model={`${this.props.model}.contactNumber`}
          label="Contact number"
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

BuyerRFXMarketApproachStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerRFXMarketApproachStage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFXMarketApproachStage)
