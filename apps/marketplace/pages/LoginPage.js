import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { rootPath } from 'marketplace/routes'

import LoginForm from '../components/LoginForm'
import { login } from '../actions/appActions'

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
    const { model, loggedIn, handleSubmit, currentlySending, isPartOfTeam, mustJoinTeam } = this.props
    const { from } = this.props.location.state || { from: { pathname: `${rootPath}/buyict` } }

    if (loggedIn && !isPartOfTeam && mustJoinTeam) {
      return <Redirect to={`${rootPath}/team/join`} />
    }

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            {loggedIn ? (
              <Redirect to={from} />
            ) : (
              <LoginForm
                submitClicked={this.onSubmitClicked}
                handleSubmit={handleSubmit}
                model={model}
                currentlySending={currentlySending}
              />
            )}
          </article>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'loginForm'),
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending,
  isPartOfTeam: state.app.isPartOfTeam,
  mustJoinTeam: state.app.mustJoinTeam
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: values => dispatch(login(values))
})

const LoginPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPageComponent)
)

export default LoginPage
