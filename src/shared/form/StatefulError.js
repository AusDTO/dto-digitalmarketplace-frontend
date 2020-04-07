import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Errors } from 'react-redux-form';

import { addMessage, removeMessage } from '../reduxModules/errorMessage';


class StatefulError extends React.Component {

  componentDidMount() {
    const { dispatch, messages, model, id } = this.props;
    dispatch(addMessage(model, messages, id));
  }

  componentWillUnmount() {
    const { dispatch, model } = this.props;
    dispatch(removeMessage(model));
  }

  render() {
    const { model, id, messages, showMessagesDuringFocus } = this.props;

    return (
      <Errors
        model={model}
        show={(field) => field.touched && (showMessagesDuringFocus || !field.focus)}
        messages={messages}
        component={({ children }) => {
          return (
            <React.Fragment>
              <a className="validation-message" href={`#${id}`}>
                <span className="validation-message">{children}</span>
              </a>
              <br />
            </React.Fragment>
          )
        }}
        wrapper={({ children }) => {
          if (!children.length) {
            return null;
          }

          return (
            <div>
              <span className="visuallyhidden">Validation Error: </span>
              {children}
            </div>
          )
        }}
      />
    )
  }

};

StatefulError.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id:       PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.string).isRequired,
  model:    PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps)(StatefulError);
