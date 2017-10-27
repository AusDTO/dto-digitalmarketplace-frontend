import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ErrorBox from 'shared/form/ErrorBox'
import BaseForm from 'shared/form/BaseForm'
import formProps from 'shared/form/formPropsSelector'
import CreateUserForm from '../components/CreateUser/CreateUserForm'
import { loadSignup, createUser } from '../actions/memberActions'
import { rootPath } from '../routes'

export class CreateUserPageComponent extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      currentlySending: null
    }
  }

  componentWillMount() {
    const tokenString = this.props.location.pathname.substring(
      this.props.match.url.length + 1,
      this.props.location.pathname.length
    )
    this.props.loadRegistrationData(tokenString)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.createUserSuccess !== nextProps.createUserSuccess) {
      if (nextProps.createUserSuccess) {
        this.props.history.push(`${rootPath}/signup/success/${nextProps.createUserForm.user_type}`)
      }
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const {
      model,
      loadSignupSuccess,
      userRegisterDetails,
      handleSubmit,
      createUserSuccess,
      currentlySending
    } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            {loadSignupSuccess
              ? <CreateUserForm
                  initialState={userRegisterDetails}
                  onSubmitClicked={this.onSubmitClicked}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={handleSubmit}
                  createUserSuccess={createUserSuccess}
                  model={model}
                  currentlySending={currentlySending}
                />
              : <ErrorBox title="There was a problem loading your details" setFocus={setFocus} />}
          </article>
        </div>
      </div>
    )
  }
}

CreateUserPageComponent.propTypes = {
  model: PropTypes.string.isRequired,
  userRegisterDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired,
    manager_name: PropTypes.string,
    manager_email: PropTypes.string
  }),
  loadSignupSuccess: PropTypes.bool,
  loadRegistrationData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createUserSuccess: PropTypes.bool
}

const mapStateToProps = state => ({
  ...formProps(state, 'createUserForm'),
  userRegisterDetails: state.user.userRegisterDetails,
  loadSignupSuccess: state.user.loadSignupSuccess,
  createUserSuccess: state.user.createUserSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadRegistrationData: tokenString => {
    dispatch(loadSignup(tokenString))
  },
  handleSubmit: values => dispatch(createUser(values))
})

const CreateUserPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserPageComponent))

export default CreateUserPage
