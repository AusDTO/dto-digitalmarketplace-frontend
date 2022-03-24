import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import { rootPath } from 'marketplace/routes'
import Feedback from 'marketplace/components/Feedback/Feedback'
import styles from './BuyerSpecialistCompleted.scss'

export class BuyerSpecialistCompleted extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const { blackoutPeriod } = this.props
    const isBlackoutPeriod = blackoutPeriod.startDate && blackoutPeriod.endDate
    let closingTime = '6pm'
    if (isBlackoutPeriod && isAfter(new Date(this.props.closingDate), blackoutPeriod.startDate)) {
      closingTime = '11:55pm'
    }

    return (
      <div>
        <AUpageAlert as="success">
          <AUheading level="1" size="md">
            Your opportunity is now live.
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
            <a
              href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000583195#while-open"
              rel="noopener noreferrer"
            >
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
          <a href={`${rootPath}/brief/${this.props.briefId}/overview/atm`} className="au-btn au-btn--secondary">
            Return to overview
          </a>
          <a href={`${rootPath}/digital-marketplace/opportunities/${this.props.briefId}`} className="au-btn">
            View live opportunity
          </a>
        </p>
        <br />
        <br />
        <br />
        <Feedback
          app={this.props.app}
          handleSubmit={this.props.handleSubmit}
          difficultyQuestion="How easy or difficult was it for you to publish this opportunity?"
          commentQuestion="How would you improve publishing an opportunity?"
          objectAction="published"
        />
      </div>
    )
  }
}

BuyerSpecialistCompleted.defaultProps = {
  blackoutPeriod: {
    startDate: null,
    endDate: null
  }
}

BuyerSpecialistCompleted.propTypes = {
  briefId: PropTypes.string.isRequired,
  closingDate: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  blackoutPeriod: PropTypes.object
}

const mapStateToProps = state => ({
  blackoutPeriod: state.brief.blackoutPeriod
})

export default connect(mapStateToProps)(BuyerSpecialistCompleted)
