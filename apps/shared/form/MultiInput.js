/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { Control, controls } from 'react-redux-form'

import StatefulError from './StatefulError'
import MultiInputComponent from 'shared/MultiInput'

const MultiInput = props => {
  const { id, name, htmlFor, label, description, model, messages, controlProps, mapProps, validators } = props

  return (
    <div className="field">
      <label htmlFor={htmlFor} className="question-heading au-text-input__label">
        {label}
      </label>
      {description &&
        <div className="au-text-input__hint" id={`${id}-hint`}>
          {description}
        </div>}
      {messages && <StatefulError model={model} messages={messages} id={id} />}
      <Control
        model={model}
        controlProps={{ name, id, describedby: `${id}-hint`, hint: description, ...controlProps }}
        mapProps={{
          rows: ({ viewValue }) => viewValue,
          className: ({ fieldValue }) => (!fieldValue.valid && fieldValue.touched ? 'invalid' : ''),
          ...mapProps,
          ...controls.default
        }}
        validators={validators}
        component={MultiInputComponent}
      />
    </div>
  )
}

MultiInput.defaultProps = {
  mapProps: {}
}

MultiInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  messages: PropTypes.object,
  validators: PropTypes.object,
  description: PropTypes.string,
  controlProps: PropTypes.object,
  mapProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

export default MultiInput
