import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerUnsuccessfulNav from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulNav'

export const SellerUnsuccessfulPage = props => {
  const { match } = props

  return (
    <div className="row">
      <article role="main">
        <div className="col-sm-4">
          <SellerUnsuccessfulNav {...props} />
        </div>
        <div className="col-sm-8">
          <Switch>
            <Route exact path={match.url} render={() => <div>A</div> } />
            <Route exact path={`${match.url}/select`} render={() => <div>B</div> } />
            <Route exact path={`${match.url}/review`} render={() => <div>C</div> } />
          </Switch>
        </div>
      </article>
    </div>
  )
}

SellerUnsuccessfulPage.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(SellerUnsuccessfulPage)
