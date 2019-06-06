import React from 'react'

import styles from './ItemSelectResultsList.scss'

const ItemSelectResultsList = props => {
  const { emptyResultsMessage, items, keywords, resultListItems } = props

  const numberOfItems = items.length
  const resultIsEmpty = numberOfItems < 1

  return (
    <ul
      className={`
        ${styles.itemSelectList}
        ${!resultIsEmpty ? styles.hasResults : ''}
      `}
    >
      {resultIsEmpty && keywords && emptyResultsMessage}
      {!resultIsEmpty && resultListItems}
    </ul>
  )
}

export default ItemSelectResultsList
