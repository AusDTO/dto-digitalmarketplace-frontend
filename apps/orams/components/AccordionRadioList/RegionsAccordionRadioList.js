import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import Accordion from '@gov.au/accordion'

import styles from './AccordionRadioList.scss'

const RegionAccordionRadioList = props => {
  const { data } = props
  const { regions } = data

  return (
    <div className={styles.container}>
      <div className="uikit-display-2">
        <strong>
          {props.title}
        </strong>
      </div>
      {regions.map((region, id = uniqueID()) =>
        <div key={id}>
          <Accordion header={region.mainRegion}>
            {region.subRegions.map((subRegion, subId = uniqueID()) =>
              <div key={subId} className={styles.radioSection}>
                <label
                  className="uikit-control-input uikit-control-input--full"
                  htmlFor={region.mainRegion + subRegion.name + subId}
                >
                  <input
                    id={region.mainRegion + subRegion.name + subId}
                    className="uikit-control-input__input"
                    type="radio"
                    name="regions"
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

export default RegionAccordionRadioList
