import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import format from 'date-fns/format'
//import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
//import { loadAnswers } from 'marketplace/actions/questionActions'
//import styles from './Questions.scss'

export class WhoIsBuying extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    var counts = this.props.insightData.agencyData.agencyTypeCounts
    var chart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: counts.map(a => a.count),
            backgroundColor: this.props.colours
          }
        ],
        labels: counts.map(a => a.name)
      },
      options: {
        legend: {
          position: 'right'
        }
      }
    })
    chart.update()
  }

  render() {
    var totalEntities = this.props.insightData.agencyData.agencyTypeCounts.reduce((t, a) => t + a.count, 0)
    return (
      <div className="row">
        <div className="col-xs-12 col-md-9">
          <canvas ref={this.chartRef}></canvas>
        </div>
        <div className="col-xs-12 col-md-3">
          {`${totalEntities} entities have registered, ${Math.round(
            this.props.insightData.agencyData.commonwealthPercent
          )}% of which are Commonwealth government`}
        </div>
      </div>
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
