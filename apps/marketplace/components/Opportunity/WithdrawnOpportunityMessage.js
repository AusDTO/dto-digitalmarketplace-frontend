import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../main.scss'

const WithdrawnOpportunityMessageBody = props => {
  const { reason } = props

  // Match white space characters except for spaces
  const paragraphs = reason.split(/[^\S ]+/)

  return (
    <React.Fragment>
      <p className={styles.fontSizeLg}>This opportunity has been withdrawn.</p>
      <br />
      {reason && (
        <div>
          <p className={styles.bold}>Reason for withdrawal:</p>
          {paragraphs.map((paragraph, index) => {
            let paragraphBreak = <br />
            if (index === paragraphs.length - 1) {
              paragraphBreak = null
            }

            return (
              <React.Fragment key={paragraph}>
                <p className={styles.noMarginTop}>{paragraph}</p>
                {paragraphBreak}
              </React.Fragment>
            )
          })}
        </div>
      )}
    </React.Fragment>
  )
}

const WithdrawnOpportunityMessage = props => {
  const { reason } = props

  return (
    <React.Fragment>
      <div className={`col-xs-12 ${styles.marginTop0} ${styles.red} ${styles.hideMobile}`}>
        <WithdrawnOpportunityMessageBody reason={reason} />
      </div>
      <div
        className={`${styles.marginTop0} ${styles.paddingBottom2} ${styles.greyBorderBottom1} ${styles.red} ${styles.hideDesktop}`}
      >
        <WithdrawnOpportunityMessageBody reason={reason} />
      </div>
    </React.Fragment>
  )
}

WithdrawnOpportunityMessage.defaultProps = {
  reason: ''
}

WithdrawnOpportunityMessage.propTypes = {
  reason: PropTypes.string.isRequired
}

export default WithdrawnOpportunityMessage
