import React from 'react'
import { Control } from 'react-redux-form'

import StatefulError from './StatefulError'

class Textfield extends React.Component {
  render() {
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
    } = this.props
    return (
      <div className="field">
        <label
          htmlFor={htmlFor}
          className="question-heading uikit-text-input__label"
        >
          {label}
        </label>
        {description &&
          <p className="hint" id={`${id}-hint`}>
            {description}
          </p>}
        {messages &&
          <StatefulError model={model} messages={messages} id={id} />}
        <Control.input
          model={model}
          name={name}
          id={id}
          type={type}
          aria-describedby={description && `${id}-hint`}
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
      </div>
    )
  }
}
Textfield.defaultProps = {
  type: 'text'
}

Textfield.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  label: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired
  ]),
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string
  ]).isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
  description: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string
  ]),
  pattern: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  type: React.PropTypes.string
}

export default Textfield
