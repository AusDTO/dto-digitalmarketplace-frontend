import React from 'react'

const TextfieldComponent = props => {
  const { className, disabled, id, name, maxLength, minLength, onChange, pattern, placeholder, readOnly, value } = props

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
    </div>
  )
}

export default TextfieldComponent
