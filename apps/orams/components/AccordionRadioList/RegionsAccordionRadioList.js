/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { bindActionCreators } from 'redux'
import styles from './AccordionRadioList.scss'
import { actionCreators as actions } from 'orams/actions/sellerCatalogueActions'

const RegionsAccordionRadioList = props => {
  const { data, regionAccordionOpen } = props
  const { regions } = data

  return (
    <div className={styles.container}>
      <h2 className="au-display-lg">{props.title}</h2>
      {regions &&
        regions.map((region, id = uniqueID()) => (
          <div key={id}>
            <AUaccordion header={region.name} open={regionAccordionOpen === region.name + id}>
              <div>
                {region.subRegions.map((subRegion, subId = uniqueID()) => (
                  <div key={subId} className={styles.radioSection}>
                    <label
                      className="au-control-input au-control-input--full"
                      htmlFor={region.name + subRegion.name + subId}
                    >
                      <input
                        id={region.name + subRegion.name + subId}
                        className="au-control-input__input"
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
                      <span className="au-control-input__text">{subRegion.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </AUaccordion>
          </div>
        ))}
    </div>
  )
}

export default RegionsAccordionRadioList
