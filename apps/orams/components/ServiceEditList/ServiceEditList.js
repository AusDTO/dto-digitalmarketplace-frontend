/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './ServiceEditList.scss'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const ServiceEditList = props => {
  const { editServiceData, linkClick, successMessage, hideNav, supplierCode } = props
  const { services } = editServiceData

  return (
    <div className={styles.container}>
      {successMessage && (
        <AUpageAlert as="success">
          <h4 className="au-display-sm">Pricing updated</h4>
        </AUpageAlert>
      )}
      <header>
        <h1 className="au-display-xl" tabIndex="-1">
          Pricing
        </h1>
        <div className={styles.stepTitle}>Step 1 of 4</div>
        <div className={styles.heading}>Select the service you want to edit</div>
      </header>
      <article role="main">
        {services &&
          services.map((service, id = uniqueID()) => (
            <div key={id}>
              {service.subCategories.map((subCategory, subId = uniqueID()) => (
                <div
                  key={subId}
                  onClick={() => {
                    hideNav(true)
                    linkClick(
                      supplierCode,
                      service.id,
                      subCategory.id,
                      service.name,
                      subCategory.name ? subCategory.name : ''
                    )
                    window.scrollTo(0, 0)
                  }}
                >
                  <div className={styles.link}>
                    {service.name}
                    <span>{subCategory.name ? ' ' + '(' + subCategory.name + ')' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </article>
    </div>
  )
}

export default ServiceEditList
