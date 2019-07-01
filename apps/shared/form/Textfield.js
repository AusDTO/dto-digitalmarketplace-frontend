import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import styles from './scss/Textfield.scss'
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
    showMaxLength,
    disabled,
    readOnly,
    type,
    defaultValue,
    placeholder,
    step,
    className,
    prefix,
    postfix,
    onChange
  } = props
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
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          step={step}
          onChange={onChange}
        />
        {postfix && <span className={styles.postfix}>{postfix}</span>}
      </div>
      {messages && <StatefulError model={model} messages={messages} showMessagesDuringFocus="false" id={id} />}
      {showMaxLength && maxLength && <span className={styles.maxLength}>{maxLength} characters maximum</span>}
    </div>
  )
}

Textfield.defaultProps = {
  type: 'text',
  label: '',
  defaultValue: '',
  validators: null,
  messages: null,
  description: '',
  pattern: null,
  disabled: false,
  readOnly: false,
  showMaxLength: false,
  placeholder: '',
  step: null,
  className: '',
  prefix: null,
  postfix: null,
  onChange: () => {},
  topRightComponent: null
}

Textfield.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.string.isRequired]),
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  showMaxLength: PropTypes.bool,
  validators: PropTypes.object,
  messages: PropTypes.object,
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pattern: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  step: PropTypes.string,
  className: PropTypes.string,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  onChange: PropTypes.func,
  topRightComponent: PropTypes.object
}

export default Textfield
