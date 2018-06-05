import React from 'react'
import PropTypes from 'prop-types'
import { Control, controls } from 'react-redux-form'
import { limitWords } from 'shared/validators'

import StatefulError from './StatefulError'
import TextareaComponent from './Textarea/Textarea'

const Textarea = props => {
  const { name, id, label, model, description, showMessagesDuringFocus = true, controlProps = {}, mapProps } = props

  let { validators, messages } = props

  if (controlProps.limit) {
    validators = { ...validators, limitWords: limitWords(controlProps.limit) }
    if (!messages || !messages.limitWords) {
      messages = {
        limitWords: ` ${label} has exceeded the word limit.`,
        ...messages
      }
    }
  }
  return (
    <div className="field">
      <label id={`${id}-label`} className="question-heading au-text-input__label" htmlFor={id}>
        {label}
      </label>
      {description && (
        <div className="au-text-input__hint" id={`${id}-hint`}>
          {description}
        </div>
      )}
      {messages && (
        <StatefulError model={model} messages={messages} id={id} showMessagesDuringFocus={showMessagesDuringFocus} />
      )}
      <Control
        id={id}
        model={model}
        controlProps={{
          name,
          id,
          describedby: description ? `${id}-hint` : `${id}-label`,
          hint: description,
          ...controlProps
        }}
        validators={validators}
        component={TextareaComponent}
        mapProps={{
          className: ({ fieldValue }) =>
            !fieldValue.valid && fieldValue.touched
              ? 'au-text-input--invalid au-text-input au-text-input--block au-text-input--textarea'
              : 'au-text-input au-text-input--block au-text-input--textarea',
          value: prps => prps.viewValue,
          ...mapProps,
          ...controls.default
        }}
      />
    </div>
  )
}

Textarea.defaultProps = {
  mapProps: null,
  validators: null,
  messages: null,
  description: '',
  controlProps: null
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object,
  description: PropTypes.string,
  controlProps: PropTypes.object,
  mapProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

export default Textarea
