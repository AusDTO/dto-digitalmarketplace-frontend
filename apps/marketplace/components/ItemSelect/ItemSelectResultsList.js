import React from 'react'

import styles from './ItemSelectResultsList.scss'

const ItemSelectResultsList = props => {
  const { emptyResultsMessage, keywords, resultIsEmpty, resultListItems } = props

  return (
    <ul className={styles.itemSelectList}>
      {resultIsEmpty && keywords && emptyResultsMessage}
      {!resultIsEmpty && resultListItems}
    </ul>
  )
}

export default ItemSelectResultsList
