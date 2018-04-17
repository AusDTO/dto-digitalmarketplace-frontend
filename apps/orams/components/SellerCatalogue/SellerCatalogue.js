/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegionsAccordionRadioList from 'orams/components/AccordionRadioList/RegionsAccordionRadioList'
import CategoriesAccordionRadioList from 'orams/components/AccordionRadioList/CategoriesAccordionRadioList'
import ResultsTable from 'orams/components/ResultsTable/ResultsTable'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadRegions, loadServices } from 'orams/actions/sellerCatalogueActions'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import styles from './SellerCatalogue.scss'

class SellerCatalogue extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadRegionsData()
    this.props.loadServicesData()
  }

  tableSection() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.errorMessage) {
      return (
        <AUpageAlert as="error">
          <h4>There was a problem loading your results</h4>
        </AUpageAlert>
      )
    }

    return <ResultsTable {...this.props} data={this.props.tableData} />
  }

  render() {
    const { regionsData, servicesData, tableData, regionAccordionOpen, categoryAccordionOpen } = this.props

    return (
      <main className={styles.cataloguePage}>
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="au-display-xl">Service Matrix</div>
            <div className="au-display-lg">Select a location and service category to view pricing</div>
            Click{' '}
            <a rel="external" target="_blank" href="/static/media/documents/orams-locations.csv">
              here
            </a>{' '}
            to download ORAMS location listing
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <div>
              <RegionsAccordionRadioList
                {...this.props}
                title="1. Select region"
                data={regionsData}
                regionAccordionOpen={regionAccordionOpen}
              />
              <CategoriesAccordionRadioList
                {...this.props}
                title="2. Select a category"
                data={servicesData}
                categoryAccordionOpen={categoryAccordionOpen}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 col-sm-push-1">
            {this.tableSection()}
          </div>
        </div>
      </main>
    )
  }
}

SellerCatalogue.propTypes = {}

const mapStateToProps = state => {
  return {
    regionAccordionOpen: state.sellersCatalogue.regionAccordionOpen,
    categoryAccordionOpen: state.sellersCatalogue.categoryAccordionOpen
  }
}

export default connect(mapStateToProps)(SellerCatalogue)
