import React from 'react';
import { Control, controls } from 'react-redux-form';

import StatefulError from './StatefulError';
import TextareaComponent from '../Textarea';

const Textarea = ({ name, id, label, model, validators, messages, description, controlProps, mapProps }) => (
  <div className="field">
    <label className="question-heading" htmlFor={id}>{label}</label>
    {description && (
      <p className="hint" id={`${id}-hint`}>{description}</p>
    )}
    {messages && <StatefulError model={model} messages={messages} id={id} />}
    <Control
      model={model}
      controlProps={{ name, id, describedby: `${id}-hint`, hint: description, ...controlProps}}
      validators={validators}
      component={TextareaComponent}

      mapProps={{
        className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
        value: (props) => props.viewValue,
        ...mapProps,
        ...controls.default,
      }}
    />
  </div>
);

Textarea.defaultProps = {
  mapProps: {}
}

Textarea.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
  description: React.PropTypes.string,
  controlProps: React.PropTypes.object,
  mapProps: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.object,
  ]),
};


export default Textarea;