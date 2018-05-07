import React from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'

import StatefulError from './StatefulError'

const RadioList = props => {
  const { id, label, name, options, model, messages, validators } = props
  return (
    <div className="field">
      <fieldset>
        {label !== '' &&
          <legend>
            {label}
          </legend>}
        <div>
          {options.map(option => {
            const fieldId = `${id}-${option.value}`
            return (
              <span key={fieldId} className="radio-list-container">
                <span className="au-control-input au-control-input--full">
                  <Control.radio
                    model={model}
                    name={name}
                    id={fieldId}
                    mapProps={{
                      className: 'au-control-input__input'
                    }}
                    value={option.value}
                    validators={validators}
                  />
                  <label className="au-control-input__text" htmlFor={fieldId}>
                    {option.label}
                  </label>
                </span>
              </span>
            )
          })}
        </div>
        <StatefulError model={model} messages={messages} id={id} showMessagesDuringFocus="false" />
      </fieldset>
    </div>
  )
}

RadioList.defaultProps = {
  validators: null,
  messages: null
}

RadioList.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    })
  ).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object
}

export default RadioList
