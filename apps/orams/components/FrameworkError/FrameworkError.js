/* eslint-disable */
import React from 'react'
import PageAlert from '@gov.au/page-alerts'
import styles from './FrameworkError.scss'

const FrameworkError = props => {
  return (
    <main>
      <div className={styles.container}>
        <PageAlert as="error">
          <h4>
            Only ORAMS accounts can access this page.
          </h4>
        </PageAlert>
      </div>
    </main>
  )
}

export default FrameworkError
