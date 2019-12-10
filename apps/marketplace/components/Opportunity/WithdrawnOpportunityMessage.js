import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../main.scss'

const WithdrawnOpportunityMessageBody = props => {
  const { reason } = props

  return (
    <React.Fragment>
      <p className={styles.fontSizeMd}>This opportunity has been withdrawn.</p>
      <p>
        <span className={styles.fontWeightBold}>Reason for withdrawal:</span>
        <br />
        {reason}
      </p>
    </React.Fragment>
  )
}

const WithdrawnOpportunityMessage = props => {
  const { reason } = props

  return (
    <React.Fragment>
      <div className={`col-xs-12 ${styles.red} ${styles.hideMobile}`}>
        <WithdrawnOpportunityMessageBody reason={reason} />
      </div>
      <div className={`${styles.paddingBottom2} ${styles.greyBorderBottom1} ${styles.red} ${styles.hideDesktop}`}>
        <WithdrawnOpportunityMessageBody reason={reason} />
      </div>
    </React.Fragment>
  )
}

WithdrawnOpportunityMessage.defaultProps = {
  reason: ''
}

WithdrawnOpportunityMessage.propTypes = {
  reason: PropTypes.string
}

export default WithdrawnOpportunityMessage
