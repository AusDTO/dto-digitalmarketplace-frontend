/* eslint-disable */
import React from 'react'
import styles from './BuyerDashboard.scss'

const BuyerDashboard = props => {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} row`}>
        <div className="col-md-12 col-sm-12">
          <span className="uikit-display-5">Opportunities</span>
          <span className={styles.buttonsContainer}>
            <a class={`${styles.firstButton} uikit-btn`} href="#url">Create new brief</a>
            <a class="uikit-btn uikit-btn--tertiary" href="#url">Share access</a>
          </span>
        </div>
      </div>
      <article role="main">
        <div className={styles.headingRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>ID</div>
            <div className="col-md-3 col-sm-3">Name</div>
            <div className="col-md-2 col-sm-2">Stage of brief</div>
            <div className="col-md-2 col-sm-2">Info</div>
            <div className="col-md-2 col-sm-2">Action</div>
            <div className="col-md-2 col-sm-2"></div>
          </div>
        </div>
        <div className={styles.priceRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>
              492
            </div>
            <div className="col-md-3 col-sm-3">
              <a href="#">Third party reporting solution</a>
            </div>

            <div className="col-md-2 col-sm-2">
              <div className={styles.badge}>Draft</div>
            </div>
            <div className="col-md-2 col-sm-2">
            </div>
            <div className="col-md-2 col-sm-2">
              <a href="#" rel="external">
                <strong>Edit draft</strong>
              </a>
            </div>
          </div>
          <div className="col-md-2 col-sm-2">
          </div>
        </div>
        <div className={styles.priceRow + ' ' + styles.greyRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>
              489
            </div>
            <div className="col-md-3 col-sm-3">
              <a href="#">Project management services</a>
            </div>
            <div className="col-md-2 col-sm-2">
              <div className={styles.badgeRed}>Published</div>
            </div>
            <div className="col-md-2 col-sm-2">
              <div>Closes: 9d : 36h : 15m</div>
              <div>Applications: 0</div>
            </div>
            <div className="col-md-2 col-sm-2">
              <a href="#">
                <strong>Answer a question</strong>
              </a>
            </div>
            <div className="col-md-2 col-sm-2">
              <a href="#">
                <strong>Create shortlist</strong>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BuyerDashboard
