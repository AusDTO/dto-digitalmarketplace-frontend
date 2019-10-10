import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import Chart from 'chart.js/dist/Chart.bundle.min.js'

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
    const totalEntities = this.props.insightData.agencyData.agencyTypeCounts.reduce((t, a) => t + a.count, 0)
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <AUheading size="lg" level="1">
              Who is buying?
            </AUheading>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-9">
            <canvas ref={this.chartRef} />
          </div>
          <div className="col-xs-12 col-md-3">
            {`${totalEntities} entities have registered, ${Math.round(
              this.props.insightData.agencyData.commonwealthPercent
            )}% of which are Commonwealth government`}
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
