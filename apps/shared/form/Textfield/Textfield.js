import React from 'react'

const TextfieldComponent = props => {
  const { className, disabled, id, name, maxLength, minLength, pattern, placeholder, readOnly, value } = props

  return (
    <div>
      <input
        className={className}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        type="text"
        value={value}
      />
    </div>
  )
}

export default TextfieldComponent
