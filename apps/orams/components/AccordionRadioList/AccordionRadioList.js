import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import Accordion from '@gov.au/accordion'

import styles from './AccordionRadioList.scss'

const AccordionRadioList = props => {
  const { data } = props
  const { items } = data

  return (
    <div className={styles.container}>
      <div className="uikit-display-2">
        <strong>
          {props.title}
        </strong>
      </div>
      {items.map((item, id = uniqueID()) =>
        <div key={id}>
          <Accordion header={item.mainRegion}>
            {item.subRegions.map((subRegion, subId = uniqueID()) =>
              <div key={subId} className={styles.radioSection}>
                <label className="uikit-control-input uikit-control-input--full" htmlFor={subId}>
                  <input
                    id={subId}
                    className="uikit-control-input__input"
                    type="radio"
                    name="radio-ex"
                    tabIndex="0"
                    value={subRegion.name}
                  />
                  <span className="uikit-control-input__text">
                    {subRegion.name}
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

export default AccordionRadioList
