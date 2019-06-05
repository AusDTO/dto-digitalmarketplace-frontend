import React from 'react'

import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'

// eslint-disable-next-line no-unused-vars
import styles from './ItemSelectInput.scss'

const ItemSelectInput = props => {
  const { className, description, handleSearchChange, id, inputValue, label, placeholder } = props

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <span>{description}</span>
      </div>
      <AUtextInput
        block
        className={className}
        id={id}
        onChange={handleSearchChange}
        placeholder={placeholder}
        value={inputValue}
      />
    </div>
  )
}

export default ItemSelectInput
