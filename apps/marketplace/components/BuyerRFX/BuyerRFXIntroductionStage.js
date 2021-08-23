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
    <ul>
      <li>
        You can{' '}
        <a href="/api/2/r/seek-proposals-and-quotes-questions-template.docx" rel="noopener noreferrer" target="_blank">
          download the list of questions (DOCX 91KB)
        </a>{' '}
        to prepare offline before publishing.
      </li>
      <li>
        Read the{' '}
        <a
          href="https://www.buyict.gov.au/sp?id=resources_and_policies&kb=KB0010683"
          rel="external noopener noreferrer"
          target="_blank"
        >
          Digital Sourcing Framework&apos;s mandatory policies
        </a>{' '}
        because they may apply to you. To keep a record of your compliance, complete and save your:
        <ul>
          <li>
            <a
              href="https://www.buyict.gov.au/sp?id=resources_and_policies&kb=KB0010637"
              rel="external noopener noreferrer"
              target="_blank"
            >
              Consider First Policy document
            </a>
          </li>
          <li>
            <a
              href="https://www.buyict.gov.au/sp?id=resources_and_policies&kb=KB0010639&kb_parent=KB0010683#fair-criteria-checklist"
              rel="external noopener noreferrer"
              target="_blank"
            >
              Fair Criteria Checklist
            </a>
          </li>
        </ul>
      </li>
      <li>You should consider approaching multiple sellers wherever possible.</li>
      <li>
        Remember to request that sellers provide an offer of discount(s) and to seek better rates for longer-term
        contracts.
      </li>
    </ul>
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
        rel="noopener noreferrer"
        target="_blank"
      >
        View support article
      </a>
      <br />
      <a href="/contact-us" rel="noopener noreferrer" target="_blank">
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
