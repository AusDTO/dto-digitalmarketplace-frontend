import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import { getTokenFromURL, getEmailFromQueryString } from 'marketplace/components/helpers'
import NotFound from '../components/NotFound'
import RequestResetEmailForm from '../components/ResetPassword/RequestResetEmailForm'
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm'
import { sendResetPasswordEmail, submitResetPassword } from '../actions/resetPasswordActions'
import { setErrorMessage } from '../actions/appActions'

export class ResetPasswordPageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.form.validity.passwordsMatch !== nextProps.form.validity.passwordsMatch) {
      if (!nextProps.form.validity.passwordsMatch) {
        this.props.passwordsMatchMessage('Passwords do not match.')
      }
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleResetPasswordSubmit(values) {
    const { user } = this.props
    const payload = Object.assign({}, values, user.user, { framework: 'digital-marketplace' })
    this.props.handleResetPasswordSubmit(
      getTokenFromURL(this.props.match.url, this.props.location),
      getEmailFromQueryString(this.props.location),
      payload
    )
  }

  handleSendEmailSubmit(values) {
    const payload = Object.assign({}, values, { framework: 'digital-marketplace' })
    this.props.handleSendEmailSubmit(payload)
  }

  render() {
    const { match, user, model } = this.props
    return (
      <div className="reset-password-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() => (
              <RequestResetEmailForm
                model={model}
                user={user}
                submitClicked={this.onSubmitClicked}
                handleSubmit={values => this.handleSendEmailSubmit(values)}
              />
            )}
          />

          <Route
            path={`${match.url}/:token`}
            render={() => (
              <ResetPasswordForm
                model={model}
                user={user}
                submitClicked={this.onSubmitClicked}
                handleSubmit={values => this.handleResetPasswordSubmit(values)}
              />
            )}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

ResetPasswordPageComponent.defaultProps = {
  passwordsMatchMessage: null,
  handleResetPasswordSubmit: null
}

ResetPasswordPageComponent.propTypes = {
  user: PropTypes.shape({
    resetPasswordSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  passwordsMatchMessage: PropTypes.func,
  handleResetPasswordSubmit: PropTypes.func
}

const mapResetStateToProps = state => ({
  ...formProps(state, 'resetPasswordForm'),
  ...formProps(state, 'resetPasswordEmailForm'),
  user: state.user
})

const mapResetDispatchToProps = dispatch => ({
  handleSendEmailSubmit: payload => dispatch(sendResetPasswordEmail(payload)),
  handleResetPasswordSubmit: (token, email, payload) => dispatch(submitResetPassword(token, email, payload)),
  passwordsMatchMessage: message => dispatch(setErrorMessage(message))
})

const ResetPasswordPage = withRouter(
  connect(
    mapResetStateToProps,
    mapResetDispatchToProps
  )(ResetPasswordPageComponent)
)

export default ResetPasswordPage
