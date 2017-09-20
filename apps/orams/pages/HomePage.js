import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import Homepage from '../components/HomePage/HomePage'

const HomePageContainer = props => {
  const { match } = props
  return (
    <Switch>
      <Route exact path={match.url} component={Homepage} />
    </Switch>
  )
}

HomePageContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(HomePageContainer)
