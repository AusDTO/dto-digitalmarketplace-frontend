import React from 'react'

import ItemSelectInput from './ItemSelectInput'
import ItemSelectResultsList from './ItemSelectResultsList'
import SelectedItems from './SelectedItems'

const ItemSelect = props => {
  const {
    description,
    emptyResultsMessage,
    handleRemoveItem,
    handleSearchChange,
    handleSearchClick,
    id,
    inputValue,
    items,
    label,
    model,
    minimumSearchChars,
    placeholder,
    resultIsEmpty,
    resultListItems,
    selectedItemsHeading,
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
      {inputValue.length >= minimumSearchChars && (
        <ItemSelectResultsList
          emptyResultsMessage={emptyResultsMessage}
          items={items}
          resultIsEmpty={resultIsEmpty}
          resultListItems={resultListItems}
          keywords={inputValue}
        />
      )}
      <SelectedItems handleRemoveItem={handleRemoveItem} model={model} selectedItemsHeading={selectedItemsHeading} />
    </React.Fragment>
  )
}

export default ItemSelect
