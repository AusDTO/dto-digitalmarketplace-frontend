import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'

import { validCharacters } from 'shared/validators'

import StatefulError from './StatefulError'
import TextfieldComponent from './Textfield/Textfield'

import styles from './scss/Textfield.scss'

const Textfield = props => {
  const {
    className,
    defaultValue,
    description,
    disabled,
    htmlFor,
    id,
    label,
    max,
    maxLength,
    min,
    minLength,
    model,
    name,
    onChange,
    pattern,
    placeholder,
    postfix,
    prefix,
    readOnly,
    showCharacterCounter,
    type
  } = props

  let { messages, validators } = props

  validators = {
    validCharacters,
    ...validators
  }

  if (!messages || !messages.validCharacters) {
    messages = {
      validCharacters: `You cannot have invalid characters in '${label}'.`,
      ...messages
    }
  }

  return (
    <div className={`field ${className}`}>
      <label htmlFor={htmlFor} id={`${id}-label`} className="question-heading au-text-input__label">
        {label}
      </label>
      {props.topRightComponent && props.topRightComponent}
      {description && (
        <div className="au-text-input__hint" id={`${id}-hint`}>
          {description}
        </div>
      )}
      <div className={styles.table}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <Control.input
          component={TextfieldComponent}
          controlProps={{
            describedBy: description ? `${id}-hint` : `${id}-label`
          }}
          model={model}
          name={name}
          id={id}
          type={type}
          aria-describedby={`${id}-label`}
          mapProps={{
            className: ({ fieldValue }) =>
              !fieldValue.valid && fieldValue.touched
                ? 'au-text-input--invalid au-text-input au-text-input--block'
                : 'au-text-input au-text-input--block'
          }}
          validators={validators}
          pattern={pattern}
          max={type === 'number' ? max : null}
          maxLength={maxLength}
          min={type === 'number' ? min : null}
          minLength={minLength}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          showCharacterCounter={showCharacterCounter}
          onChange={onChange}
        />
        {postfix && <span className={styles.postfix}>{postfix}</span>}
      </div>
      {messages && <StatefulError model={model} messages={messages} showMessagesDuringFocus="false" id={id} />}
    </div>
  )
}

Textfield.defaultProps = {
  className: '',
  defaultValue: '',
  description: '',
  disabled: false,
  label: '',
  max: 0,
  maxLength: 0,
  messages: null,
  min: 0,
  minLength: 0,
  onChange: () => {},
  pattern: null,
  placeholder: '',
  postfix: null,
  prefix: null,
  readOnly: false,
  showCharacterCounter: true,
  topRightComponent: null,
  type: 'text',
  validators: null
}

Textfield.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  disabled: PropTypes.bool,
  htmlFor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.string.isRequired]),
  max: PropTypes.number,
  maxLength: PropTypes.number,
  messages: PropTypes.object,
  min: PropTypes.number,
  minLength: PropTypes.number,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  postfix: PropTypes.string,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  showCharacterCounter: PropTypes.bool,
  topRightComponent: PropTypes.object,
  type: PropTypes.string,
  validators: PropTypes.object
}

export default Textfield
