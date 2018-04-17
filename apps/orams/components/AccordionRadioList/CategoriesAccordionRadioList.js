/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'

import styles from './AccordionRadioList.scss'

const CategoriesAccordionRadioList = props => {
  const { data, categoryAccordionOpen } = props
  const { categories } = data

  return (
    <div className={styles.container}>
      <div className="au-display-lg">
        <strong>
          {props.title}
        </strong>
      </div>
      {categories &&
        categories.map((category, id = uniqueID()) =>
          <div key={id}>
            <AUaccordion header={category.name} open={categoryAccordionOpen === category.name + id}>
              <div>
                {category.subCategories.map((subCategory, subId = uniqueID()) =>
                  <div key={subId} className={styles.radioSection}>
                    <label
                      className="au-control-input au-control-input--full"
                      htmlFor={category.name + subCategory.name + subId}
                    >
                      <input
                        id={category.name + subCategory.name + subId}
                        className="au-control-input__input"
                        type="radio"
                        name="category"
                        tabIndex="0"
                        value={subCategory.id}
                        onChange={e => {
                          props.setCategory(e.target.value)
                          props.onCategoryAccordionOpen(category.name + id)
                          props.loadTableData()
                        }}
                      />
                      <span className="au-control-input__text">
                        {subCategory.name}
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </AUaccordion>
          </div>
        )}
    </div>
  )
}

export default CategoriesAccordionRadioList
