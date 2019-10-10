import React from 'react'
import PropTypes from 'prop-types'

const Figures = props => (
  <React.Fragment>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        {Math.round(props.insightData.austenderData.smePercentage)}% of the <b>dollar value</b> contracted through the
        Marketplace since 29 August 2016 has been <b>awarded to SMEs</b>*
      </div>
      <div className="col-xs-12 col-md-6">
        ${Math.round(props.insightData.austenderData.totalValueAmount, 1)}
        contracted through the Marketplace since 29 August 2016
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        {props.insightData.supplierData.supplierCount}
        sellers registered to offer digital and ICT services
        {props.insightData.supplierData.suppliersCreatedThisMonth}
        new sellers registered this month
      </div>
      <div className="col-xs-12 col-md-6">
        {props.insightData.briefData.totalBriefs}
        total opportunities since 29 August 2016
        {props.insightData.briefData.totalBriefsThisMonth}
        new opportunities this month
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
