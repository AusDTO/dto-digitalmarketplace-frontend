import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NotFound from '../components/shared/NotFound'
import formProps from '../components/shared/form/formPropsSelector'
import RequestResetEmailForm from '../components/ResetPassword/RequestResetEmailForm'
import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm'
import { sendResetPasswordEmail, submitResetPassword, getUserDataFromToken } from '../actions/resetPasswordActions'
import { setErrorMessage } from '../actions/appActions'

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  componentWillMount() {
    const tokenString = this.props.location.pathname.substring(
      this.props.match.url.length + 1,
      this.props.location.pathname.length
    )
    if (tokenString.length > 0) {
      this.props.loadInitialData(tokenString)
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
    const payload = Object.assign({}, values, user.user)
    this.props.handleResetPasswordSubmit(payload)
  }

  render() {
    const { match, user, model, form, handleSendEmailSubmit, errored } = this.props
    return (
      <div className="reset-password-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() =>
              <RequestResetEmailForm
                model={model}
                form={form}
                user={user}
                errored={errored}
                submitClicked={this.onSubmitClicked}
                handleSubmit={handleSendEmailSubmit}
              />}
          />

          <Route
            path={`${match.url}/:tokenString`}
            render={() =>
              <ResetPasswordForm
                model={model}
                form={form}
                user={user}
                errored={errored}
                submitClicked={this.onSubmitClicked}
                handleSubmit={values => this.handleResetPasswordSubmit(values)}
              />}
          />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

ResetPasswordPage.defaultProps = {
  passwordsMatchMessage: null,
  loadInitialData: null,
  handleResetPasswordSubmit: null,
  handleSendEmailSubmit: null,
  errored: null
}

ResetPasswordPage.propTypes = {
  form: PropTypes.shape({
    valid: PropTypes.bool,
    submitFailed: PropTypes.bool
  }).isRequired,
  user: PropTypes.shape({
    resetPasswordSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  passwordsMatchMessage: PropTypes.func,
  loadInitialData: PropTypes.func,
  handleResetPasswordSubmit: PropTypes.func,
  handleSendEmailSubmit: PropTypes.func,
  errored: PropTypes.bool
}

const mapResetStateToProps = state => ({
  ...formProps(state, 'resetPasswordForm'),
  ...formProps(state, 'resetPasswordEmailForm'),
  user: state.user,
  errored: state.app.errorMessage !== null
})

const mapResetDispatchToProps = dispatch => ({
  handleSendEmailSubmit: payload => dispatch(sendResetPasswordEmail(payload)),
  handleResetPasswordSubmit: payload => dispatch(submitResetPassword(payload)),
  loadInitialData: token => dispatch(getUserDataFromToken(token)),
  passwordsMatchMessage: message => dispatch(setErrorMessage(message))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(ResetPasswordPage))
