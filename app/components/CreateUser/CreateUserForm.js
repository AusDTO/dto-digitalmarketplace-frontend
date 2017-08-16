import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import BaseForm from '../../components/shared/form/BaseForm'
import ErrorBox from '../../components/shared/form/ErrorBox'
import Textfield from '../../components/shared/form/Textfield'
import CheckboxDetailsField from '../../components/shared/form/CheckboxDetailsField'
import Loader from '../../components/shared/Loader'
import formProps from '../../components/shared/form/formPropsSelector'

import PageAlert from '@gov.au/page-alerts'

import { createUser } from '../../actions/memberActions'

export class CreateUserForm extends BaseForm {
  constructor(props) {
    super(props)
    this.state = { createMessage: null }
    this.handleAPIResponseError = this.handleAPIResponseError.bind(this)
  }

  componentWillMount() {
    this.props.loadInitialData(this.props.initialState)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createUserErrored) {
      window.scrollTo(0, 0)
      this.setState({
        createMessage: this.handleAPIResponseError(nextProps.isDuplicate)
      })
    }
    if (this.props.createUserSuccess !== nextProps.createUserSuccess) {
      if (nextProps.createUserSuccess) {
        this.props.history.push('/signup/success')
      }
    }
  }

  handleAPIResponseError(isDuplicate) {
    if (isDuplicate) {
      return (
        <span>
          <span>An account with this email address already exists</span>
          <a href="/login"> login</a>
        </span>
      )
    } else
      return (
        <li>
          <p>
            The Digital Marketplace encountered an error trying to create your account. Please try again later or{' '}
            <a href="/contact-us" target="_blank" rel="external">
              {' '}contact us{' '}
            </a>{' '}
            for assistance.
          </p>
        </li>
      )
  }

  handleSuccess() {}

  render() {
    const { model, form, initialState, handleSubmit, createUserSuccess, createUserLoading } = this.props
    let valid = form.valid
    let userType = initialState.user_type

    let { createMessage } = this.state

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            {createUserLoading && false && <Loader />}
            {createMessage &&
              !createUserSuccess &&
              valid &&
              <PageAlert as="error">
                <h4>We were unable to create your account</h4>
                <ul>
                  {createMessage}
                </ul>
              </PageAlert>}
            <ErrorBox focusOnMount={true} model={model} />
            {userType === 'buyer' /*eslint-disable indent */
              ? <div>
                  <h1>Add your name and password</h1>
                  <p>To finish creating your account please provide the following details.</p>
                </div>
              : <div>
                  <h1>Add a password</h1>
                  <p>To finish creating your account please provide the following details.</p>
                </div> /*eslint-disable indent */}
            <Form model={model} id="createuser" onSubmit={model => handleSubmit(model)}>
              {userType === 'buyer' &&
                <Textfield
                  model={`${model}.name`}
                  name="name"
                  id="name"
                  htmlFor="name"
                  label="Full name"
                  description="This name will be used throughout the Marketplace"
                  validators={{ required: val => val && val.length }}
                  messages={{ required: 'A name is required' }}
                />}

              <Textfield
                model={`${model}.password`}
                name="password"
                id="password"
                htmlFor="password"
                label="Password"
                description="At least 10 characters"
                validators={{ length: val => val && val.length >= 10 }}
                messages={{
                  length: 'Your password must be at least 10 characters'
                }}
              />
              <p>
                <CheckboxDetailsField
                  model={`${model}.agree`}
                  id="agree"
                  name="agree"
                  value="agree"
                  label={
                    <span>
                      <span>I accept the </span>
                      <a href="/terms-of-use" target="_blank" rel="external">
                        Terms of Use
                      </a>
                    </span>
                  }
                  description="blah"
                  detailsModel={model}
                  validators={{ required: val => val }}
                  messages={{ required: 'Accept Terms of Use' }}
                />
              </p>
              <input className="uikit-btn" type="submit" value="Join the Marketplace" />
            </Form>
          </article>
        </div>
      </div>
    )
  }
}

CreateUserForm.propTypes = {
  initialState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired,
    user_type: PropTypes.string.isRequired
  }),
  createUserSuccess: PropTypes.bool,
  createUserErrored: PropTypes.bool,
  createUserLoading: PropTypes.bool,
  isDuplicate: PropTypes.bool
}

const mapStateToProps = state => {
  const { createUserSuccess, createUserErrored, createUserLoading, isDuplicate } = state.user
  return {
    ...formProps(state, 'createUserForm'),
    createUserSuccess: createUserSuccess,
    createUserErrored: createUserErrored,
    createUserLoading: createUserLoading,
    isDuplicate: isDuplicate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData: data => {
      data = Object.assign({}, data)
      dispatch(actions.load('createUserForm', data))
    },
    handleSubmit: values => dispatch(createUser(values))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserForm))
