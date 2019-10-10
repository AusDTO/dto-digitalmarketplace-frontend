import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { loadInsights } from 'marketplace/actions/insightActions'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import WhoIsBuying from '../components/Insights/WhoIsBuying'
import TopBuyers from '../components/Insights/TopBuyers'
import OpenToAllPercent from '../components/Insights/OpenToAllPercent'
import SpecialistPercent from '../components/Insights/SpecialistPercent'
import TopCategories from '../components/Insights/TopCategories'
import Figures from '../components/Insights/Figures'
import DailyRates from '../components/Insights/DailyRates'
import NumberOfSellersPerCategory from '../components/Insights/NumberOfSellersPerCategory'
import NumberOfSellersPerOpportunity from '../components/Insights/NumberOfSellersPerOpportunity'

import 'chart.js/dist/Chart.bundle.min.js'
import styles from '../main.scss'
import 'chart.js/dist/Chart.min.css'

const colours = ['#8537BF', '#FF89C4', '#37AFF7', '#F2A16A', '#6EA846']

class InsightPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      insightData: null
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.props.loadInsights().then(response => {
      this.setState({
        insightData: response.data,
        loading: false
      })
    })
  }

  render() {
    if (this.state.loading || !this.state.insightData) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <DocumentTitle title="Insights">
        <div className="au-grid">
          <div className="row">
            <div className="col-xs-10">
              <WhoIsBuying insightData={this.state.insightData} colours={colours} />
            </div>
            <div className="col-xs-2"></div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <TopBuyers insightData={this.state.insightData} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <OpenToAllPercent insightData={this.state.insightData} colours={colours} />
            </div>
            <div className="col-xs-12 col-md-6">
              <SpecialistPercent insightData={this.state.insightData} colours={colours} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <TopCategories insightData={this.state.insightData} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <Figures insightData={this.state.insightData} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <DailyRates insightData={this.state.insightData} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <NumberOfSellersPerCategory insightData={this.state.insightData} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <NumberOfSellersPerOpportunity insightData={this.state.insightData} />
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }
}

const mapResetDispatchToProps = dispatch => ({
  loadInsights: () => dispatch(loadInsights())
})

export default withRouter(
  connect(
    null,
    mapResetDispatchToProps
  )(InsightPage)
)
