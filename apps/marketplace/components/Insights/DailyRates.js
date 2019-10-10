import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import format from 'date-fns/format'
//import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
//import { loadAnswers } from 'marketplace/actions/questionActions'
//import styles from './Questions.scss'

export class DailyRates extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    var counts = this.props.insightData.briefResponseData.dailyRates
    var chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [{
          data: counts.map(a => a.briefResponseDayRate25PC),
          backgroundColor: '#C2D2FF'
        }, {
          data: counts.map(a => a.briefResponseDayRate50PC),
          backgroundColor: '#37AFF7',
        }, {
          data: counts.map(a => a.briefResponseDayRate75PC),
          backgroundColor: '#065688'
        }],
        labels: counts.map(a => a.briefCategory)
      },
      options: {
        legend: {
          display: false
        },
        scales: {
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Daily rates incl GST'
            }
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    })
    chart.update()
  }

  render() {
    return <canvas ref={this.chartRef}></canvas>
  }
}

DailyRates.defaultProps = {
  insightData: {}
}

DailyRates.propTypes = {
  insightData: PropTypes.object
}

export default DailyRates
