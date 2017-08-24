import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateUserForm from './CreateUserForm'
import { loadSignup } from '../../actions/memberActions'
import ErrorMessages from '../../components/shared/form/ErrorMessages'

export class CreateUser extends Component {
  componentDidMount() {
    let tokenString = this.props.match.params.tokenstring
    this.props.loadRegistrationData(tokenString)
  }

  render() {
    let { loadSignupSuccess, userRegisterDetails } = this.props

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            <ErrorMessages title="We were unable to create your account" />
            {loadSignupSuccess && <CreateUserForm initialState={userRegisterDetails} />}
          </article>
        </div>
      </div>
    )
  }
}

CreateUser.propTypes = {
  userRegisterDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired,
    manager_name: PropTypes.string,
    manager_email: PropTypes.string
  }),
  loadSignupSuccess: PropTypes.bool,
  loadRegistrationData: PropTypes.func.isRequired
}

const mapStateToProps = ({ user }) => {
  return {
    userRegisterDetails: user.userRegisterDetails,
    isLoading: user.isLoading,
    loadSignupSuccess: user.loadSignupSuccess,
    createUserSuccess: user.createUserSuccess,
    user: user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRegistrationData: tokenString => {
      dispatch(loadSignup(tokenString))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
