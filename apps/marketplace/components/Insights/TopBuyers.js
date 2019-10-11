import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js/dist/Chart.bundle.min.js'

import styles from '../../main.scss'

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
            <AUheading size="lg" level="1">
              Top buyers: September 2019
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-9">
            <canvas ref={this.chartRef} />
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
