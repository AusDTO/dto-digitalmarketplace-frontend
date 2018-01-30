/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import Accordion from '@gov.au/accordion'

import styles from './AccordionRadioList.scss'

const CategoriesAccordionRadioList = props => {
  const { data, categoryAccordionOpen } = props
  const { categories } = data

  return (
    <div className={styles.container}>
      <div className="uikit-display-2">
        <strong>{props.title}</strong>
      </div>
      {categories &&
        categories.map((category, id = uniqueID()) => (
          <div key={id}>
            <Accordion header={category.name} open={categoryAccordionOpen === category.name + id}>
              <div>
                {category.subCategories.map((subCategory, subId = uniqueID()) => (
                  <div key={subId} className={styles.radioSection}>
                    <label
                      className="uikit-control-input uikit-control-input--full"
                      htmlFor={category.name + subCategory.name + subId}
                    >
                      <input
                        id={category.name + subCategory.name + subId}
                        className="uikit-control-input__input"
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
                      <span className="uikit-control-input__text">{subCategory.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </Accordion>
          </div>
        ))}
    </div>
  )
}

export default CategoriesAccordionRadioList
