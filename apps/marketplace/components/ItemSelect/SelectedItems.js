import React from 'react'
import { Control } from 'react-redux-form'

import { sortObjectByName } from 'marketplace/components/helpers'
import AUheading from '@gov.au/headings/lib/js/react.js'

import styles from './SelectedItems.scss'

const SelectedItemsList = props => {
  const { actions, selectedItems, selectedItemsHeading } = props
  const sortedKeys = selectedItems ? sortObjectByName(selectedItems) : []

  return (
    <div className={`${styles.selectedItemsContainer} ${sortedKeys.length === 0 ? styles.hide : ''}`}>
      <AUheading level="2" size="sm">
        {selectedItemsHeading}
      </AUheading>
      <ul className={styles.selectedItemsList}>
        {sortedKeys.map(key => (
          <li className={styles.selectedListItem} key={key}>
            <span>{selectedItems[key].name}</span>
            {React.cloneElement(actions, { id: key, ...selectedItems[key] })}
          </li>
        ))}
      </ul>
    </div>
  )
}

const SelectedItems = props => {
  const { actions, model, selectedItemsHeading } = props

  return (
    <Control.custom
      actions={actions}
      component={SelectedItemsList}
      mapProps={{
        formModel: ownProps => ownProps.model,
        selectedItems: ownProps => ownProps.modelValue
      }}
      model={model}
      selectedItemsHeading={selectedItemsHeading}
    />
  )
}

export default SelectedItems
