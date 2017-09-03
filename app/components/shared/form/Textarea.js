import React from 'react'
import PropTypes from 'prop-types'
import { Control, controls } from 'react-redux-form'

import StatefulError from './StatefulError'
import TextareaComponent from './Textarea/Textarea'

import { limitWords } from '../../validators'

const Textarea = props => {
  const { name, id, label, model, description, showMessagesDuringFocus = false, controlProps = {}, mapProps } = props

  let { validators, messages } = props

  if (controlProps.limit) {
    validators = { ...validators, limitWords: limitWords(controlProps.limit) }
    messages = {
      limitWords: `${label} has exceeded the word limit.`,
      ...messages
    }
  }
  return (
    <div className="field">
      <label className="question-heading" htmlFor={id}>
        {label}
      </label>
      {description &&
        <p className="hint" id={`${id}-hint`}>
          {description}
        </p>}
      {messages &&
        <StatefulError model={model} messages={messages} id={id} showMessagesDuringFocus={showMessagesDuringFocus} />}
      <Control
        id={id}
        model={model}
        controlProps={{
          name,
          id,
          describedby: `${id}-hint`,
          hint: description,
          ...controlProps
        }}
        validators={validators}
        component={TextareaComponent}
        mapProps={{
          className: ({ fieldValue }) =>
            !fieldValue.valid && fieldValue.touched
              ? 'uikit-text-input--invalid uikit-text-input uikit-text-input--block uikit-text-input--textarea'
              : 'uikit-text-input uikit-text-input--block uikit-text-input--textarea',
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
