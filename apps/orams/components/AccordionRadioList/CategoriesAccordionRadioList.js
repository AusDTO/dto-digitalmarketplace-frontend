import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import Accordion from '@gov.au/accordion'

import styles from './AccordionRadioList.scss'

const CategoriesAccordionRadioList = props => {
  const { data } = props
  const { categories } = data

  return (
    <div className={styles.container}>
      <div className="uikit-display-2">
        <strong>
          {props.title}
        </strong>
      </div>
      {categories.map((category, id = uniqueID()) =>
        <div key={ categories.mainCategory + '-' + id}>
          <Accordion header={category.mainCategory}>
            {category.subCategories.map((subCategory, subId = uniqueID()) =>
              <div key={category.mainCategory + '-' + subCategory.name + '-' + subId} className={styles.radioSection}>
                <label className="uikit-control-input uikit-control-input--full" htmlFor={category.mainCategory + '-' + subCategory.name + '-' + subId}>
                  <input
                    id={category.mainCategory + '-' + subCategory.name + '-' + subId}
                    className="uikit-control-input__input"
                    type="radio"
                    name="categories"
                    tabIndex="0"
                    value={subCategory.name}
                  />
                  <span className="uikit-control-input__text">
                    {subCategory.name}
                  </span>
                </label>
              </div>
            )}
          </Accordion>
        </div>
      )}
    </div>
  )
}

export default CategoriesAccordionRadioList
