import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { validDate } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from './ErrorAlert'
import ClosingDateControl from './ClosingDateControl'

class BuyerATMMarketApproachStage extends Component {
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
            closingDateIsValid: formValues => formValues.closedAt && validDate(formValues.closedAt)
          }
        }}
        onSubmit={this.props.onSubmit}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Briefing and closing date
        </AUheading>
        <ErrorAlert
          title="An error occurred"
          model={model}
          messages={{
            closingDateIsValid: 'You must input a valid closing date in the future.'
          }}
        />
        <Textarea
          model={`${model}.industryBriefing`}
          label="Industry briefing (optional)"
          description="Make sure you include the information to be provided, date, time and access details of your briefing."
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
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerATMMarketApproachStage.defaultProps = {
  onSubmit: () => {}
}

BuyerATMMarketApproachStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerATMMarketApproachStage)
