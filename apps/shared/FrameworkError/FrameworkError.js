/* eslint-disable */
import React from 'react'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import styles from './FrameworkError.scss'

const FrameworkError = props => {
  return (
    <main>
      <div className={styles.container}>
        <AUpageAlert as="error">
          <h4 className="au-display-sm">Only {props.framework} accounts can access this page.</h4>
        </AUpageAlert>
      </div>
    </main>
  )
}

export default FrameworkError
