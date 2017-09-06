/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { actions } from 'react-redux-form'

class BaseForm extends React.Component {
  state = {
    mounted: false
  }

  /**
   * We are calling this on `Will` instead of `Did` for server rendering purposes.
   * If there are formErrors available, set the appropriate errors and show them.
   * @return {void}
   */
  componentWillMount() {
    const { dispatch, formErrors, model, serverRender } = this.props

    if (!formErrors || !serverRender) {
      return
    }

    const errors = {}
    Object.keys(formErrors).forEach(key => {
      errors[key] = {
        valid: false,
        errors: formErrors[key]
      }
    })

    dispatch(actions.setFieldsErrors(model, errors))
    dispatch(actions.setSubmitFailed(model))
  }

  componentDidMount() {
    const { dispatch, formErrors, model } = this.props

    // Helpful with SPAs, changing of focus on route.
    this.setState({
      mounted: true
    })

    if (!formErrors) {
      return
    }

    dispatch(actions.setSubmitFailed(model))
    dispatch(actions.setFieldsValidity(model, {}, { errors: true }))
  }

  attachNode(node) {
    this._form = ReactDOM.findDOMNode(node) // eslint-disable-line react/no-find-dom-node
  }
}

BaseForm.defaultProps = {
  formErrors: null
}

BaseForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.string.isRequired,
  serverRender: PropTypes.bool.isRequired,
  formErrors: PropTypes.object
}

export default BaseForm
