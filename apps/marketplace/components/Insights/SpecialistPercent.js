import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js/dist/Chart.bundle.min.js'

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
        legend: {
          position: 'right'
        }
      }
    })
    chart.update()
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-9">
          <canvas ref={this.chartRef} />
        </div>
        <div className="col-xs-12 col-md-3">
          {`${Math.round(
            this.props.insightData.briefData.specialistBriefPercentage
          )}% of all opportunities have been for digital specialists`}
        </div>
      </div>
    )
  }
}

SpecialistPercent.defaultProps = {
  insightData: {}
}

SpecialistPercent.propTypes = {
  insightData: PropTypes.object
}

export default SpecialistPercent
