import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerRFXIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      Seek proposals and quotes
    </AUheadings>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can use the{' '}
        <a href="#template" target="_blank">
          list of questions
        </a>{' '}
        to develop your request offline before publishing.
      </li>
      <li>
        Identify the{' '}
        <a href="/search/sellers" target="_blank">
          sellers
        </a>{' '}
        and{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/115011271567-What-you-can-buy"
          rel="external noopener noreferrer"
          target="_blank"
        >
          panel category
        </a>{' '}
        that best meets your need.
      </li>
      <li>Have your requirements, response format, evaluation criteria and closing date ready.</li>
      <li>Any documents you upload must be in DOC, XLS, PPT or PDF format.</li>
    </ul>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a href="#guide" target="_blank">
        View help guide
      </a>
      <br />
      <a href="/contact-us" target="_blank">
        Contact us
      </a>
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
