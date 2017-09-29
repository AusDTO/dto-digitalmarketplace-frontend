import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import LoginForm from 'shared/Login/LoginForm'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { login } from 'orams/actions/appActions'
import { rootPath } from 'orams/routes'

export class LoginPageComponent extends BaseForm {
  static propTypes = {
    model: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    currentlySending: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      currentlySending: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { model, loggedIn, handleSubmit, currentlySending } = this.props
    const { from } = this.props.location.state || { from: { pathname: rootPath } }

    return (
      <main>
        <div id="login-page">
          {loggedIn
            ? <Redirect to={from.pathname} />
            : <LoginForm
                submitClicked={this.onSubmitClicked}
                handleSubmit={handleSubmit}
                model={model}
                currentlySending={currentlySending}
                rootPath={rootPath}
                framework="orams"
              />}
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'loginForm'),
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: values => dispatch(login(values))
})

const LoginPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent))

export default LoginPage
