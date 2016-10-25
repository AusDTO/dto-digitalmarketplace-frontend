import React from 'react';
import { Control, Errors } from 'react-redux-form';

const RadioList = (props) => {
  const {
    id,
    label,
    name,
    options,
    model,
    messages,
    validators
  } = props;
  return (
    <div className="field">
      <fieldset>
        <legend>{label}</legend>
        <Errors
          model={model}
          show="touched"
          messages={messages}
          wrapper={(props) => (
            <a className="validation-message" href={`#${id}`}><span className="visuallyhidden">Validation Error: </span>{props.children}</a>
          )}
        />
        {options.map((option, i) => {
          let fieldId = `${id}-${option.value}`;
          return (
            <div key={i}>
              <Control.radio
                model={model}
                name={name}
                id={fieldId}
                value={option.value}
                validators={validators}
              />
              <label htmlFor={fieldId}>{option.label}</label>
            </div>
          )
        })}
      </fieldset>
    </div>
  );
};

RadioList.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  })).isRequired,

  validators: React.PropTypes.object,
  messages: React.PropTypes.object,
};


export default RadioList;