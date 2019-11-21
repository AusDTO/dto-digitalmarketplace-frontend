import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js'
import numeral from 'numeral'

import styles from '../../main.scss'
import insightStyles from './insights.scss'

export class WhoIsBuying extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.agencyData.agencyTypeCounts
    const chart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: counts.map(a => a.count),
            backgroundColor: ['#8537BF', '#FF89C4', '#37AFF7', '#F2A16A', '#6EA846']
          }
        ],
        labels: counts.map(a => a.name)
      },
      options: {
        plugins: {
          labels: {
            render: 'value',
            fontColor: '#ffffff'
          }
        },
        legend: {
          position: 'bottom'
        }
      }
    })
    chart.update()
  }

  render() {
    const totalEntities = this.props.insightData.agencyData.agencyTypeCounts.reduce((t, a) => t + a.count, 0)
    return (
      <React.Fragment>
        <div className={`row ${styles.marginBottom1}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="2">
              Who is buying?
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className={`col-xs-12 col-md-7 ${styles.marginBottom1}`}>
            <div className={insightStyles['chart-md-height-2x']}>
              {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
              <canvas ref={this.chartRef} aria-label="Who is buying?" role="img" />
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            {totalEntities} entities have registered,{' '}
            {numeral(this.props.insightData.agencyData.commonwealthPercent).format('(0%)')} of which are Commonwealth
            government
          </div>
        </div>
      </React.Fragment>
    )
  }
}

WhoIsBuying.defaultProps = {
  insightData: {}
}

WhoIsBuying.propTypes = {
  insightData: PropTypes.object.isRequired
}

export default WhoIsBuying
