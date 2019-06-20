import React from 'react'
import { Control } from 'react-redux-form'

import AUheading from '@gov.au/headings/lib/js/react.js'

import styles from './SelectedItems.scss'

const SelectedItemsList = props => {
  const { handleRemoveItem, selectedItems, selectedItemsHeading } = props
  const sortedKeys = Object.keys(selectedItems).sort((a, b) => (selectedItems[a] > selectedItems[b] ? 1 : -1))

  return (
    <div className={styles.selectedItemsContainer}>
      <AUheading level="2" size="sm">
        {selectedItemsHeading}
      </AUheading>
      <ul className={styles.selectedItemsList}>
        {sortedKeys.map(key => (
          <li key={key}>
            <span>{selectedItems[key]}</span>
            <a
              href="#remove"
              onClick={e => {
                e.preventDefault()
                handleRemoveItem(key)
              }}
            >
              Remove
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SelectedItems = props => {
  const { handleRemoveItem, model, selectedItemsHeading } = props

  return (
    <Control.custom
      component={SelectedItemsList}
      handleRemoveItem={handleRemoveItem}
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
