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
        <strong>
          {props.title}
        </strong>
      </div>
      {categories &&
        categories.map((category, id = uniqueID()) =>
          <div key={id}>
            <Accordion header={category.mainCategory} open={categoryAccordionOpen === category.mainCategory + id}>
              <div>
                {category.subCategories.map((subCategory, subId = uniqueID()) =>
                  <div key={subId} className={styles.radioSection}>
                    <label
                      className="uikit-control-input uikit-control-input--full"
                      htmlFor={category.mainCategory + subCategory.serviceTypeName + subId}
                    >
                      <input
                        id={category.mainCategory + subCategory.serviceTypeName + subId}
                        className="uikit-control-input__input"
                        type="radio"
                        name="category"
                        tabIndex="0"
                        value={subCategory.serviceTypeId}
                        onChange={(e) => {
                          props.setCategory(e.target.value)
                          props.onCategoryAccordionOpen(category.mainCategory + id)
                          props.loadTableData()
                        }}
                      />
                      <span className="uikit-control-input__text">
                        {subCategory.serviceTypeName}
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </Accordion>
          </div>
        )}
    </div>
  )
}

export default CategoriesAccordionRadioList
