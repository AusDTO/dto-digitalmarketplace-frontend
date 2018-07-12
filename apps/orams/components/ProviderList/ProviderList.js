/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './ProviderList.scss'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const ProviderList = props => {
  const { successMessage, buyerSuppliers, clickLoadStepTwo } = props
  const { categories } = buyerSuppliers

  return (
    <main className={styles.cataloguePage}>
      <div className={styles.container}>
        {successMessage && (
          <AUpageAlert as="success">
            <h4 className="au-display-sm">Pricing updated</h4>
          </AUpageAlert>
        )}
        <header>
          <h1 className="au-display-xl" tabIndex="-1">
            Invoice price check
          </h1>
          <div className={styles.stepTitle}>Step 1 of 2</div>
          <div className={styles.heading}>Select a provider to check pricing</div>
        </header>
        <article role="main">
          <div className="row">
            {categories &&
              categories.map((category, id = uniqueID()) => (
                <div key={id} className="col-xs-12 col-sm-5">
                  <div className={styles.categoryTitle}>{category.name}</div>
                  {category.suppliers.map((supplier, subId = uniqueID()) => (
                    <div
                      key={subId}
                      onClick={() => {
                        clickLoadStepTwo(supplier.code)
                        window.scrollTo(0, 0)
                      }}
                    >
                      <div className={styles.link}>{supplier.name}</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </article>
      </div>
    </main>
  )
}

export default ProviderList
