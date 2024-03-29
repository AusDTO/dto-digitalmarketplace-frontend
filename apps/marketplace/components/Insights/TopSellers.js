import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class TopSellers extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.austenderData.topSuppliersThisFinancialYear
    const chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            label: 'SME (self-reported)',
            data: counts.map(a => (a.contractSupplierMarketplaceSMEStatus === 'SME' ? a.count : 0)),
            backgroundColor: '#065688'
          },
          {
            label: 'Non SME (self-reported)',
            data: counts.map(a => (a.contractSupplierMarketplaceSMEStatus === 'Non SME' ? a.count : 0)),
            backgroundColor: '#757575'
          }
        ],
        labels: counts.map(a => a.contractSupplierMarketplaceName)
      },
      options: {
        legend: {
          display: true,
          position: 'right'
        },
        tooltips: {
          filter: t => t.value !== '0'
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Contracts Awarded'
              }
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    })
    chart.update()
  }

  render() {
    return (
      <React.Fragment>
        <div className={`row ${styles.marginBottom1}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="2">
              Top sellers awarded contracts this financial year *
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-4x']}>
              {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
              <canvas ref={this.chartRef} aria-label="Top sellers awarded contracts this financial year *" role="img" />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

TopSellers.defaultProps = {
  insightData: {}
}

TopSellers.propTypes = {
  insightData: PropTypes.object.isRequired
}

export default TopSellers
