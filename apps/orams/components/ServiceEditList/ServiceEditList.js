/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import styles from './ServiceEditList.scss'

const ServiceEditList = props => {
  const { editServiceData, linkClick } = props
  const { services } = editServiceData

  return (
    <div className={styles.container}>
      <header>
        <h1 className="uikit-display-5" tabIndex="-1">
          Pricing
        </h1>
        <div className={styles.stepTitle}>Step 1 of 4</div>
        <div className={styles.heading}>Select the service you want to edit</div>
      </header>
      <article role="main">
        {services &&
          services.map((service, id = uniqueID()) =>
            <div key={id}>
              {service.subCategories.map((subCategory, subId = uniqueID()) =>
                <div
                  key={subId}
                  onClick={() => {
                    linkClick(service.id, subCategory.id)
                  }}
                >
                  <a href="#">
                    <div className={styles.link}>
                      {service.name}
                      <span>
                        {subCategory.name ? ' ' + '(' + subCategory.name + ')' : ''}
                      </span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}
      </article>
    </div>
  )
}

export default ServiceEditList
