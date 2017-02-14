import React from 'react';
import { connect } from 'react-redux';
import { Control } from 'react-redux-form';
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';

import { required }     from '../../validators';
import Textfield         from './Textfield';
import StatefulError    from './StatefulError';

class CheckboxDetailsField extends React.Component {

  state = {
    showField: false
  }

  constructor(props) {
    super(props);
    this.state = {
      showField: props.checked === true
    }
  }

  onToggle(e) {
    this.setState({
      showField: e.target.checked === true
    })
  }

  render() {
    const { name, id, label, model, detailsLabel, detailsModel, validators, messages } = this.props;
    return (
      <span>
        <StatefulError model={model} messages={messages} id={id} />
        <Control.checkbox
          onClick={this.onToggle.bind(this)}
          id={id}
          name={name}
          value="yes"
          model={model}
          validators={validators}
        />
        <label htmlFor={id}>{label}</label>


        {this.state.showField && (
          <Textfield
            name={`${name}_details`}
            id={`${id}-details`}
            htmlFor={`${id}-details`}
            model={detailsModel}
            label={detailsLabel}
            validators={{ required }}
            messages={{
                required: detailsLabel,
            }}
          />
        )}
      </span>
    )
  }
}

CheckboxDetailsField.defaultProps = {
  mapProps: {},
  messages: {},
  detailsLabel: "Please provide details"
}

CheckboxDetailsField.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string,
  ]).isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,
  detailsLabel: React.PropTypes.string,
  detailsModel: React.PropTypes.oneOfType([
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

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    checked: get(state, ownProps.model)
  }
}

export default connect(mapStateToProps)(CheckboxDetailsField);