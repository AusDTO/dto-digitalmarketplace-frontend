/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import Copyright from 'orams/components/Copyright/Copyright'

class CopyrightPage extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.url} render={() => <Copyright {...this.props} />} />
      </Switch>
    )
  }
}

CopyrightPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CopyrightPage))
