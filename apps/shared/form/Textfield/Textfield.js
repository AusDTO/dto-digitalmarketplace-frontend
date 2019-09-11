import React from 'react'

import CharacterCounter from '../CharacterCounter'

const TextfieldComponent = props => {
  const {
    className,
    defaultValue,
    describedBy,
    disabled,
    id,
    name,
    max,
    maxLength,
    min,
    minLength,
    onChange,
    pattern,
    placeholder,
    readOnly,
    showCharacterCounter,
    type,
    value
  } = props

  return (
    <div>
      <input
        aria-describedby={describedBy}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        max={max}
        maxLength={maxLength}
        min={min}
        minLength={minLength}
        name={name}
        onChange={onChange}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        value={value}
      />
      {showCharacterCounter && maxLength && <CharacterCounter limit={maxLength} value={value} />}
    </div>
  )
}

export default TextfieldComponent
