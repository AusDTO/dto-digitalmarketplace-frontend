import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js/dist/Chart.bundle.min.js'

export class TopCategories extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    if (!this.chartRef.current || !this.props.insightData) {
      return
    }
    const counts = this.props.insightData.briefData.topCategories
    const chart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            data: counts.map(a => a.count),
            backgroundColor: '#065688'
          }
        ],
        labels: counts.map(a => a.name)
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Opportunities posted'
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
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="1">
              Top categories for opportunities posted since 29 August 2016
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-9">
            <canvas ref={this.chartRef} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

TopCategories.defaultProps = {
  insightData: {}
}

TopCategories.propTypes = {
  insightData: PropTypes.object
}

export default TopCategories
