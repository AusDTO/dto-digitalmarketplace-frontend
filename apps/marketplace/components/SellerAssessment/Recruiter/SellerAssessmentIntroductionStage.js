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
    The information you submit will only be visible to the assessment team.
    </p>
    <p>
    You will be asked to submit evidence for a contractor you previously placed in a User reseach and Design specific role. 
    </p>
    <p>
      <strong>Please note:</strong> The time we take to assess your criteria is dependent on volume, seasonal peaks,
      complex cases and incomplete submissions. We will endeavour to assess your criteria in a reasonable timeframe.
    </p>
    {/* <AUheadings level="2" size="lg">
      You will be asked for
    </AUheadings>
    <ul>
      <li>
        your maximum daily rate for your services in {props.meta.domain.name}. Use{' '}
        <a
          href="https://www.sfia-online.org/en/framework/sfia-7/busskills/level-5"
          rel="noopener noreferrer"
          target="_blank"
        >
          SFIA level 5
        </a>{' '}
        and the{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476"
          rel="noopener noreferrer"
          target="_blank"
        >
          panel categories and rates
        </a>{' '}
        as a guide.
      </li>
      <li>which criteria you are requesting assessment in.</li>
      <li>evidence of your expertise in the criteria.</li>
    </ul> */}
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
