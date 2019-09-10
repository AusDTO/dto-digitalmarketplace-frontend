import React from 'react'

import CharacterCounter from '../CharacterCounter'

const TextfieldComponent = props => {
  const {
    className,
    disabled,
    id,
    name,
    maxLength,
    minLength,
    onChange,
    pattern,
    placeholder,
    readOnly,
    showCharacterCounter,
    value
  } = props

  return (
    <div>
      <input
        className={className}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        onChange={onChange}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        type="text"
        value={value}
      />
      {showCharacterCounter && maxLength && <CharacterCounter limit={maxLength} value={value} />}
    </div>
  )
}

export default TextfieldComponent