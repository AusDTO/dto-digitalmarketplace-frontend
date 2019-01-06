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
        You can download the{' '}
        <a
          href="/static/media/documents/Seek-proposals-list-of-questions.xlsx"
          rel="noopener noreferrer"
          target="_blank"
        >
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
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476-Panel-categories-and-rates"
          rel="external noopener noreferrer"
          target="_blank"
        >
          panel category
        </a>{' '}
        that best meets your need.
      </li>
      <li>
        Have your{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000628796#outcomes"
          rel="external noopener noreferrer"
          target="_blank"
        >
          requirements
        </a>
        ,{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000628796#outcomes"
          rel="external noopener noreferrer"
          target="_blank"
        >
          response format
        </a>
        , evaluation criteria and closing date ready.
      </li>
      <li>Any documents you upload must be in DOC, XLS, PPT or PDF format.</li>
    </ul>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a
        href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000579716"
        rel="external noopener noreferrer"
        target="_blank"
      >
        View online guide
      </a>
      <br />
      <a href="/contact-us" target="_blank">
        Contact us
      </a>
    </p>
    <p>All fields are mandatory unless marked optional.</p>
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
