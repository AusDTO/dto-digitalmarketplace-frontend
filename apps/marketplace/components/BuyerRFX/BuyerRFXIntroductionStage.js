import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerRFXIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      Seek proposals for digital services or outcomes
    </AUheadings>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can use the <a href="#template">list of questions</a> to develop your request offline before publishing.
      </li>
      <li>
        Identify the <a href="/search/sellers">sellers</a> and{' '}
        <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011271567-What-you-can-buy" rel="external">
          panel category
        </a>{' '}
        that best meets your need.
      </li>
      <li>Have your requirements, response format, evaluation criteria and closing dates ready.</li>
      <li>Any documents you upload must be in DOC, XLS, PPT or PDF format.</li>
    </ul>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a href="#guide">View help guide</a>
      <br />
      <a href="/contact-us">Contact us</a>
    </p>
    <p>
      All fields are mandatory unless marked optional.
      <br />
      Completing this form usually takes about 15 minutes.
    </p>
    {props.formButtons}
  </Form>
)

BuyerRFXIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerRFXIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerRFXIntroductionStage
