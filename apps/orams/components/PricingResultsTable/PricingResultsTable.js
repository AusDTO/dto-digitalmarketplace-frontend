/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './PricingResultsTable.scss'

const PricingList = props => {
  const { pricesData } = props

  return (
    <div className={styles.container}>
      <article role="main">
        <div className={styles.headingRow}>
          <div className="row">
            <div className="col-md-4 col-sm-4">Region</div>
            <div className="col-md-2 col-sm-2">Unit</div>
            <div className="col-md-2 col-sm-2">
              Price <span className={styles.gstTitle}>inc GST</span>
            </div>
            <div className="col-md-2 col-sm-2">Start date</div>
            <div className="col-md-2 col-sm-2">End date</div>
          </div>
        </div>
        {/*{prices &&
          prices.map((price, id = uniqueID()) =>
            <div key={id} className={styles.priceRow}>
              <div className="row">
                <div className="col-md-4 col-sm-4">
                  {price.region.state + ' ' + price.region.name}
                </div>
                <div className="col-md-2 col-sm-2">
                  <span className={styles.price}>
                    {'$' + price.capPrice}
                  </span>
                </div>
                <div className="col-md-2 col-sm-2">
                    {'$' + price.price}
                </div>
                <div className="col-md-2 col-sm-2">
                  {price.startDate}
                </div>
                <div className="col-md-2 col-sm-2">
                  {price.endDate}
                </div>
              </div>
            </div>
          )}*/}

        <div className={styles.priceRow}>
          <div className="row">
            <div className="col-md-4 col-sm-4">ACT</div>
            <div className="col-md-2 col-sm-2">
              <span className={styles.price}>$192.50</span>
            </div>
            <div className="col-md-2 col-sm-2">Hourly</div>
            <div className="col-md-2 col-sm-2">01/07/2017</div>
            <div className="col-md-2 col-sm-2">31/08/2017</div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default PricingList
