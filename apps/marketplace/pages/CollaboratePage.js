import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import CollaborateView from '../components/Collaborate/Landing'
import { rootPath } from '../routes'

export const CollaboratePageContainer = props => {
  const { match } = props

  return (
    <div id="Collaborate-page">
      <Switch>
        <Route exact path={match.url} render={() => <CollaborateView {...props} />} />
        <Redirect to={{ pathname: `${rootPath}/collaborate` }} />
      </Switch>
    </div>
  )
}

CollaboratePageContainer.propTypes = {
  match: PropTypes.object
}

CollaboratePageContainer.defaultProps = {
  match: () => ({ url: `${rootPath}/collaborate` })
}

export default withRouter(CollaboratePageContainer)
