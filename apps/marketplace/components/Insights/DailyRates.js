import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class DailyRates extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    let counts = this.props.insightData.briefResponseData.dailyRates
    counts = counts.filter(v => !['Not Specified', 'Emerging technologies'].includes(v.briefCategory))
    const chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            yAxisID: 'no-show',
            label: '',
            data: counts.map(a => parseInt(a.briefResponseDayRate25PC, 10))
          },
          {
            label: '25th percentile to median',
            data: counts.map(a => parseInt(a.briefResponseDayRate50PC, 10)),
            backgroundColor: '#065688',
            borderColor: '#FFFFFF',
            borderWidth: { right: 2 }
          },
          {
            label: 'Median to 75th percentile',
            data: counts.map(a => parseInt(a.briefResponseDayRate75PC, 10)),
            backgroundColor: '#065688',
            borderColor: '#FFFFFF',
            borderWidth: { left: 2 }
          }
        ],
        labels: counts.map(a => a.briefCategory)
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          tooltips: {
            mode: 'index',
            intersect: false
          },
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                callback: v => `$${v}`
              }
            }
          ],
          yAxes: [
            {
              stacked: true
            },
            {
              id: 'no-show',
              stacked: true,
              barPercentage: 0,
              display: false
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
              Range of daily rates submitted for ICT Labour Hire roles (includes GST)
            </AUheading>
          </div>
        </div>
        <div className={`row ${styles.marginBottom1}`}>
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-8x']}>
              <canvas
                ref={this.chartRef}
                aria-label="Range of daily rates submitted for specialist roles (includes GST)"
                /* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */
                role="img"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className={`col-xs-12 col-md-offset-3 col-md-6 ${styles.textAlignCenter}`}>Median</div>
        </div>
        <div className="row">
          <div className={`col-xs-5 col-md-offset-3 col-md-2 ${styles.textAlignRight}`}>25%</div>
          <div
            className={`col-xs-1 col-md-1 ${insightStyles['chart-dark-blue']} ${insightStyles['legend-border-right']}`}
          >
            &nbsp;
          </div>
          <div
            className={`col-xs-1 col-md-1 ${insightStyles['chart-dark-blue']} ${insightStyles['legend-border-left']}`}
          >
            &nbsp;
          </div>
          <div className="col-xs-5 col-md-2">75%</div>
        </div>
        <div className="row">
          <div className={`col-xs-12 col-md-offset-3 col-md-6 ${styles.textAlignCenter}`}>
            percentage of rates submitted
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
  insightData: PropTypes.object.isRequired
}

export default DailyRates
