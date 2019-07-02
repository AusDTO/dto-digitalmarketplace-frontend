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
    briefCountUpdated={bc => props.briefCountUpdated(bc)}
  />
)

BuyerDashboardDraftBriefs.propTypes = {
  briefCountUpdated: PropTypes.func.isRequired
}

export default BuyerDashboardDraftBriefs
