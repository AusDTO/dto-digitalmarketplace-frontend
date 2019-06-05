import React from 'react'

import Textfield from 'shared/form/Textfield'

const ItemSelectInput = props => (
  <Textfield
    defaultValue={props.defaultValue}
    description={props.description}
    htmlFor={props.id}
    id={props.id}
    label={props.label}
    maxLength={props.maxLength}
    model={props.model}
    name={props.name}
    placeholder={props.placeholder}
    validators={props.validators}
  />
)

export default ItemSelectInput
