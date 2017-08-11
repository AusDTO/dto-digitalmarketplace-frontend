import React from 'react'
import classNames from 'classnames'
import './Loader.scss'

/*
  work in progress loader from https://ex-research-tfn.apps.staging.digital.gov.au/exchange-prelude/#
  as requested by Lou
*/
const Loader = ({ show }) => {
  return (
    <div className={classNames('the__loader', { show: show })}>
      <div className="loading__container">
        <i className="fa fa-lock loading__lock" aria-hidden="true" />
        <div className="load__spinner" />
        <div className="load__contents">
          Launching
          <br />
          <strong>marketplace.service.gov.au</strong>
        </div>
        <div className="loading__overlay" />
      </div>
    </div>
  )
}

export default Loader
