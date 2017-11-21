/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './ProviderList.scss'
import PageAlert from '@gov.au/page-alerts'

const ProviderList = props => {
  const { successMessage, buyerSuppliers, loadStepTwo } = props
  const { categories } = buyerSuppliers

  return (
    <main className={styles.cataloguePage}>
      <div className={styles.container}>
        {successMessage &&
          <PageAlert as="success">
            <h4>Pricing updated</h4>
          </PageAlert>}
        <header>
          <h1 className="uikit-display-5" tabIndex="-1">
            Invoice price check
          </h1>
          <div className={styles.stepTitle}>Step 1 of 2</div>
          <div className={styles.heading}>Select a provider to check pricing</div>
        </header>
        <article role="main">
          <div className="row">
            {categories &&
              categories.map((category, id = uniqueID()) =>
                <div key={id} className="col-xs-12 col-sm-5">
                  <div className={styles.categoryTitle}>
                    {category.name}
                  </div>
                  {category.suppliers.map((supplier, subId = uniqueID()) =>
                    <div
                      key={subId}
                      onClick={() => {
                        loadStepTwo(supplier.code)
                        window.scrollTo(0, 0)
                      }}
                    >
                      <div className={styles.link}>
                        {supplier.name}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </article>
      </div>
    </main>
  )
}

export default ProviderList
