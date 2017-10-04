import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerCatalogue from 'orams/components/SellerCatalogue/SellerCatalogue'

const SellerCataloguePage = props => {
  const { match } = props
  return (
    <Switch>
      <Route exact path={match.url} component={SellerCatalogue} />
    </Switch>
  )
}

SellerCataloguePage.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(SellerCataloguePage)
