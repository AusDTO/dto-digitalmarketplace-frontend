/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Invitation from 'orams/components/Invitation/Invitation'
import { loadInvitation } from 'orams/actions/appActions'

class InvitationPage extends Component {
  componentDidMount() {
    const token = this.props.match.params.token
    this.props.loadInvitationData(token)
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.url} render={() => <Invitation {...this.props} />} />
      </Switch>
    )
  }
}

InvitationPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    invitationData: state.app.invitationData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInvitationData: token => dispatch(loadInvitation(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvitationPage))
