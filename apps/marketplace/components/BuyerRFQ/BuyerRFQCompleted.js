import React from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'

const BuyerRFQCompleted = props => (
  <div>
    <AUpageAlert as="success">
      <p>Your brief has been sent to the invited sellers.</p>
      <p>It will be open until {format(props.closingDate, 'D MMMM, YYYY')} at 6pm Canberra time.</p>
    </AUpageAlert>
    <AUheading level="2" size="lg">
      What happens next?
    </AUheading>
    <ul>
      <li>
        While your brief is live, you&apos;ll need to{' '}
        <a
          href={`/buyers/frameworks/digital-marketplace/requirements/rfx/${
            props.briefId
          }/supplier-questions/answer-question`}
        >
          answer seller questions
        </a>.
      </li>
      <li>When your brief has closed, we will send you an email so you can evaluate responses.</li>
    </ul>
    <p>
      If you need help at any time, <a href="/contact-us">contact us</a>.
    </p>
  </div>
)

BuyerRFQCompleted.propTypes = {
  briefId: PropTypes.string.isRequired,
  closingDate: PropTypes.string.isRequired
}

export default BuyerRFQCompleted
