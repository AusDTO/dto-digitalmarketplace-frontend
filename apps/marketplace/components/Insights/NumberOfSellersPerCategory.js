import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class NumberOfSellersPerCategory extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.supplierData.numberOfSuppliersPerCategory
    const chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: counts.map(a => a.count),
            backgroundColor: [
              '#7D4F73',
              '#00857A',
              '#374649',
              '#FEA19E',
              '#BE4A47',
              '#018A80',
              '#F5D33F',
              '#7F312F',
              '#BF714D',
              '#5F6B6D',
              '#A1DDEF',
              '#FEAB85',
              '#A15E9A',
              '#27809B',
              '#DFBFBF',
              '#00B8A9',
              '#85000B'
            ]
          }
        ],
        labels: counts.map(a => a.name)
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 20
          }
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
        <div className={`row ${styles.marginBottom1}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="2">
              Number of sellers per category
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-14x']}>
              {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
              <canvas ref={this.chartRef} aria-label="Number of sellers per category" role="img" />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

NumberOfSellersPerCategory.defaultProps = {
  insightData: {}
}

NumberOfSellersPerCategory.propTypes = {
  insightData: PropTypes.object.isRequired
}

export default NumberOfSellersPerCategory
