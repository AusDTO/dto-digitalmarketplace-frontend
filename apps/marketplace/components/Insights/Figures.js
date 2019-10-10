import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import format from 'date-fns/format'
//import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
//import { loadAnswers } from 'marketplace/actions/questionActions'
//import styles from './Questions.scss'

export class Figures extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {Math.round(this.props.insightData.austenderData.smePercentage)}%
            of the <b>dollar value</b> contracted through the Marketplace
            since 29 August 2016 has been <b>awarded to SMEs</b>*
          </div>
          <div className="col-xs-12 col-md-6">
            ${Math.round(this.props.insightData.austenderData.totalValueAmount, 1)} 
            contracted through the Marketplace since 29 August 2016
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {this.props.insightData.supplierData.supplierCount}
            sellers registered to offer digital and ICT services
            {this.props.insightData.supplierData.suppliersCreatedThisMonth} 
            new sellers registered this month
          </div>
          <div className="col-xs-12 col-md-6">
            {this.props.insightData.briefData.totalBriefs}
            total opportunities since 29 August 2016
            {this.props.insightData.briefData.totalBriefsThisMonth}
            new opportunities this month
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Figures.defaultProps = {
  insightData: {}
}

Figures.propTypes = {
  insightData: PropTypes.object
}

export default Figures
