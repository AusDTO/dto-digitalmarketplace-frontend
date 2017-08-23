import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import SignupContainer from './components/SignupForm/SignupContainer'
import CreateUser from './components/CreateUser/CreateUser'
import NotFound from './components/shared/NotFound'

export const rootPath = '/2'

class Routes extends Component {
  render() {
    const { match } = this.props
    return (
      <Switch>
        <Route exact path={match.url} component={SignupContainer} />
        <Route path={`${match.url}/signup`} component={SignupContainer} />
        <Route path={`${match.url}/createuser/:tokenstring`} component={CreateUser} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path={rootPath} component={Routes} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default withRouter(RootContainer)
