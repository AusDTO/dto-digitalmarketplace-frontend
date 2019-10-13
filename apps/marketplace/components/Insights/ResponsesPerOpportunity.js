import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class ResponsesPerOpportunity extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.briefResponseData.responsesPerOpportunity
    const chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Other',
            data: counts.filter(c => c.briefType === 'Other').map(a => a.count),
            backgroundColor: '#0985D1'
          },
          {
            label: 'Specialist',
            data: counts.filter(c => c.briefType === 'Specialist').map(a => a.count),
            backgroundColor: '#660033'
          }
        ],
        labels: counts.filter(c => c.briefType === 'Specialist').map(a => a.noOfResponses)
      },
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        scales: {
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          xAxes: [
            {
              ticks: {
                beginAtZero: true
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
              Number of responses per opportunity
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-8x']}>
              <canvas ref={this.chartRef} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ResponsesPerOpportunity.defaultProps = {
  insightData: {}
}

ResponsesPerOpportunity.propTypes = {
  insightData: PropTypes.object
}

export default ResponsesPerOpportunity
