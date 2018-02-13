import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import get from 'lodash/get';

import PageAlert from '@gov.au/page-alerts';

import { getInvalidFields } from '../reduxModules/errorMessageSelector';

class ErrorBox extends React.Component {
  state = {
    lastFocus: null
  }

  setRef = c => {
    this._container = c
  }

  componentDidMount() {
    this.focusIfNeeded()
  }

  componentDidUpdate() {
    this.focusIfNeeded()
  }

  focusIfNeeded() {
    if (this._container && this.state.lastFocus !== this.props.submitClicked) {
      this.setState({
        lastFocus: this.props.submitClicked
      })
      this.props.setFocus(this._container)
    }
  }

  render() {
    const { invalidFields, form } = this.props;
    if (form.submitFailed === false || !invalidFields.length) {
      return null;
    }

    return (
      <PageAlert as='error'>
        <h4 id="validation-masthead-heading" ref={this.setRef} tabIndex="-1">There was a problem with the details you gave</h4>
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
      </PageAlert>
    )
  }
}

ErrorBox.propTypes = {
  focusOnMount: PropTypes.bool,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  form: PropTypes.object
}

export const mapStateToProps = (state, { focusOnMount, model }) => {
  return {
    invalidFields: getInvalidFields(state, model),
    // Currently does nada, since cDM since render is not blocked internally.
    focusOnMount,
    form: get(state, `forms.${model}.$form`, {})
  }
}

export default connect(mapStateToProps)(ErrorBox);
