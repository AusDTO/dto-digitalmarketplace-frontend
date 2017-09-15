import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerApplication from 'orams/components/SellerApplication/SellerApplication'

const SellerApplicationContainer = props => {
  const { match } = props
  return (
    <Switch>
      <Route exact path={match.url} component={SellerApplication} />
    </Switch>
  )
}

SellerApplicationContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(SellerApplicationContainer)
