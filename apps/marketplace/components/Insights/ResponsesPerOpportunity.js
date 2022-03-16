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
            label: 'ICT Labour Hire',
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
        <div className={`row ${styles.marginBottom1}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="2">
              Number of responses per opportunity
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className={insightStyles['chart-md-height-8x']}>
              {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
              <canvas ref={this.chartRef} aria-label="Who is buying?" role="img" />
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
  insightData: PropTypes.object.isRequired
}

export default ResponsesPerOpportunity
