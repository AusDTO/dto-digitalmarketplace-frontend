/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './PricingList.scss'

const PricingList = props => {
  const { pricesData, hideNav } = props
  const { prices } = pricesData

  return (
    <div className={styles.container}>
      <header>
        <h1 className="uikit-display-5" tabIndex="-1">
          Pricing
        </h1>
        <div className={styles.stepTitle}>Step 2 of 4</div>
        <div tabIndex="0" className={styles.backLink} onClick={() => {
            hideNav(false)
            props.goToStep(1)
          }}>
          Back to services list
        </div>
      </header>
      <article role="main">
        <div className={styles.headingRow}>
          <div className="row">
            <div className="col-md-3 col-sm-3">Region</div>
            <div className="col-md-2 col-sm-2">Price cap</div>
            <div className="col-md-2 col-sm-2">
              Price <span className={styles.gstTitle}>inc GST</span>
            </div>
            <div className="col-md-2 col-sm-2">Start date</div>
            <div className="col-md-2 col-sm-2">End date</div>
            <div className="col-md-1 col-sm-1" />
          </div>
        </div>
        {prices &&
          prices.map((price, id = uniqueID()) =>
            <div key={id} className={styles.priceRow}>
              <div className="row">
                <div className="col-md-3 col-sm-3">
                  {price.region.state + ' ' + price.region.name}
                </div>
                <div className="col-md-2 col-sm-2">
                  {'$' + price.capPrice}
                </div>
                <div className="col-md-2 col-sm-2">
                  <span className={styles.price}>
                    {'$' + price.price}
                  </span>
                </div>
                <div className="col-md-2 col-sm-2">
                  {price.startDate}
                </div>
                <div className="col-md-2 col-sm-2">
                  {price.endDate}
                </div>
                <div className="col-md-1 col-sm-1">
                  <div
                    tabIndex="0"
                    className={styles.link}
                    onClick={() => {
                      props.editPrice(price)
                      window.scrollTo(0, 0)
                    }}
                  >
                    <strong>Edit</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
      </article>
    </div>
  )
}

export default PricingList
