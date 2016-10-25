import React from 'react';
import { connect } from 'react-redux';
import { Errors } from 'react-redux-form';

import { addMessage, removeMessage } from '../../bundles/CaseStudy/redux/modules/errorMessage';


class StatefulError extends React.Component {

  componentDidMount() {
    const { dispatch, messages, model } = this.props;
    dispatch(addMessage(model, messages));
  }

  componentWillUnmount() {
    const { dispatch, model } = this.props;
    dispatch(removeMessage(model));
  }

  render() {
    const { model, id, messages } = this.props;
    return (
      <Errors 
        model={model}
        show="touched"
        messages={messages}
        wrapper={(props) => (
          <a className="validation-message" href={`#${id}`}>
            <span className="visuallyhidden">Validation Error: </span>
            {props.children}
          </a>
        )}
      />
    )
  }

};

StatefulError.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps)(StatefulError);