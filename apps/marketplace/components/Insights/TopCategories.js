import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import format from 'date-fns/format'
//import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
//import { loadAnswers } from 'marketplace/actions/questionActions'
//import styles from './Questions.scss'

export class TopCategories extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    var counts = this.props.insightData.briefData.topCategories
    var chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [{
          data: counts.map(a => a.count),
          backgroundColor: '#065688'
        }],
        labels: counts.map(a => a.name)
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Opportunities posted'
            }
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

TopCategories.defaultProps = {
  insightData: {}
}

TopCategories.propTypes = {
  insightData: PropTypes.object
}

export default TopCategories
