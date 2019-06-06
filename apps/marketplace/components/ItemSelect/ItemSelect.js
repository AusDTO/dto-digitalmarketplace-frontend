import React from 'react'

import ItemSelectInput from './ItemSelectInput'
import ItemSelectResultsList from './ItemSelectResultsList'

const ItemSelect = props => {
  const {
    description,
    emptyResultsMessage,
    handleSearchChange,
    handleSearchClick,
    id,
    inputValue,
    label,
    placeholder,
    resultIsEmpty,
    resultListItems,
    showSearchButton
  } = props

  return (
    <React.Fragment>
      <ItemSelectInput
        description={description}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
        id={id}
        inputValue={inputValue}
        label={label}
        placeholder={placeholder}
        showSearchButton={showSearchButton}
      />
      <ItemSelectResultsList
        emptyResultsMessage={emptyResultsMessage}
        resultIsEmpty={resultIsEmpty}
        resultListItems={resultListItems}
        keywords={inputValue}
      />
    </React.Fragment>
  )
}

export default ItemSelect
