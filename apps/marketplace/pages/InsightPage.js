import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUheading from '@gov.au/headings/lib/js/react.js'
import 'chart.js/dist/Chart.bundle.min.js'
import 'chart.js/dist/Chart.min.css'
import { loadInsights } from 'marketplace/actions/insightActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import WhoIsBuying from '../components/Insights/WhoIsBuying'
import TopBuyers from '../components/Insights/TopBuyers'
import OpenToAllPercent from '../components/Insights/OpenToAllPercent'
import SpecialistPercent from '../components/Insights/SpecialistPercent'
import TopCategories from '../components/Insights/TopCategories'
import Figures from '../components/Insights/Figures'
import DailyRates from '../components/Insights/DailyRates'
import NumberOfSellersPerCategory from '../components/Insights/NumberOfSellersPerCategory'
import ResponsesPerOpportunity from '../components/Insights/ResponsesPerOpportunity'
import TopSellers from '../components/Insights/TopSellers'
import AustenderFigures from '../components/Insights/AustenderFigures'

import styles from '../main.scss'

class InsightPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      insightData: null,
      loading: true
    }
  }

  componentDidMount() {
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
          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <WhoIsBuying insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <TopBuyers insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom']}`}>
            <div className="col-xs-12">
              <AUheading size="lg" level="1">
                How are we encouraging competition?
              </AUheading>
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12 col-md-6">
              <OpenToAllPercent insightData={this.state.insightData} />
            </div>
            <div className="col-xs-12 col-md-6">
              <SpecialistPercent insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-2x']}`}>
            <div className="col-xs-12">
              <TopCategories insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <Figures insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <DailyRates insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <NumberOfSellersPerCategory insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <ResponsesPerOpportunity insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <TopSellers insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <AustenderFigures insightData={this.state.insightData} />
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
