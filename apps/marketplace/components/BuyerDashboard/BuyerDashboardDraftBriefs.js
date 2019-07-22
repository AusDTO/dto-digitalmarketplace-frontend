import React from 'react'
import PropTypes from 'prop-types'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'

const BuyerDashboardDraftBriefs = props => (
  <BuyerDashboardBriefTable
    status={'draft'}
    additionalColumns={{
      headers: [],
      columns: []
    }}
    dashboardLoaded={bc => props.dashboardLoaded(bc)}
  />
)

BuyerDashboardDraftBriefs.propTypes = {
  dashboardLoaded: PropTypes.func.isRequired
}

export default BuyerDashboardDraftBriefs
