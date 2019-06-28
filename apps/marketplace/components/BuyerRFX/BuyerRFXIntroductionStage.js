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
        You can{' '}
        <a
          href="/api/2/r/seek-proposals-and-quotes-questions-template.docx"
          rel="noopener noreferrer"
          target="_blank"
        >
          download the list of questions (XLSX 84 KB)
        </a>{' '}
        to prepare your request offline before publishing.
      </li>
      <li>
        Any{' '}
        <a href="/search/sellers" target="_blank">
          sellers
        </a>{' '}
        you invite must be approved in the{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476-Panel-categories-and-rates"
          rel="external noopener noreferrer"
          target="_blank"
        >
          panel category
        </a>{' '}
        you select.
      </li>
    </ul>
    <AUheadings level="2" size="lg">
      Publishing your requirements
    </AUheadings>
    <ul>
      <li>
        You must upload a requirements document. You can use your version or the{' '}
        <a href="/static/media/documents/Requirements-Document-template.docx" rel="noopener noreferrer" target="_blank">
          Marketplace requirements template (DOCX 58 KB)
        </a>
        .
      </li>
      <li>
        You can ask sellers to complete a response template. Use your version or the{' '}
        <a href="/static/media/documents/Response-Template.docx" rel="noopener noreferrer" target="_blank">
          Marketplace response template (DOCX 67 KB)
        </a>
        .
      </li>
      <li>Documents must be in DOC, XLS, PPT or PDF format.</li>
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
        View support article
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
