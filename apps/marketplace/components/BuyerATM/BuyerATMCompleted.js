import React from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerATMCompleted.scss'

const BuyerATMCompleted = props => (
  <div>
    <AUpageAlert as="success">
      <AUheading level="1" size="md">
        Your opportunity is now live.
      </AUheading>
      <p>It will be open until {format(props.closingDate, 'dddd D MMMM YYYY')} at 6pm Canberra time.</p>
    </AUpageAlert>
    <AUheading level="2" size="lg">
      What happens next?
    </AUheading>
    <ul>
      <li>
        While your opportunity is live, you&apos;ll need to{' '}
        <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000575036#while-open" rel="noopen">
          answer seller questions
        </a>
        .
      </li>
      <li>
        We will send an email to <strong>{props.contactEmail}</strong> when the opportunity closes, so you can download
        responses.
      </li>
    </ul>
    <p>
      If you need help at any time, <a href="/contact-us">contact us</a>.
    </p>
    <p className={styles.buttons}>
      <a href={`${rootPath}/brief/${props.briefId}/overview/atm`} className="au-btn au-btn--secondary">
        Return to overview
      </a>
      <a href={`${rootPath}/digital-marketplace/opportunities/${props.briefId}`} className="au-btn">
        View live opportunity
      </a>
    </p>
  </div>
)

BuyerATMCompleted.propTypes = {
  briefId: PropTypes.string.isRequired,
  closingDate: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired
}

export default BuyerATMCompleted
