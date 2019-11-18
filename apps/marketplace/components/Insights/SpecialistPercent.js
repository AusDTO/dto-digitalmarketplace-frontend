import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'
import numeral from 'numeral'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class SpecialistPercent extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const specialistCounts = this.props.insightData.briefData.specialistBrief
    const chart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: specialistCounts.map(a => a.count),
            backgroundColor: ['#065688', '#37AFF7']
          }
        ],
        labels: specialistCounts.map(a => a.name)
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
        <div className={`col-xs-12 col-md-6 ${styles.marginBottom1}`}>
          <div className={insightStyles['chart-md-height-1x']}>
            {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
            <canvas ref={this.chartRef} aria-label="Specialist opportunity percentage" role="img" />
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          {numeral(this.props.insightData.briefData.specialistBriefPercentage).format('(0%)')} of all opportunities are
          for digital specialists since 29 August 2016
        </div>
      </div>
    )
  }
}

SpecialistPercent.defaultProps = {
  insightData: {}
}

SpecialistPercent.propTypes = {
  insightData: PropTypes.object.isRequired
}

export default SpecialistPercent
