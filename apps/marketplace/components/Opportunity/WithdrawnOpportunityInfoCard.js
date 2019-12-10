import React from 'react'
import PropTypes from 'prop-types'

import infoCardStyles from './OpportunityInfoCard.scss'
import styles from '../../main.scss'

const WithdrawnOpportunityInfoCard = props => {
  const { reason } = props

  return (
    <div className={infoCardStyles.container}>
      <div className="row">
        <div className={`col-xs-12 ${styles.red}`}>
          <p className={styles.fontSizeMd}>This opportunity has been withdrawn.</p>
          <p>
            <span className={styles.fontWeightBold}>Reason for withdrawal:</span>
            <br />
            {reason}
          </p>
        </div>
      </div>
    </div>
  )
}

WithdrawnOpportunityInfoCard.defaultProps = {
  reason: ''
}

WithdrawnOpportunityInfoCard.propTypes = {
  reason: PropTypes.string
}

export default WithdrawnOpportunityInfoCard
