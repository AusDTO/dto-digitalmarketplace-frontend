import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import styles from './AccordionRadioList.scss'
import Accordion from '@gov.au/accordion'
import RadioList from 'shared/form/RadioList'

const AccordionRadioList = (props) => {

  const { data } = props
  const { items } = data

  return (
    <div className={styles.container}>
      <div className="uikit-display-2"><strong>{props.title}</strong></div>
      {items.map((item, id = uniqueID()) =>
        <div key={id}>
          <Accordion header={item.mainRegion}>
            {item.subRegions.map((subRegion, id = uniqueID()) =>
              <div key={id} className={styles.radioSection}>              
                <label className="uikit-control-input uikit-control-input--full" htmlFor={id}>
                  <input 
                    id={id} 
                    className="uikit-control-input__input" 
                    type="radio" 
                    name="radio-ex" 
                    tabIndex='0'
                    value={subRegion.name}/>
                  <span className="uikit-control-input__text">{subRegion.name}</span>
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
