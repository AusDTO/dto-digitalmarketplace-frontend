import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import format from 'date-fns/format'
//import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
//import { loadAnswers } from 'marketplace/actions/questionActions'
//import styles from './Questions.scss'

export class NumberOfSellersPerOpportunity extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    var counts = this.props.insightData.briefResponseData.responsesPerOpportunity
    var chart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Other',
          data: counts.filter(c => c.briefType === 'Other').map(a => a.count),
          backgroundColor: '#7D4F73'
        }, {
          label: 'Specialist',
          data: counts.filter(c => c.briefType === 'Specialist').map(a => a.count),
          backgroundColor: '#00857A'
        }],
        labels: counts.filter(c => c.briefType === 'Specialist').map(a => a.noOfResponses)
      },
      options: {
        legend: {
          display: true
        },
        scales: {
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
          xAxes: [{
            ticks: {
              beginAtZero: true
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

NumberOfSellersPerOpportunity.defaultProps = {
  insightData: {}
}

NumberOfSellersPerOpportunity.propTypes = {
  insightData: PropTypes.object
}

export default NumberOfSellersPerOpportunity
