import React from 'react'
import PropTypes from 'prop-types'
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
      type,
      ariaDescribedBy
    } = this.props
    /*eslint-disable jsx-a11y/label-has-for*/
    return (
      <div className="field">
        <label htmlFor={htmlFor} className="question-heading uikit-text-input__label">
          {label}
        </label>
        {description &&
          <p className="hint" id={`${id}-hint`}>
            {description}
          </p>}
        {messages && <StatefulError model={model} messages={messages} id={id} />}
        <Control.input
          model={model}
          name={name}
          id={id}
          type={type}
          aria-describedby={ariaDescribedBy}
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
