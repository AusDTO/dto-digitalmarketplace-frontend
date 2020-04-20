/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'

import { required, validEmail } from '../components/validators'
import SignupForm from '../components/SignupForm/SignupForm'
import UserOnboardingContainer from '../components/Onboarding/OnboardingContainer'
import { handleSignupSubmit } from '../actions/memberActions'
import { rootPath } from '../routes'

export class SignupPageComponent extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      emailValidators: {
        required,
        validEmail
      },
      emailErrorMessages: {
        required: 'Your email is required',
        validEmail: 'A validly formatted email is required.'
      },
      isBuyer: this.props.signupForm.user_type === 'buyer',
      userType: '',
      submitClicked: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.signupForm.user_type !== nextProps.signupForm.user_type) {
      if (nextProps.signupForm.user_type === 'seller') {
        this.setState({
          emailValidators: {
            required,
            validEmail
          },
          emailErrorMessages: {
            required: 'Your email is required',
            validEmail: 'A validly formatted email is required.'
          },
          userType: nextProps.signupForm.user_type,
          isBuyer: false
        })
      }

      if (nextProps.signupForm.user_type === 'buyer') {
        this.setState({
          emailValidators: {
            required,
            validEmail
          },
          emailErrorMessages: {
            required: 'Your email is required',
            validEmail: 'A validly formatted email is required.'
          },
          userType: nextProps.signupForm.user_type,
          isBuyer: true
        })
      }
    }
  }

  handleSubmit = model => {
    this.props.handleSignupSubmit(model).then(res => {
      if (res.error) {
        this.onSubmitFailed()
      }
    })
  }

  onSubmitFailed = () => {
    window.scrollTo(0, 0)
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { match } = this.props

    // TODO: will move UserOnboardingContainer out of here when CreateUser is refactored
    return (
      <div id="signup-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() => (
              <SignupForm
                {...this.props}
                {...this.state}
                onSubmitClicked={this.onSubmitClicked}
                onSubmitFailed={this.onSubmitFailed}
                handleSubmit={this.handleSubmit}
                submitClicked={false}
              />
            )}
          />
          <Route path={`${match.url}/success`} component={UserOnboardingContainer} />
          <Redirect to={{ pathname: `${rootPath}/signup` }} />
        </Switch>
      </div>
    )
  }
}

SignupPageComponent.propTypes = {
  signupSuccess: PropTypes.bool,
  currentlySending: PropTypes.bool
}

SignupPageComponent.defaultProps = {
  signupSuccess: null,
  currentlySending: null
}

const mapStateToProps = state => ({
  ...formProps(state, 'signupForm'),
  signupSuccess: state.user.signupSuccess,
  signupErrorCode: state.user.signupErrorCode,
  signupABN: state.user.signupABN,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  handleSignupSubmit: model => dispatch(handleSignupSubmit(model))
})

const SignupPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupPageComponent)
)

export default SignupPage
