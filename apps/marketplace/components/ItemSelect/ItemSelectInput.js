import React from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'

import styles from './ItemSelectInput.scss'

const ItemSelectInput = props => {
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
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div>
        <span>{description}</span>
      </div>
      <div className={styles.textInputContainer}>
        <AUtextInput
          className={`${styles.textInput} ${showSearchButton ? styles.textInputWithButton : ''}`}
          id={id}
          onChange={handleSearchChange}
          placeholder={placeholder}
          value={inputValue}
        />
        {showSearchButton && (
          <AUbutton className={styles.searchButton} onClick={handleSearchClick}>
            Search
          </AUbutton>
        )}
      </div>
    </div>
  )
}

export default ItemSelectInput
