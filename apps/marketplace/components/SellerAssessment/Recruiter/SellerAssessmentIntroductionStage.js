import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const SellerAssessmentIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      {props.meta.domain.name} assessment
    </AUheadings>
    <p>
    Before you can respond to opportunities in this category, you must be assessed by the Digital Marketplace in offering value for money.
    Details of your request will only be visible to the assessment team.
    <br/>
    <br/>
      Read more on how to 
    <a href={`https://marketplace1.zendesk.com/hc/en-gb/articles/115011292847-Request-an-assessment-for-categories`}> request an assessment for categories</a>
    </p>

    <p>
    You will be asked to submit evidence for a contractor you previously placed in a {props.meta.domain.name} specific role. 
    </p>
    <p>
      <strong>Please note:</strong> The time we take to assess your criteria is dependent on volume, seasonal peaks,
      complex cases and incomplete submissions. We will endeavour to assess your criteria in a reasonable timeframe.
    </p>
   
    {props.formButtons}
  </Form>
)

SellerAssessmentIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

SellerAssessmentIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
}

export default SellerAssessmentIntroductionStage
