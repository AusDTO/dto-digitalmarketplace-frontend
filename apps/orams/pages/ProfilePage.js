/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Profile from 'orams/components/Profile/Profile'
import { loadProfile } from 'orams/actions/sellerCatalogueActions'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.url} render={() => <Profile {...this.props} />} />
      </Switch>
    )
  }
}

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profileData: state.sellersCatalogue.profileData,
    supplierCode: state.app.supplierCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfileData: supplierCode => dispatch(loadProfile(supplierCode))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage))
