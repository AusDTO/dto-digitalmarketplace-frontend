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
            label: '',
            data: counts.map(a => parseInt(a.briefResponseDayRate25PC, 10)),
            backgroundColor: 'rgb(0,0,0,0)'
          },
          {
            label: '25th percentile to median',
            data: counts.map(a => parseInt(a.briefResponseDayRate50PC, 10)),
            backgroundColor: '#37AFF7'
          },
          {
            label: 'Median to 75th percentile',
            data: counts.map(a => parseInt(a.briefResponseDayRate75PC, 10)),
            backgroundColor: '#065688'
          }
        ],
        labels: counts.map(a => a.briefCategory)
      },
      options: {
        legend: {
          display: true,
          onClick: () => {},
          labels: {
            filter: item => {
              if (item.text === '') {
                return false
              }
              return true
            }
          }
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
            <AUheading size="lg" level="2">
              Range of daily rates submitted for specialist roles (includes GST)
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-8x']}>
              {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
              <canvas
                ref={this.chartRef}
                aria-label="Range of daily rates submitted for specialist roles (includes GST)"
                role="img"
              />
            </div>
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
