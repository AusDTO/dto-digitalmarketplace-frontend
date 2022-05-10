import React from 'react';
import PropTypes from 'prop-types'
import { Control, controls } from 'react-redux-form';

import StatefulError from './StatefulError';
import TextareaComponent from '../Textarea';

import { limitWords, validCharacters } from '../../validators';

const Textarea = (props) => {
  let {
    name,
    id,
    label,
    model,
    validators,
    messages,
    description,
    showMessagesDuringFocus = false,
    disabled,
    readOnly,
    controlProps = {},
    mapProps
  } = props;

  if (controlProps.limit) {
    validators = { ...validators, limitWords: limitWords(controlProps.limit) }
    messages = { limitWords: `${label} has exceeded the word limit.`, ...messages }
  }

  validators = {
    validCharacters,
    ...validators
  }

  if (!messages || !messages.validCharacters) {
    messages = {
      validCharacters: `Your draft content for '${label}' contains invalid characters. This usually happens when you copy and paste from an external document. We recommend to type in your response.`,
      ...messages
    }
  }

  return (
    <div className="field">
      <label id={`${id}-label`} className="question-heading" htmlFor={id}>{label}</label>
      {description && (
        <p className="hint" id={`${id}-hint`}>{description}</p>
      )}
      {messages && <StatefulError model={model} messages={messages} id={id} showMessagesDuringFocus={showMessagesDuringFocus} />}
      <Control
        id={id}
        model={model}
        controlProps={{ name, id, describedby: description ? `${id}-hint` : `${id}-label`, hint: description, ...controlProps}}
        validators={validators}
        disabled={disabled}
        readOnly={readOnly}
        component={TextareaComponent}
        mapProps={{
          className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
          value: (props) => props.viewValue,
          ...mapProps,
          ...controls.default,
        }}
      />
    </div>
  )
};

Textarea.defaultProps = {
  mapProps: {},
  disabled: false,
  readOnly: false
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  model: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,

  validators: PropTypes.object,
  messages: PropTypes.object,
  description: PropTypes.string,
  controlProps: PropTypes.object,
  mapProps: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};


export default Textarea;
