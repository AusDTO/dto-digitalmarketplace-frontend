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
          position: 'right'
        }
      }
    })
    chart.update()
  }

  render() {
    const totalEntities = this.props.insightData.agencyData.agencyTypeCounts.reduce((t, a) => t + a.count, 0)
    return (
      <React.Fragment>
        <div className={`row ${styles['margin-bottom']}`}>
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="1">
              Who is buying?
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-7">
            <div className={insightStyles['chart-md-height-2x']}>
              <canvas ref={this.chartRef} />
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
  insightData: PropTypes.object
}

export default WhoIsBuying
