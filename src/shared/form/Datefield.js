import React from 'react';
import { Control } from 'react-redux-form';

import StatefulError from './StatefulError';

const Datefield = ({ name, id, htmlFor, label, model, validators, messages, description, pattern, maxLength, type }) => (
  <div className="datefield">
    <label htmlFor={htmlFor} className="question-heading">{label}</label>
    {description && (
      <p className="hint" id={`${id}-hint`}>{description}</p>
    )}
    {messages && <StatefulError model={model} messages={messages} id={id} />}
    <Control.text
      model={`${model}.day`}
      name={`${name}-day`}
      id={`${id}-day`}
      type={type}
      aria-describedby={description && `${id}-hint`}
      mapProps={{
        className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
      }}
      validators={validators}
      pattern={pattern}
      maxLength={maxLength}
    />
    <Control.text
      model={`${model}.month`}
      name={`${name}-month`}
      id={`${id}-month`}
      type={type}
      aria-describedby={description && `${id}-hint`}
      mapProps={{
        className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
      }}
      validators={validators}
      pattern={pattern}
      maxLength={maxLength}
    />
    <Control.text
      model={`${model}.year`}
      name={`${name}-year`}
      id={`${id}-year`}
      type={type}
      aria-describedby={description && `${id}-hint`}
      mapProps={{
        className: ({ fieldValue }) => !fieldValue.valid && fieldValue.touched ? 'invalid' : '',
      }}
      validators={validators}
      pattern={pattern}
      maxLength={maxLength}
    />
  </div>
);

Datefield.defaultProps = {
    type: "text"
}

Datefield.propTypes = {
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
  pattern: React.PropTypes.string,
  type: React.PropTypes.string
};

export default Datefield;
