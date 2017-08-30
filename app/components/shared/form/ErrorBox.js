import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import get from 'lodash/get'

import PageAlert from '@gov.au/page-alerts'

import { getInvalidFields } from './errorMessageSelector'

export class ErrorBox extends React.Component {
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
    const { invalidFields, form, errorMessage, title, multi = true } = this.props
    const showValidationAndErrors = multi && errorMessage
    if ((form.submitFailed === false && !errorMessage) || (!invalidFields.length && !errorMessage)) {
      this._container = null
      return null
    }

    return (
      <PageAlert as="error">
        <h4 id="validation-masthead-heading" ref={this.setRef} tabIndex="-1">
          {title || 'There was a problem with the details you gave'}
        </h4>
        <ul>
          {invalidFields &&
            showValidationAndErrors &&
            invalidFields.map(({ messages, id }, i) => {
              return messages.map((message, j) =>
                <li key={`${i}${j}`}>
                  <a href={`#${id}`}>
                    {message}
                  </a>
                </li>
              )
            })}
          {errorMessage &&
            <li key="errorMessage">
              {errorMessage}
            </li>}
        </ul>
      </PageAlert>
    )
  }
}

ErrorBox.propTypes = {
  invalidFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  form: PropTypes.object,
  title: PropTypes.string,
  errorMessage: PropTypes.string
}

export const mapStateToProps = (state, { model }) => {
  return {
    invalidFields: getInvalidFields(state, model),
    form: get(state, `forms.${model}.$form`, {}),
    errorMessage: state.app.errorMessage
  }
}

export default connect(mapStateToProps)(ErrorBox)
