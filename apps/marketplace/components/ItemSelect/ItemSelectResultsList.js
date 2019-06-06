import React from 'react'

const ItemSelectResultsList = props => {
  const { emptyResultsMessage, keywords, resultIsEmpty, resultListItems } = props

  return (
    <ul>
      {resultIsEmpty && keywords && emptyResultsMessage}
      {!resultIsEmpty && resultListItems}
    </ul>
  )
}

export default ItemSelectResultsList
