import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'

import styles from './ItemSelectSummary.scss'

const ItemSelectSummary = props => {
  const { handleRemoveItem, selectedItems, summaryHeading } = props
  const sortedKeys = Object.keys(selectedItems).sort((a, b) => (selectedItems[a] > selectedItems[b] ? 1 : -1))

  return (
    <div className={styles.itemSelectSummary}>
      <AUheading level="2" size="sm">
        {summaryHeading}
      </AUheading>
      <ul className={styles.itemSelectSummaryList}>
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

export default ItemSelectSummary
