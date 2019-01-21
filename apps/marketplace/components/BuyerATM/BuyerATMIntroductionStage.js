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
      <strong>
        This approach is for expressions of interest or requests for information. Sellers submit up to 500 words to each
        criteria you provide. If you need proposals, use{' '}
        <a href={`${rootPath}/outcome-choice`}>seek proposals and quotes</a>.
      </strong>
    </AUcallout>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <ul>
      <li>
        You can <a href="#template">download the list of questions XLSX 84KB</a> to prepare your request offline before
        publishing.
      </li>
      <li>
        If you are inviting responses from specific sellers, check they are on the{' '}
        <a href="/search/sellers" target="_blank">
          Digital Marketplace panel
        </a>
        . You can{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000669656-Getting-a-new-seller-on-the-panel"
          rel="external noopener noreferrer"
          target="_blank"
        >
          encourage a seller to sign up
        </a>{' '}
        if they have yet to join.
      </li>
    </ul>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a href="#guide">View support article</a>
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
