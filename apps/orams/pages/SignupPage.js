import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'

import Signup from 'orams/components/Signup/Signup'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import { signup } from 'orams/actions/appActions'

export class SignupPageComponent extends BaseForm {
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
    const { match } = this.props

    return (
      <main>
        <Switch>
          <Route path={match.url} render={() => <Signup {...this.props} />} />
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  ...formProps(state, 'signupForm'),
  loggedIn: state.app.loggedIn,
  currentlySending: state.app.currentlySending,
  userType: state.app.userType,
  displayStepTwo: state.app.displayStepTwo
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: values => dispatch(signup(values))
})

const SignupPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupPageComponent))

export default SignupPage
