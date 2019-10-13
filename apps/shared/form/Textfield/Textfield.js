import React from 'react'
import PropTypes from 'prop-types'

import CharacterCounter from '../CharacterCounter'

const TextfieldComponent = props => {
  const {
    className,
    defaultValue,
    describedBy,
    disabled,
    id,
    max,
    maxLength,
    min,
    minLength,
    name,
    onBlur,
    onChange,
    onFocus,
    pattern,
    placeholder,
    readOnly,
    showCharacterCounter,
    type,
    value
  } = props

  const props2 = {}
  if (maxLength > 0) {
    props2.maxLength = maxLength
  }

  return (
    <div>
      <input
        aria-describedby={describedBy}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        minLength={minLength}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        value={value}
        {...props2}
      />
      {showCharacterCounter && type === 'text' && maxLength > 0 && <CharacterCounter limit={maxLength} value={value} />}
    </div>
  )
}

TextfieldComponent.defaultProps = {
  className: '',
  defaultValue: '',
  describedBy: '',
  disabled: false,
  id: '',
  max: 0,
  maxLength: 0,
  min: 0,
  minLength: 0,
  name: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  pattern: null,
  placeholder: '',
  readOnly: false,
  showCharacterCounter: false,
  type: 'text',
  value: null
}

TextfieldComponent.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  describedBy: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  showCharacterCounter: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default TextfieldComponent
