import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'

import insightStyles from './insights.scss'

const Figures = props => (
  <React.Fragment>
    <div className="row">
      <div className="col-xs-12 col-md-offset-1 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>
            {numeral(props.insightData.austenderData.smePercentage).format('(0%)')}
          </p>
          of the <b>dollar value</b> contracted through the Marketplace since 29 August 2016 has been{' '}
          <b>Awarded to SMEs</b>* (self-reported)
        </div>
      </div>
      <div className="col-xs-12 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>
            {numeral(props.insightData.austenderData.totalValueAmount).format('($0.000a)')}
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
          <br />
          <b>{props.insightData.supplierData.suppliersCreatedThisMonth} new sellers registered this month</b>
        </div>
      </div>
      <div className="col-xs-12 col-md-5">
        <div className={insightStyles['blue-box']}>
          <p className={insightStyles['big-text']}>{props.insightData.briefData.totalBriefs}</p>
          total opportunities since 29 August 2016
          <br />
          <b>{props.insightData.briefData.totalBriefsThisMonth} new opportunities this month</b>
        </div>
      </div>
    </div>
  </React.Fragment>
)

Figures.defaultProps = {
  insightData: {}
}

Figures.propTypes = {
  insightData: PropTypes.object.isRequired
}

export default Figures
