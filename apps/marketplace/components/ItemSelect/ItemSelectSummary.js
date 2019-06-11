import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'

import styles from './ItemSelectSummary.scss'

const ItemSelectSummary = props => {
  const { selectedItems, summaryHeading } = props
  const sortedKeys = Object.keys(selectedItems).sort((a, b) => (selectedItems[a] > selectedItems[b] ? 1 : -1))

  return (
    <div className={styles.itemSelectSummary}>
      <AUheading level="2" size="sm">
        {summaryHeading}
      </AUheading>
      <ul>{sortedKeys.map(key => <li key={key}>{selectedItems[key]}</li>)}</ul>
    </div>
  )
}

export default ItemSelectSummary
