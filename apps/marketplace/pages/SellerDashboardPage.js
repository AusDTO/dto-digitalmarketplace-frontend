import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from 'marketplace/components/SellerDashboard/Header'
import Messages from 'marketplace/components/SellerDashboard/Messages'
import Team from 'marketplace/components/SellerDashboard/Team'
import { loadSellerDashboard } from 'marketplace/actions/sellerDashboardActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { rootPath } from 'marketplace/routes'

class SellerDashboardPage extends Component {
  componentWillMount() {
    this.props.loadInitialData()
  }

  render() {
    const { currentlySending, supplier } = this.props

    if (currentlySending && !supplier.code) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <BrowserRouter basename={`${rootPath}/seller-dashboard`}>
        <div>
          {supplier.name}
          <Header {...this.props} />
          <Switch>
            <Route exact path="/" render={() => <Team {...this.props} />} />
            <Route path="/notifications" render={() => <Messages {...this.props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

SellerDashboardPage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loadSuccess: state.sellerDashboard.loadSellerDashboardSuccess,
  currentlySending: state.app.currentlySending,
  supplier: state.sellerDashboard.supplier,
  messages: state.sellerDashboard.messages
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(loadSellerDashboard())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerDashboardPage))
