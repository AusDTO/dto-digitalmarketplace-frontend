import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'

import StatefulError from './StatefulError'

const Textfield = props => {
  const {
    name,
    id,
    htmlFor,
    label,
    model,
    validators,
    messages,
    description,
    pattern,
    maxLength,
    disabled,
    readOnly,
    type
  } = props
  return (
    <div className="field">
      <label htmlFor={htmlFor} id={`${id}-label`} className="question-heading uikit-text-input__label">
        {label}
      </label>
      {description &&
        <p className="hint" id={`${id}-hint`}>
          {description}
        </p>}
      <Control.input
        model={model}
        name={name}
        id={id}
        type={type}
        aria-describedby={`${id}-label`}
        mapProps={{
          className: ({ fieldValue }) =>
            !fieldValue.valid && fieldValue.touched
              ? 'uikit-text-input--invalid uikit-text-input uikit-text-input--block'
              : 'uikit-text-input uikit-text-input--block'
        }}
        validators={validators}
        pattern={pattern}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
      />
      {messages && <StatefulError model={model} messages={messages} showMessagesDuringFocus="false" id={id} />}
    </div>
  )
}

Textfield.defaultProps = {
  type: 'text',
  label: '',
  validators: null,
  messages: null,
  description: '',
  pattern: null,
  disabled: false,
  readOnly: false
}

Textfield.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.string.isRequired]),
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object,
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pattern: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string
}

export default Textfield
