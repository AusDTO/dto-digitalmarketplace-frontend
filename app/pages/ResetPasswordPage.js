import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import NotFound from '../components/shared/NotFound'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BaseForm from '../components/shared/form/BaseForm'
import formProps from '../components/shared/form/formPropsSelector'
import { RequestResetEmailForm } from '../components/ResetPassword/RequestResetEmailForm'
import { ResetPasswordForm } from '../components/ResetPassword/ResetPasswordForm'
import { sendResetPasswordEmail, submitResetPassword, getUserDataFromToken } from '../actions/resetPasswordActions'
import { setErrorMessage } from '../actions/memberActions'

class RequestResetEmail extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { user, model, form, handleSubmit } = this.props
    return (
      <RequestResetEmailForm
        model={model}
        form={form}
        user={user}
        submitClicked={this.onSubmitClicked}
        handleSubmit={handleSubmit}
      />
    )
  }
}

RequestResetEmail.propTypes = {
  user: PropTypes.shape({
    resetPasswordEmailFailure: PropTypes.bool,
    resetPasswordEmailSuccess: PropTypes.bool
  }).isRequired,
  form: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'resetPasswordEmailForm'),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: model => dispatch(sendResetPasswordEmail(model))
  }
}

const RequestResetEmailContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestResetEmail))

class ResetPassword extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    errors: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    let tokenString = this.props.match.params.tokenString
    this.props.loadInitialData(tokenString)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.form.validity.passwordsMatch !== nextProps.form.validity.passwordsMatch) {
      if (!nextProps.form.validity.passwordsMatch) {
        this.props.passwordsMatchMessage('Passwords do not match.')
      }
    }
  }

  handleSubmit(values) {
    const { user } = this.props
    const payload = Object.assign({}, values, user.user)
    this.props.handleSubmit(payload)
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { user, model } = this.props
    return (
      <ResetPasswordForm
        model={model}
        user={user}
        submitClicked={this.onSubmitClicked}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

ResetPassword.propTypes = {
  user: PropTypes.shape({
    resetPasswordSuccess: PropTypes.bool,
    getResetDataSuccess: PropTypes.bool,
    errorMessage: PropTypes.string
  }).isRequired,
  form: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired
}

const mapResetStateToProps = state => {
  return {
    ...formProps(state, 'resetPasswordForm'),
    user: state.user
  }
}

const mapResetDispatchToProps = dispatch => {
  return {
    handleSubmit: payload => dispatch(submitResetPassword(payload)),
    loadInitialData: token => dispatch(getUserDataFromToken(token)),
    passwordsMatchMessage: message => dispatch(setErrorMessage(message))
  }
}

const ResetPasswordContainer = withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(ResetPassword))

const ResetPasswordRouter = ({ match }) =>
  <Switch>
    <Route exact path={match.url} component={RequestResetEmailContainer} />
    <Route path={`${match.url}/:tokenString`} component={ResetPasswordContainer} />
    <Route component={NotFound} />
  </Switch>

export default withRouter(ResetPasswordRouter)
