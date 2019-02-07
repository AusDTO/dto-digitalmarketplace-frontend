import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from 'marketplace/components/SellerDashboard/Header'
import Messages from 'marketplace/components/SellerDashboard/Messages'
import Team from 'marketplace/components/SellerDashboard/Team'
import Services from 'marketplace/components/SellerDashboard/Services'
import { loadSellerDashboard } from 'marketplace/actions/sellerDashboardActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { rootPath } from 'marketplace/routes'

class SellerDashboardPage extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { loading, supplier, errors, errorMessage } = this.props

    if (errors) {
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the supplier"
          errorMessage={errorMessage}
          setFocus={() => {}}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (loading || !supplier) {
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
            <Route path="/services" render={() => <Services {...this.props} />} />
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
  supplier: state.sellerDashboard.supplier.supplier,
  loading: state.sellerDashboard.supplier.loading,
  loadedAt: state.sellerDashboard.supplier.loadedAt,
  errors: state.sellerDashboard.supplier.errors,
  errorMessage: state.app.errorMessage,
  messages: state.sellerDashboard.messages
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(loadSellerDashboard())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerDashboardPage))
