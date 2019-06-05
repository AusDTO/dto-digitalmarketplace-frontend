import React from 'react'

import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'

const ItemSelectInput = props => (
  <AUtextInput
    className={props.className}
    id={props.id}
    onChange={props.handleSearchChange}
    placeholder={props.placeholder}
    value={props.inputValue}
  />
)

export default ItemSelectInput
