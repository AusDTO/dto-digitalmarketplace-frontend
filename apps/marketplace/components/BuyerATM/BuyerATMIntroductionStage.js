import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import styles from './BuyerATMIntroductionStage.scss'

const BuyerATMIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      Ask the market
    </AUheadings>
    <AUcallout description="" className={styles.noticeBar}>
      <strong>
        This is an EOI/RFI process. In this stage, sellers can only submit up to 500 words to each criteria you provide.
        If you need proposals or quotes now, go to <a href="#request proposals">request proposals[TODO]</a>.
      </strong>
    </AUcallout>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can use the <a href="#template">list of questions template[TODO]</a> to develop your request offline before
        publishing.
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
    <p>All fields are mandatory unless marked optional.</p>
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
