import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CreateUserForm from '../components/CreateUser/CreateUserForm'
import { loadSignup, createUser } from '../actions/memberActions'
import ErrorBox from '../components/shared/form/ErrorBox' // eslint-disable-line import/no-named-as-default
import BaseForm from '../components/shared/form/BaseForm'
import formProps from '../components/shared/form/formPropsSelector' // eslint-disable-line import/no-named-as-default
import { rootPath } from '../routes'

export class CreateUserPage extends BaseForm {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      currentlySending: null
    }
  }

  componentWillMount() {
    const tokenString = this.props.match.params.tokenstring
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

CreateUserPage.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserPage))
