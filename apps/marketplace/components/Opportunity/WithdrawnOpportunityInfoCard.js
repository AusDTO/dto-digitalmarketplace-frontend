import React from 'react'
import PropTypes from 'prop-types'

import WithdrawnOpportunityMessage from './WithdrawnOpportunityMessage'

import mainStyles from '../../main.scss'
import styles from './OpportunityInfoCard.scss'

const WithdrawnOpportunityInfoCard = props => {
  const { reason } = props

  return (
    <div className={`${styles.container} ${mainStyles.hideMobile}`}>
      <div className="row">
        <WithdrawnOpportunityMessage reason={reason} />
      </div>
    </div>
  )
}

WithdrawnOpportunityInfoCard.defaultProps = {
  reason: ''
}

WithdrawnOpportunityInfoCard.propTypes = {
  reason: PropTypes.string.isRequired
}

export default WithdrawnOpportunityInfoCard
