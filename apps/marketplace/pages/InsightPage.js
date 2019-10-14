import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUheading from '@gov.au/headings'
import AUbutton from '@gov.au/buttons'
import Chart from 'chart.js'
import 'chartjs-plugin-labels'
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

const handlePrintClick = () => window.print()

class InsightPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      insightData: null,
      loading: true
    }
    Chart.defaults.global.plugins.labels = {
      render: 'value',
      showZero: true,
      arc: true
    }
    Chart.defaults.global.maintainAspectRatio = false
    window.addEventListener('beforeprint', () => {
      Object.keys(Chart.instances, k => {
        Chart.instances[k].resize()
      })
    })
  }

  componentDidMount() {
    this.props.loadInsights(this.props.match.params.insightId).then(response => {
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
      <DocumentTitle title="Digital Marketplace - Insights">
        <div className="au-grid">
          <div className={`row ${styles['margin-bottom-2x']}`}>
            <div className="col-xs-12">
              <AUheading size="xxl" level="1">
                Digital Marketplace Insights: {this.state.insightData.thisMonth}
              </AUheading>
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-2x']} ${styles['no-print']}`}>
            <div className="col-xs-12">
              <AUbutton onClick={handlePrintClick} as="secondary">
                Print this page
              </AUbutton>
            </div>
          </div>

          <div className={`row ${styles['margin-bottom']}`}>
            <div className="col-xs-12">
              <AUheading size="lg" level="2">
                Who are we?
              </AUheading>
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              The Digital Marketplace is a simple and fast way to buy and sell with government.{' '}
              <b>It breaks down the barriers of entry for SMEs</b> (a small to medium enterprise with less than 200
              employees) and makes it <b>easier to compete for the Australian Government’s annual ICT spend</b>.
            </div>
          </div>

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
              <AUheading size="lg" level="2">
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

          <div className={`row ${styles['margin-bottom-2x']}`}>
            <div className="col-xs-12">
              <TopSellers insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              <AustenderFigures insightData={this.state.insightData} />
            </div>
          </div>

          <div className={`row ${styles['margin-bottom-5x']}`}>
            <div className="col-xs-12">
              * Contract information is sourced from AusTender. It excludes contracts awarded by entities that
              don&apos;t report through AusTender and contracts under $10,000. Contracts may take up to 42 days to be
              published.
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

const mapResetDispatchToProps = dispatch => ({
  loadInsights: id => dispatch(loadInsights(id))
})

export default withRouter(
  connect(
    null,
    mapResetDispatchToProps
  )(InsightPage)
)
