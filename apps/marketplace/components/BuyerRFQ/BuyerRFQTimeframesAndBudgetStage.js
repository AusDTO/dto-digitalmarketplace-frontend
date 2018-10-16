import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerRFQTimeframesAndBudgetStage = props => (
  <div>
    <AUheadings level="1" size="xl">
      Timeframes and budget
    </AUheadings>
    <Textfield
      model={`${props.model}.startDate`}
      label="Estimated start date"
      name="start_date"
      id="start_date"
      htmlFor="start_date"
      defaultValue={props[props.model].startDate}
      maxLength={100}
      validators={{
        required
      }}
      messages={{
        required: 'Enter an estimated start date for the brief'
      }}
    />
    <Textarea
      model={`${props.model}.contractLength`}
      label="Length of contract &amp; extension options (optional)"
      name="contract_length"
      id="contract_length"
      htmlFor="contract_length"
      defaultValue={props[props.model].contractLength}
      controlProps={{ limit: 150 }}
      validators={{}}
      messages={{
        limitWords: 'Your contract length and extension options has exceeded the 150 word limit'
      }}
    />
    <Textarea
      model={`${props.model}.budgetRange`}
      label="Budget range (optional)"
      name="budget_range"
      id="budget_range"
      htmlFor="budget_range"
      defaultValue={props[props.model].budgetRange}
      controlProps={{ limit: 150 }}
      validators={{}}
      messages={{
        limitWords: 'Your budget range has exceeded the 150 word limit'
      }}
    />
  </div>
)

BuyerRFQTimeframesAndBudgetStage.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQTimeframesAndBudgetStage)
