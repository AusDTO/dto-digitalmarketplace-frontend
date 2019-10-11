import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js/dist/Chart.bundle.min.js'

import styles from '../../main.scss'

export class DailyRates extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.briefResponseData.dailyRates
    const chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            data: counts.map(a => a.briefResponseDayRate25PC),
            backgroundColor: '#C2D2FF'
          },
          {
            data: counts.map(a => a.briefResponseDayRate50PC),
            backgroundColor: '#37AFF7'
          },
          {
            data: counts.map(a => a.briefResponseDayRate75PC),
            backgroundColor: '#065688'
          }
        ],
        labels: counts.map(a => a.briefCategory)
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Daily rates incl GST'
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
        <div className={`row ${styles['margin-bottom']}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="1">
              Daily rates sellers have bid for specialist roles
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

DailyRates.defaultProps = {
  insightData: {}
}

DailyRates.propTypes = {
  insightData: PropTypes.object
}

export default DailyRates
