import React from 'react'

import ItemSelectInput from './ItemSelectInput'

const ItemSelect = props => {
  const { className, description, handleSearchChange, id, inputValue, label, placeholder } = props

  return (
    <ItemSelectInput
      className={className}
      description={description}
      handleSearchChange={handleSearchChange}
      id={id}
      inputValue={inputValue}
      label={label}
      placeholder={placeholder}
    />
  )
}

export default ItemSelect
