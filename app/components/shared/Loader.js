import React from 'react'
import styles from './Loader.scss'

/*
  work in progress loader from https://ex-research-tfn.apps.staging.digital.gov.au/exchange-prelude/#
  as requested by Lou
*/
const Loader = () => {
  return (
    <div className={styles.loading__container}>
      <i className={styles.loading__lock} aria-hidden="true" />
      <div className={styles.load__spinner} />
      <div className={styles.load__contents}>
        Launching
        <br />
        <strong>marketplace.service.gov.au</strong>
      </div>
      <div className={styles.loading__overlay} />
    </div>
  )
}

export default Loader
