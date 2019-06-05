import React from 'react'

import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'

const ItemSelectInput = props => (
  <div>
    <label htmlFor={props.id}>{props.label}</label>
    <AUtextInput
      block
      className={props.className}
      id={props.id}
      onChange={props.handleSearchChange}
      placeholder={props.placeholder}
      value={props.inputValue}
    />
  </div>
)

export default ItemSelectInput
