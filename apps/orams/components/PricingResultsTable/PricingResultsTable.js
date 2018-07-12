/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './PricingResultsTable.scss'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const PricingList = props => {
  const { priceHistoryData } = props
  const { prices } = priceHistoryData

  return (
    <div className={styles.container}>
      {prices && (
        <div>
          {prices.length > 0 ? (
            <article role="main">
              <div className={styles.headingRow}>
                <div className="row">
                  <div className="col-md-4 col-sm-4">Region</div>
                  <div className="col-md-2 col-sm-2">
                    Price <span className={styles.gstTitle}>inc GST</span>
                  </div>
                  <div className="col-md-2 col-sm-2">Unit</div>
                  <div className="col-md-2 col-sm-2">Start date</div>
                  <div className="col-md-2 col-sm-2">End date</div>
                </div>
              </div>
              {prices.map((price, id = uniqueID()) => (
                <div key={id} className={styles.priceRow}>
                  <div className="row">
                    <div className="col-md-4 col-sm-4">{price.region.state + ' ' + price.region.name}</div>
                    <div className="col-md-2 col-sm-2">
                      <span className={styles.price}>{'$' + price.price}</span>
                    </div>
                    <div className="col-md-2 col-sm-2">Hourly</div>
                    <div className="col-md-2 col-sm-2">{price.startDate}</div>
                    <div className="col-md-2 col-sm-2">{price.endDate}</div>
                  </div>
                </div>
              ))}
            </article>
          ) : (
            <AUpageAlert as="info">
              <h4 className="au-display-sm">There were no results for your search</h4>
            </AUpageAlert>
          )}
        </div>
      )}
    </div>
  )
}

export default PricingList
