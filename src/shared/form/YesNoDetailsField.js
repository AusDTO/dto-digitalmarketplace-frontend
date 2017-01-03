import React from 'react';
import { Control } from 'react-redux-form';
import upperFirst from 'lodash/upperFirst';

import { required }     from '../../validators';
import Textarea         from './Textarea';
import StatefulError    from './StatefulError';

class YesNoDetailsField extends React.Component {

  state = {
    showField: false
  }

  onToggle(e) {
    this.setState({
      showField: e.target.value === 'yes'
    })
  }

  render() {
    const { name, id, label, model, validators, messages } = this.props;
    return (
      <fieldset className="field">
        <legend><strong>{label}</strong></legend>
        <StatefulError model={model} messages={messages} id={id} />
        <Control.radio
          onClick={this.onToggle.bind(this)}
          id={`${id}-yes`}
          name={id}
          value="yes"
          model={model}
          validators={validators}
        />
        <label htmlFor={`${id}-yes`}>Yes</label>


        <Control.radio
          onClick={this.onToggle.bind(this)}
          id={`${id}-no`}
          name={id}
          value="no"
          model={model}
          validators={validators}
        />
        <label htmlFor={`${id}-no`}>No</label>

        {this.state.showField && (
          <Textarea
            name={`${name}_details`}
            id={`${id}-details`}
            model={`${model}_details`}
            label="Please provide details"
            validators={{ required }}
            messages={{
                required: 'Please provide details for ' + upperFirst(id).replace('_', ' '),
            }}
          />
        )}
      </fieldset>
    )
  }
}

YesNoDetailsField.defaultProps = {
  mapProps: {}
}

YesNoDetailsField.propTypes = {
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


export default YesNoDetailsField;