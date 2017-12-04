/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import CreatePassword from 'orams/components/CreatePassword/CreatePassword'
import { loadUserToCreate, createUser } from 'orams/actions/appActions'
import formProps from 'shared/form/formPropsSelector'

class CreatePasswordPage extends Component {
  componentDidMount() {
    const token = this.props.match.params.token
    this.props.loadUserToCreateData(token)
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.url} render={() => <CreatePassword {...this.props} />} />
      </Switch>
    )
  }
}

CreatePasswordPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'createUserPasswordForm'),
    currentlySending: state.app.currentlySending,
    userToCreateData: state.app.userToCreateData,
    createUserSuccess: state.app.createUserSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUserToCreateData: token => dispatch(loadUserToCreate(token)),
    handleSubmit: data => dispatch(createUser(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePasswordPage))
