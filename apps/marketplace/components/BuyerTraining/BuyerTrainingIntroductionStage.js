import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheading from '@gov.au/headings/lib/js/react.js'

const BuyerTrainingIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheading level="1" size="xl">
      Get training to build digital skills
    </AUheading>
    <AUheading level="2" size="sm">
      Use this service to:
    </AUheading>
    <p>Request proposals from specific sellers to build digital skills and expertise.</p>
    <AUheading level="2" size="sm">
      What you get:
    </AUheading>
    <p>Proposals or a completed response template used by your agency.</p>
    <AUheading level="2" size="sm">
      Before you start:
    </AUheading>
    <ul>
      <li>
        The{' '}
        <a href="/api/2/r/learning-design-standards" rel="noopener noreferrer" target="_blank">
          Learning Design Standards
        </a>{' '}
        can be used to help structure your training approach.
      </li>
      <li>
        View the{' '}
        <a href="/api/2/r/training-support-article" rel="noopener noreferrer" target="_blank">
          support article
        </a>{' '}
        to see recommended questions and find appropriate sellers to approach.
      </li>
      <li>
        Download the{' '}
        <a href="/api/2/r/training-draft-questions" rel="noopener noreferrer" target="_blank">
          list of questions (DOCX 68KB)
        </a>{' '}
        and{' '}
        <a href="/api/2/r/training-requirement-documents" rel="noopener noreferrer" target="_blank">
          requirement documents
        </a>{' '}
        to prepare offline before publishing.
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
      <li>You should consider approaching multiple Sellers wherever possible.</li>
      <li>
        Remember to request that sellers provide an offer of discount(s) and to seek better rates for longer-term
        contracts.
      </li>
    </ul>
    <p>All fields are mandatory unless marked optional.</p>
    {props.formButtons}
  </Form>
)

BuyerTrainingIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerTrainingIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerTrainingIntroductionStage
