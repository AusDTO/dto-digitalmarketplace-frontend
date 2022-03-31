import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import styles from './LockoutReviewNotice.scss'

const LockoutReviewNotice = props => {
  const { startDate, endDate } = props
  return (
    <div className={`row ${styles.highlightRow}`}>
      <div className="col-xs-12 col-sm-4">
        <strong>
          {format(startDate, 'dddd D MMMM YYYY')} – <br />
          {format(endDate, 'dddd D MMMM YYYY')}
        </strong>
      </div>
      <div className="col-xs-12 col-sm-8">
        <strong>
          Digital Marketplace is unavailable while it is{' '}
          <a href="/" target="_blank">
            moving to BuyICT
          </a>
          :
        </strong>
        <ul>
          <li>
            You <u>won&apos;t</u> be able to access your account and:
            <ul>
              <li>edit your opportunity</li>
              <li>respond to seller questions</li>
            </ul>
          </li>
          <li>Sellers can&apos;t submit questions or responses.</li>
          <li>Sellers can only view a summary of the opportunity.</li>
        </ul>
      </div>
    </div>
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
