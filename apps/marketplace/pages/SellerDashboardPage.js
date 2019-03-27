import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from 'marketplace/components/SellerDashboard/Header'
import Messages from 'marketplace/components/SellerDashboard/Messages'
import Team from 'marketplace/components/SellerDashboard/Team'
import Services from 'marketplace/components/SellerDashboard/Services'
import { loadSellerDashboard, removeUser } from 'marketplace/actions/sellerDashboardActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import { rootPath } from 'marketplace/routes'
import styles from '../components/SellerDashboard/SellerDashboard.scss'

class SellerDashboardPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRemoveAlert: false,
      toRemoveUser: null
    }

    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate = () => {
    if (this.state.showRemoveAlert) {
      window.scrollTo(0, this.deleteAlertRef.offsetTop)
    }
  }

  handleYesClick = () => {
    const { toRemoveUser } = this.state
    this.props.removeUser(toRemoveUser.id)
    this.setState({
      toRemoveUser: null,
      showRemoveAlert: false
    })
  }

  handleRemoveClick = item => {
    this.setState({
      toRemoveUser: item,
      showRemoveAlert: true
    })
  }

  handleNoClicked = () => {
    this.setState({
      toRemoveUser: null,
      showRemoveAlert: false
    })
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
          <div className="row">
            <div className="col-xs-12">{supplier.name}</div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h1 className="au-display-xl">Dashboard</h1>
            </div>
          </div>
          {this.state.showRemoveAlert && (
            <div className="row">
              <div className="col-xs-12 col-sm-7">
                <AUpageAlert as="warning">
                  <p
                    ref={ref => {
                      this.deleteAlertRef = ref
                    }}
                  >
                    {`Are you sure you want to remove ${this.state.toRemoveUser.name}?`}
                  </p>
                  <br />
                  <AUbutton className={styles.confirmDelete} onClick={this.handleYesClick}>
                    Yes, remove
                  </AUbutton>
                  <AUbutton as="secondary" onClick={this.handleNoClicked}>
                    Do not remove
                  </AUbutton>
                </AUpageAlert>
              </div>
            </div>
          )}
          <div className={`${styles.profileActionRow} row`}>
            <div className="col-md-8" />
            <div className="col-xs-12 col-md-4">
              <a href={`/supplier/${supplier.code}`} className="au-btn right-button-margin">
                View profile
              </a>
              <a href="/sellers/edit" className="au-btn au-btn--secondary">
                Update profile
              </a>
            </div>
          </div>
          <Header {...this.props} />
          <Switch>
            <Route exact path="/" render={() => <Team {...this.props} removeClicked={this.handleRemoveClick} />} />
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
  messages: state.sellerDashboard.messages,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: () => dispatch(loadSellerDashboard()),
  removeUser: userId => dispatch(removeUser(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerDashboardPage))
