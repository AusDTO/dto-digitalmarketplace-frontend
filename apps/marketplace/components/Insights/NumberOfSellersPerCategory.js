import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import format from 'date-fns/format'
//import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
//import { loadAnswers } from 'marketplace/actions/questionActions'
//import styles from './Questions.scss'

export class NumberOfSellersPerCategory extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    var counts = this.props.insightData.supplierData.numberOfSuppliersPerCategory
    var chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        datasets: [{
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
            '#DFBFBF'
          ]
        }],
        labels: counts.map(a => a.name)
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

NumberOfSellersPerCategory.defaultProps = {
  insightData: {}
}

NumberOfSellersPerCategory.propTypes = {
  insightData: PropTypes.object
}

export default NumberOfSellersPerCategory
