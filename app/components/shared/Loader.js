import React from 'react'
import classNames from 'classnames'
import './Loader.scss'

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
