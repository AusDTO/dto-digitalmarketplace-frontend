import React from 'react'
import { Control } from 'react-redux-form'

import StatefulError from './StatefulError'

const RadioList = (props) => {
  const {
        id,
        label,
        name,
        options,
        model,
        messages,
        validators
    } = props
  return (
        <div className="field">
            <fieldset>
                <legend>{label}</legend>
                <StatefulError model={model} messages={messages} id={id} />
                <div>
                    {options.map((option, i) => {
                      let fieldId = `${id}-${option.value}`
                      return (
                            <span key={i}>
                                <Control.radio
                                    model={model}
                                    name={name}
                                    id={fieldId}
                                    value={option.value}
                                    validators={validators}
                                />
                                <label htmlFor={fieldId}>{option.label}</label>
                            </span>
                      )
                    })}
                </div>
            </fieldset>
        </div>
  )
}

RadioList.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  })).isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
}


export default RadioList