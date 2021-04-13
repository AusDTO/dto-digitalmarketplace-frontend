import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerATMIntroductionStage.scss'

const BuyerATMIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      Ask the market
    </AUheadings>
    <AUcallout description="" className={styles.noticeBar}>
      This approach is for expressions of interest or requests for information. Sellers submit up to 500 words to each
      criteria you provide. If you need proposals, use{' '}
      <a href={`${rootPath}/outcome-choice`}>seek proposals and quotes</a>.
    </AUcallout>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can{' '}
        <a href="/api/2/r/ask-market-questions-template.docx" rel="noopener noreferrer" target="_blank">
          download the list of questions (DOCX 87KB)
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
      <li>
        Remember to request that sellers provide an offer of discount(s) and to seek better rates for longer-term
        contracts.
      </li>
    </ul>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a
        href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000575036"
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

BuyerATMIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerATMIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerATMIntroductionStage
