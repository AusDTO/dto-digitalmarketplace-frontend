/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import { getInvalidFields } from './errorMessageSelector'

import styles from './ErrorBox.scss'

export class ErrorBoxComponent extends React.Component {
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
    const { invalidFields, form, errorMessage, title } = this.props
    if ((form.submitFailed === false && !errorMessage) || (!invalidFields.length && !errorMessage)) {
      this._container = null
      return null
    }

    return (
      <AUpageAlert as="error">
        <h4 id="validation-masthead-heading" ref={this.setRef} tabIndex="-1">
          {title || 'There was a problem with the details you gave'}
        </h4>
        <ul>
          {invalidFields &&
            !errorMessage &&
            invalidFields.map(({ messages, id }, i) =>
              messages.map((message, j) => (
                <li key={`${i}${j}`} className={styles.newLines}>
                  <a href={`#${id}`}>{message}</a>
                </li>
              ))
            )}
          {errorMessage && !Array.isArray(errorMessage) && <li key="errorMessage">{errorMessage}</li>}
          {errorMessage &&
            Array.isArray(errorMessage) &&
            errorMessage.map((err, i) => <li key={`errorMessage${i}`}>{err.message}</li>)}
        </ul>
      </AUpageAlert>
    )
  }
}

ErrorBoxComponent.defaultProps = {
  form: null,
  title: null,
  errorMessage: null
}

ErrorBoxComponent.propTypes = {
  invalidFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  form: PropTypes.object,
  title: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.node])
}

export const mapStateToProps = (state, { model }) => ({
  invalidFields: getInvalidFields(state, model),
  form: get(state, `forms.${model}.$form`, {}),
  errorMessage: state.app.errorMessage
})

const ErrorBox = connect(mapStateToProps)(ErrorBoxComponent)

export default ErrorBox
