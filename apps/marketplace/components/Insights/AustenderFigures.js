import React from 'react'
import PropTypes from 'prop-types'

const AustenderFigures = props => (
  <React.Fragment>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        {Math.round(props.insightData.austenderData.smeContractsPercentageThisMonth)}% of contracts have been{' '}
        <b>awarded by volume to SME sellers</b> this month*
      </div>
      <div className="col-xs-12 col-md-6">
        {props.insightData.austenderData.totalContractsThisMonth}
        opportunities have been contracted this month*
      </div>
    </div>
  </React.Fragment>
)

AustenderFigures.defaultProps = {
  insightData: {}
}

AustenderFigures.propTypes = {
  insightData: PropTypes.object
}

export default AustenderFigures
