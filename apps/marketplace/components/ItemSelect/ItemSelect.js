import React from 'react'

import ItemSelectInput from './ItemSelectInput'

const ItemSelect = props => {
  const {
    description,
    handleSearchChange,
    handleSearchClick,
    id,
    inputValue,
    label,
    placeholder,
    showSearchButton
  } = props

  return (
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
  )
}

export default ItemSelect
