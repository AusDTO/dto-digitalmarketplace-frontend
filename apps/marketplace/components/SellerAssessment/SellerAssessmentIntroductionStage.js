import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const SellerAssessmentIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      {props.meta.name} assessment
    </AUheadings>
    <p>
      Every seller must be assessed as offering value for money before they can respond to opportunities published on
      the Digital Marketplace. The information you provide will only be visible to the assessment team.
    </p>
    <AUheadings level="2" size="lg">
      You will be asked for
    </AUheadings>
    <ol>
      <li>
        A maximum daily rate for your services in {props.meta.name}. Use{' '}
        <a href="https://www.sfia-online.org/en/framework/sfia-7/busskills/level-5" rel="external noopener">
          SFIA level 5
        </a>{' '}
        and the{' '}
        <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476" rel="external noopener">
          panel categories and rates
        </a>{' '}
        as a guide
      </li>
      <li>Which criteria you are requesting assessment in</li>
      <li>Evidence of your expertise in the criteria</li>
    </ol>
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
