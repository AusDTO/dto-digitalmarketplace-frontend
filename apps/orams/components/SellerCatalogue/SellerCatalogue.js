/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegionsAccordionRadioList from 'orams/components/AccordionRadioList/RegionsAccordionRadioList'
import CategoriesAccordionRadioList from 'orams/components/AccordionRadioList/CategoriesAccordionRadioList'
import ResultsTable from 'orams/components/ResultsTable/ResultsTable'
import { loadRegions, loadServices } from 'orams/actions/sellerCatalogueActions'
import styles from './SellerCatalogue.scss'

class SellerCatalogue extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.props.loadRegionsData()
    this.props.loadServicesData()
  }

  radioListClick = (event, uniqueID) => {


    if (event.target.name === 'region') {
      this.props.onRegionAccordionOpen(uniqueID)
      this.props.setRegion(event.target.value)
    }

    if (event.target.name === 'category') {
      this.props.onCategoryAccordionOpen(uniqueID)
      this.props.setCategory(event.target.value)
    }

    console.log('REGION', this.props.region)
    console.log('CATEGORY', this.props.category)

    if (this.props.region && this.props.category) {
      this.props.loadTableData(this.props.region, this.props.category)
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { regionsData, servicesData, tableData, regionAccordionOpen, categoryAccordionOpen } = this.props

    return (
      <main className={styles.cataloguePage}>
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="uikit-display-6">Service Matrix</div>
            <div className="uikit-display-2">Select a location and service category to view pricing</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <RegionsAccordionRadioList
              title="1. Select region"
              data={regionsData}
              onRadioListClick={this.radioListClick}
              regionAccordionOpen={regionAccordionOpen}
            />
            <CategoriesAccordionRadioList
              title="2. Select a category"
              data={servicesData}
              onRadioListClick={this.radioListClick}
              categoryAccordionOpen={categoryAccordionOpen}
            />
          </div>
          <div className="col-xs-12 col-sm-8 col-sm-push-1">
            <ResultsTable data={tableData} />
          </div>
        </div>
      </main>
    )
  }
}

SellerCatalogue.propTypes = {}

const mapStateToProps = state => {
  return {
    region: state.sellersCatalogue.region,
    category: state.sellersCatalogue.category,
    regionAccordionOpen: state.sellersCatalogue.regionAccordionOpen,
    categoryAccordionOpen: state.sellersCatalogue.categoryAccordionOpen
  }
}

export default connect(mapStateToProps)(SellerCatalogue)
