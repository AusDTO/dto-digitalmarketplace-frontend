/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import Pagination from 'shared/Pagination/Pagination';
import styles from './SellerDashboard.scss'

const SellerDashboard = props => {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} row`}>
        <div className="col-md-12 col-sm-12">
          <span className="uikit-display-5">Your responses</span>
          <span className={styles.briefsFilter}>
              Show: <b>to be awarded</b> | <a href="?">all</a>
          </span>
        </div>
      </div>
      <article role="main">
        <div className={styles.headingRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>ID</div>
            <div className="col-md-3 col-sm-3">Name</div>
            <div className="col-md-2 col-sm-2">Closes in</div>
            <div className="col-md-3 col-sm-3">Status</div>
            <div className="col-md-3 col-sm-3">Action</div>
          </div>
        </div>
        <div className={styles.priceRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>
              492
            </div>
            <div className="col-md-3 col-sm-3">
              <a href="#">Project Management Services</a>
            </div>
            <div className="col-md-2 col-sm-2">
              13d : 23h : 7m
            </div>
            <div className="col-md-3 col-sm-3">
              <div className={styles.badge}>Assesment requested</div>
              <div>for: Agile delivery and Governance</div>
            </div>
            <div className="col-md-3 col-sm-3">
              <a href="#" rel="external">
                <strong>Prepare application</strong>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.priceRow + ' ' + styles.greyRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>
              489
            </div>
            <div className="col-md-3 col-sm-3">
              <a href="#">Technical Lead - Sydney</a>
            </div>
            <div className="col-md-2 col-sm-2">
              9d : 36h : 15m
            </div>
            <div className="col-md-3 col-sm-3">
              <div className={styles.badgeRed}>Assesment not passed</div>
              <div>for: Software engineering and Development</div>
            </div>
            <div className="col-md-3 col-sm-3">
              <a href="#">
                <strong>Edit case study</strong>
              </a>
            </div>
          </div>
        </div>
      </article>
      <div className={styles.pagination}>
        <Pagination
          onClick=""
          onBack=""
          onNext=""
        />
      </div>
    </div>
  )
}

export default SellerDashboard
