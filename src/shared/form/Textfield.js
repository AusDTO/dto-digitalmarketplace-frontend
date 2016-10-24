import React from 'react';
import { Control, Errors } from 'react-redux-form';

const Textfield = ({ name, id, htmlFor, label, model, validators, messages, description }) => (
  <div className="field">
    <label htmlFor={htmlFor} className="question-heading">{label}</label>
    {description && (
      <p className="hint">{description}</p>
    )}
    <Errors 
      model={model}
      show="touched"
      messages={messages}
      wrapper={(props) => (
        <a className="validation-message" href={`#${id}`}><span className="visuallyhidden">Validation Error: </span>{props.children}</a>
      )}
    />
    <Control.text
      model={model}
      name={name}
      id={id}
      type="text"
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