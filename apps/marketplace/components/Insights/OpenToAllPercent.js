import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import numeral from 'numeral'

import insightStyles from './insights.scss'

export class OpenToAllPercent extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const openToAllCounts = this.props.insightData.briefData.openToAllBrief
    const chart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: openToAllCounts.map(a => a.count),
            backgroundColor: ['#065688', '#37AFF7']
          }
        ],
        labels: openToAllCounts.map(a => a.name)
      },
      options: {
        plugins: {
          labels: {
            render: 'label',
            fontColor: '#ffffff'
          }
        },
        legend: {
          display: false
        }
      }
    })
    chart.update()
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <div className={insightStyles['chart-md-height-1x']}>
            <canvas ref={this.chartRef} />
          </div>
        </div>
        <div className="col-xs-12 col-md-3">
          {numeral(this.props.insightData.briefData.openToAllBriefPercentage).format('(0%)')} of all opportunities have
          been open to all
        </div>
      </div>
    )
  }
}

OpenToAllPercent.defaultProps = {
  insightData: {}
}

OpenToAllPercent.propTypes = {
  insightData: PropTypes.object
}

export default OpenToAllPercent
