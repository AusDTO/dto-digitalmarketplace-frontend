/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import SellerCatalogue from 'orams/components/SellerCatalogue/SellerCatalogue'
import {
  loadRegions,
  loadServices,
  loadSuppliers,
  setCategoryData,
  setRegionData,
  setRegionAccordionOpen,
  setCategoryAccordionOpen
} from 'orams/actions/sellerCatalogueActions'

class SellerCataloguePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { match, regionsData, servicesData, tableData } = this.props

    return (
      <Switch>
        <Route
          exact
          path={match.url}
          render={() =>
            <SellerCatalogue
              regionsData={regionsData}
              servicesData={servicesData}
              tableData={tableData}
              {...this.props}
            />}
        />
      </Switch>
    )
  }
}

SellerCataloguePage.propTypes = {
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    regionsData: state.sellersCatalogue.regionsData,
    servicesData: state.sellersCatalogue.servicesData,
    tableData: state.sellersCatalogue.tableData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadRegionsData: () => dispatch(loadRegions()),
    loadServicesData: () => dispatch(loadServices()),
    setRegion: region => dispatch(setRegionData(region)),
    setCategory: category => dispatch(setCategoryData(category)),
    loadTableData: (region, category) => dispatch(loadSuppliers(region, category)),
    onRegionAccordionOpen: (id) => dispatch(setRegionAccordionOpen(id)),
    onCategoryAccordionOpen: (id) => dispatch(setCategoryAccordionOpen(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerCataloguePage))
