import React from 'react';
import { connect } from 'react-redux'

import { getInvalidFields } from '../reduxModules/errorMessageSelector';

class ErrorBox extends React.Component {

  componentDidMount() {
    const { focusOnMount } = this.props;
    if (focusOnMount && this.refs.errorBox) {
      this.refs.errorBox.focus();
    }
  }

  render() {
    const { invalidFields, form } = this.props;

    if (form.submitFailed === false || !invalidFields.length) {
      return <span/>
    }

    return (
      <div ref="errorBox" className="callout--warning" aria-labelledby="validation-masthead-heading" aria-role="group" tabIndex="-1" role="alert">
        <h4 className="validation-masthead-heading">There was a problem with the details you gave</h4>
        {invalidFields && (
          <ul>
            {invalidFields.map(({ messages, id }, i) => {
              return messages.map((message, j) => (
                <li key={`${i}${j}`}>
                  <a href={`#${id}`}>{message}</a>
                </li>
              ))
            })}
          </ul>
        )}
      </div>
    )
  }
}

ErrorBox.propTypes = {
  focusOnMount: React.PropTypes.bool,
  invalidFields: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    message: React.PropTypes.arrayOf(React.PropTypes.string)
  })).isRequired,
  form: React.PropTypes.object
}

export const mapStateToProps = (state, { focusOnMount, model }) => {
  return {
    invalidFields: getInvalidFields(state, model),
    focusOnMount,
    form: state.forms[model].$form
  }
}

export default connect(mapStateToProps)(ErrorBox);