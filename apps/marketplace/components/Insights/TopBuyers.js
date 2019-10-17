import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class TopBuyers extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const briefCounts = this.props.insightData.briefData.topBuyersThisMonth
    const chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            data: briefCounts.map(a => a.count),
            backgroundColor: '#065688'
          }
        ],
        labels: briefCounts.map(a => a.name)
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Opportunities posted'
              }
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
        <div className={`row ${styles['margin-bottom']}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="2">
              Top buyers for {this.props.insightData.thisMonth}
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-4x']}>
              <canvas
                ref={this.chartRef}
                aria-label={`Top buyers for ${this.props.insightData.thisMonth}`}
                /* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */
                role="img"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

TopBuyers.defaultProps = {
  insightData: {}
}

TopBuyers.propTypes = {
  insightData: PropTypes.object
}

export default TopBuyers
