import React from 'react'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import styles from './MarketplaceAlert.scss'

const MarketplaceAlert = props => {
  const { actions, content, type } = props

  return (
    <AUpageAlert as={type}>
      {content}
      <div className={styles.actionsContainer}>{actions}</div>
    </AUpageAlert>
  )
}

export default MarketplaceAlert
