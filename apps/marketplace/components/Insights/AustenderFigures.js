import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'

import insightStyles from './insights.scss'

const AustenderFigures = props => (
  <React.Fragment>
    <div className="row">
      <div className="col-xs-12 col-md-offset-1 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>
            {numeral(props.insightData.austenderData.smeContractsPercentageThisMonth).format('(0%)')}
          </p>
          of contracts have been <b>awarded by volume to SME sellers</b> this month*
        </div>
      </div>
      <div className="col-xs-12 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>{props.insightData.austenderData.totalContractsThisMonth}</p>
          opportunities have been contracted this month*
        </div>
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
