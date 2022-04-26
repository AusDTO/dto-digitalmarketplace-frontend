import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './LockoutReviewNotice.scss'

const LockoutReviewNotice = props => {
  const { startDate, endDate } = props
  return (
    <Fragment>
      <div className={`row ${styles.highlightRow}`}>
        <div className="col-xs-12 col-sm-4">
          <strong>
            {format(startDate, 'dddd D MMMM YYYY')} – <br />
            {format(addDays(endDate, -1), 'dddd D MMMM YYYY')}
          </strong>
        </div>
        <div className="col-xs-12 col-sm-8">
          <AUheadings level="2" size="sm">
            Digital Marketplace is unavailable during its move to{' '}
            <a href="/api/2/r/buyict" target="_blank" rel="noopener noreferrer">
              BuyICT
            </a>
          </AUheadings>
          <ul>
            <li>
              You <strong>won&apos;t be able to</strong> access your account to:
              <ul>
                <li>edit or withdraw your opportunity</li>
                <li>respond to seller questions.</li>
              </ul>
            </li>
            <li>
              Sellers <strong>won&apos;t be able to</strong>:
              <ul>
                <li>submit questions</li>
                <li>respond to your opportunity.</li>
              </ul>
            </li>
          </ul>
          <p>An overview of your opportunity can still be viewed by logged-out users.</p>
        </div>
      </div>
      <div className={`row ${styles.highlightRow}`}>
        <div className="col-xs-12 col-sm-4">
          <strong>{format(endDate, 'dddd D MMMM YYYY')}</strong>
        </div>
        <div className="col-xs-12 col-sm-8">
          <AUheadings level="2" size="sm">
            Digital Marketplace goes live on{' '}
            <a href="https://www.buyict.gov.au/" target="_blank" rel="noopener noreferrer">
              BuyICT
            </a>
          </AUheadings>
          <ul>
            <li>
              You can access your account on BuyICT and:
              <ul>
                <li>edit your opportunity</li>
                <li>respond to seller questions.</li>
              </ul>
            </li>
            <li>
              Sellers can:
              <ul>
                <li>submit questions</li>
                <li>respond to your opportunity.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

LockoutReviewNotice.defaultProps = {
  startDate: null,
  endDate: null
}

LockoutReviewNotice.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object
}

export default LockoutReviewNotice
