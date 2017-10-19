/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import Accordion from '@gov.au/accordion'
import { bindActionCreators } from 'redux'
import styles from './AccordionRadioList.scss'
import { actionCreators as actions } from 'orams/actions/sellerCatalogueActions'

const RegionsAccordionRadioList = props => {
  const { data, regionAccordionOpen } = props
  const { regions } = data

  return (
    <div className={styles.container}>
      <div className="uikit-display-2">
        <strong>
          {props.title}
        </strong>
      </div>
      {regions &&
        regions.map((region, id = uniqueID()) =>
          <div key={id}>
            <Accordion header={region.name} open={regionAccordionOpen === region.name + id}>
              <div>
                {region.subRegions.map((subRegion, subId = uniqueID()) =>
                  <div key={subId} className={styles.radioSection}>
                    <label
                      className="uikit-control-input uikit-control-input--full"
                      htmlFor={region.name + subRegion.name + subId}
                    >
                      <input
                        id={region.name + subRegion.name + subId}
                        className="uikit-control-input__input"
                        type="radio"
                        name="region"
                        tabIndex="0"
                        value={subRegion.id}
                        defaultChecked={props.region === subRegion.id}
                        onChange={e => {
                          props.setRegion(e.target.value)
                          props.onRegionAccordionOpen(region.name + id)
                          props.loadTableData()
                        }}
                      />
                      <span className="uikit-control-input__text">
                        {subRegion.name}
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

export default RegionsAccordionRadioList
