import React from 'react'
import PropTypes from 'prop-types'

import insightStyles from './insights.scss'

const Figures = props => (
  <React.Fragment>
    <div className="row">
      <div className="col-xs-12 col-md-offset-1 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>{Math.round(props.insightData.austenderData.smePercentage)}%</p>
          of the <b>dollar value</b> contracted through the Marketplace since 29 August 2016 has been{' '}
          <b>awarded to SMEs</b>*
        </div>
      </div>
      <div className="col-xs-12 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>
            ${Math.round(props.insightData.austenderData.totalValueAmount, 1)}
          </p>
          contracted through the Marketplace since 29 August 2016
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-offset-1 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>{props.insightData.supplierData.supplierCount}</p>
          sellers registered to offer digital and ICT services
          {props.insightData.supplierData.suppliersCreatedThisMonth}
          new sellers registered this month
        </div>
      </div>
      <div className="col-xs-12 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>{props.insightData.briefData.totalBriefs}</p>
          total opportunities since 29 August 2016
          {props.insightData.briefData.totalBriefsThisMonth}
          new opportunities this month
        </div>
      </div>
    </div>
  </React.Fragment>
)

Figures.defaultProps = {
  insightData: {}
}

Figures.propTypes = {
  insightData: PropTypes.object
}

export default Figures
