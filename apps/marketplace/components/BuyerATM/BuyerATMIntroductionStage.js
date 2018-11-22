import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerATMIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      Ask the market
    </AUheadings>
    <AUheadings level="2" size="lg">
      Are you seeking proposals now?
    </AUheadings>
    <p>
      In this step, sellers can only submit up to 500 words to each criteria you provide. Use the{' '}
      <a href="#request-proposals">request proposals[TODO]</a> approach if you need proposals or quotes upfront.
    </p>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can use the <a href="#template">questions template[TODO]</a> to develop your request before publishing.
      </li>
      <li>Have your evaluation criteria and closing dates ready.</li>
      <li>Any documents you upload must be in DOC, XLS, PPT or PDF format.</li>
    </ul>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a href="#guide">View step by step guide[TODO]</a>
      <br />
      <a href="#chat">Contact us[TODO]</a>
    </p>
    <p>
      All fields are mandatory unless marked optional.
      <br />
      Completing this form usually takes about 15 minutes.
    </p>
    {props.formButtons}
  </Form>
)

BuyerATMIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerATMIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerATMIntroductionStage
