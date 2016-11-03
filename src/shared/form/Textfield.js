import React from 'react';
import { Control } from 'react-redux-form';

import StatefulError from './StatefulError';

const Textfield = ({ name, id, htmlFor, label, model, validators, messages, description }) => (
  <div className="field">
    <label htmlFor={htmlFor} className="question-heading">{label}</label>
    {description && (
      <p className="hint" id={`${id}-hint`}>{description}</p>
    )}
    {messages && <StatefulError model={model} messages={messages} id={id} />}
    <Control.text
      model={model}
      name={name}
      id={id}
      type="text"
      aria-describedby={description && `${id}-hint`}
      mapProps={{
        className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
      }}
      validators={validators}
    />
  </div>
);

Textfield.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
  description: React.PropTypes.string,
};

export default Textfield;