import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerRFXCompleted.scss'

export class BuyerRFXCompleted extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const { lockoutPeriod } = this.props
    const isLockoutPeriod = lockoutPeriod.startDate && lockoutPeriod.endDate
    let closingTime = '6pm'
    if (isLockoutPeriod && isAfter(new Date(this.props.closingDate), lockoutPeriod.startDate)) {
      closingTime = '11:55pm'
    }

    return (
      <div>
        <AUpageAlert as="success">
          <AUheading level="1" size="md">
            Your opportunity is now live, and the invited sellers have been notified.
          </AUheading>
          <p>
            It will be open until {format(this.props.closingDate, 'dddd D MMMM YYYY')} at {closingTime} Canberra time.
          </p>
        </AUpageAlert>
        <AUheading level="2" size="lg">
          What happens next?
        </AUheading>
        <ul>
          <li>
            While your opportunity is live, you&apos;ll need to{' '}
            <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000579716#live" rel="noopener noreferrer">
              answer seller questions
            </a>
            .
          </li>
          <li>
            We will send an email to <strong>{this.props.contactEmail}</strong> when the opportunity closes, so you can
            download responses.
          </li>
        </ul>
        <p>
          If you need help at any time, <a href="/contact-us">contact us</a>.
        </p>
        <p className={styles.buttons}>
          <a href={`${rootPath}/brief/${this.props.briefId}/overview/rfx`} className="au-btn au-btn--secondary">
            Return to overview
          </a>
          <a href={`${rootPath}/digital-marketplace/opportunities/${this.props.briefId}`} className="au-btn">
            View live opportunity
          </a>
        </p>
      </div>
    )
  }
}

BuyerRFXCompleted.defaultProps = {
  lockoutPeriod: {
    startDate: null,
    endDate: null
  }
}

BuyerRFXCompleted.propTypes = {
  briefId: PropTypes.string.isRequired,
  closingDate: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  lockoutPeriod: PropTypes.object
}

const mapStateToProps = state => ({
  lockoutPeriod: state.brief.lockoutPeriod
})

export default connect(mapStateToProps)(BuyerRFXCompleted)
