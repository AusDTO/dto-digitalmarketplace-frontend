/* eslint-disable */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import RegionsAccordionRadioList from 'orams/components/AccordionRadioList/RegionsAccordionRadioList'
import CategoriesAccordionRadioList from 'orams/components/AccordionRadioList/CategoriesAccordionRadioList'
import ResultsTable from 'orams/components/ResultsTable/ResultsTable'

import styles from './SellerCatalogue.scss'

const regionsData = {
  regions: [
    {
      mainRegion: 'NSW',
      subRegions: [{ name: 'Metro' }, { name: 'Mid North' }]
    },
    {
      mainRegion: 'ACT',
      subRegions: [{ name: 'Metro' }, { name: 'West' }]
    }
  ]
}

const categoriesData = {
  categories: [
    {
      mainCategory: 'Rehabilitation services',
      subCategories: [{ name: 'Ergonomic review' }, { name: 'Early intervention rehabilitation program' }]
    },
    {
      mainCategory: 'Medical services',
      subCategories: [{ name: 'Example service' }, { name: 'Second example service' }]
    }
  ]
}

const tableData = {
  alert: {
    type: 'info',
    message: 'This service is a fixed fee - inclusive of travel, assessment and report'
  },
  suppliers: [
    {
      name: 'APM',
      price: '$330.00',
      phone: '08 9486 1244',
      email: 'ORAMS.DHS@apm.net.au'
    },
    {
      name: 'Carfi',
      price: '$192.50',
      phone: '03 8648 0900',
      email: 'atoreferral@ipar.com.au'
    },
    {
      name: 'Injury Treatment',
      price: '$192.50',
      phone: '1300 622 734',
      email: 'atoreferral@injurytreatment.com.au'
    },
    {
      name: 'IPAR Rehabilitation',
      price: '$192.28',
      phone: '1300 762 989',
      email: 'referral@rehabmanagement.com.au'
    },
    {
      name: 'Rehab Management',
      price: '$192.50',
      phone: '1300 762 989',
      email: 'referrals@rehabmanagement.com.au'
    }
  ]
}

class SellerCatalogue extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
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
            <RegionsAccordionRadioList title="1. Select region" data={regionsData} />
            <CategoriesAccordionRadioList title="2. Select a category" data={categoriesData} />
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
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerCatalogue))
