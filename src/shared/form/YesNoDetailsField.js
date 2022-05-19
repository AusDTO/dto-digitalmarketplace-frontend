import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Control, actions } from 'react-redux-form';
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';

import { required }     from '../../validators';
import Textarea         from './Textarea';
import StatefulError    from './StatefulError';

class YesNoDetailsField extends React.Component {

  state = {
    showField: false
  }

  constructor(props) {
    super(props);
    this.state = {
      showField: props.value === 'yes'
    }
  }

  onToggle(e) {
    this.setState({
      showField: e.target.value === 'yes'
    })

    const {model, revalidateDetails} = this.props;
    revalidateDetails(`${model}_details`);
  }

  render() {
    const { name, id, label, model, validators, messages, disabled } = this.props;
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
          disabled={disabled}
        />
        <label htmlFor={`${id}-yes`}>Yes</label>


        <Control.radio
          onClick={this.onToggle.bind(this)}
          id={`${id}-no`}
          name={id}
          value="no"
          model={model}
          validators={validators}
          disabled={disabled}
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
            disabled={disabled}
          />
        )}
      </fieldset>
    )
  }
}

YesNoDetailsField.defaultProps = {
  mapProps: {},
  disabled: false
}

YesNoDetailsField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
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
  disabled: PropTypes.bool
};

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    value: get(state, ownProps.model)
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        revalidateDetails: (detailsModel) => {
            dispatch(actions.setValidity(detailsModel, true));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YesNoDetailsField);