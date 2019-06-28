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
    <p>
      Download the{' '}
      <a
        href="/api/2/r/ask-market-questions-template.docx"
        rel="noopener noreferrer"
        target="_blank"
      >
        questions template (DOC 52KB)
      </a>{' '}
      to prepare offline before publishing.
    </p>
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
      <a href="/contact-us" target="_blank">
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
