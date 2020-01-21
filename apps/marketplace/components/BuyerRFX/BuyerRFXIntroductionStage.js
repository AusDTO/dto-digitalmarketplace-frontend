import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheading from '@gov.au/headings/lib/js/react.js'

const BuyerRFXIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheading level="1" size="xl">
      Seek proposals and quotes
    </AUheading>
    <AUheading level="2" size="lg">
      Before you start
    </AUheading>
    <li>
      <li>
        You can{' '}
        <a href="/api/2/r/seek-proposals-and-quotes-questions-template.docx" rel="noopener noreferrer" target="_blank">
          download the list of questions (XLSX 84 KB)
        </a>{' '}
        to prepare your request offline before publishing.
      </li>
      <li>
        Read the{' '}
        <a
          href="https://www.dta.gov.au/help-and-advice/ict-procurement/digital-sourcing-framework-ict-procurement/digital-sourcing-policies"
          rel="external noopener noreferrer"
          target="_blank"
        >
          Digital Sourcing Framework&apos;s mandatory policies
        </a>{' '}
        because they may apply to you. To keep a record of your compliance, complete and save your:
        <ul>
          <li>
            <a
              href="https://ictprocurement.service-now.com/policy?id=consider_first"
              rel="external noopener noreferrer"
              target="_blank"
            >
              Consider First Policy document
            </a>
          </li>
          <li>
            <a
              href="https://ictprocurement.service-now.com/policy?id=fair_criteria"
              rel="external noopener noreferrer"
              target="_blank"
            >
              Fair Criteria Checklist
            </a>
          </li>
        </ul>
      </li>
    </li>
    <AUheading level="2" size="lg">
      Publishing your requirements
    </AUheading>
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
    <AUheading level="2" size="lg">
      Getting help
    </AUheading>
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
