import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './BuyerSpecialistIntroductionStage.scss'

const BuyerSpecialistIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit} className={styles.introductionContainer}>
    <AUheadings level="1" size="xl">
      Hire a digital specialist
    </AUheadings>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can{' '}
        <a href="/api/2/r/specialist-questions-template.docx" rel="noopener noreferrer" target="_blank">
          download the list of questions (DOCX 92KB)
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
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p className={styles.textSpacing}>
      <a
        href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000583195-Hire-a-digital-specialist"
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
    <p>{"All fields are mandatory unless marked 'optional'."}</p>
    {props.formButtons}
  </Form>
)

BuyerSpecialistIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerSpecialistIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerSpecialistIntroductionStage
