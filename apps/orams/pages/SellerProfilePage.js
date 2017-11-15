/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerProfile from 'orams/components/SellerProfile/SellerProfile'
import { loadSupplierProfile } from 'orams/actions/sellerCatalogueActions'

class SellerProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route exact path={match.url} render={() => <SellerProfile {...this.props} />} />
      </Switch>
    )
  }
}

SellerProfilePage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    supplierData: state.sellersCatalogue.supplierData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSupplierData: () => dispatch(loadSupplierProfile())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerProfilePage))
