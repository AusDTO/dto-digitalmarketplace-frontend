import React, { Component } from 'react'
import BuyerDashboardBriefTable from './BuyerDashboardBriefTable'
import { connect } from 'react-redux'
import ClosedDate from 'shared/ClosedDate'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBriefs } from 'marketplace/actions/buyerDashboardActions'
import { statusConvert } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

export class BuyerDashboardMyBriefs extends Component {
  render() {
    return (
      <BuyerDashboardBriefTable
        status={'draft'}
        additionalColumns={{
          headers: [],
          columns: []
        }}
      />
    )
  }
}

export default BuyerDashboardMyBriefs
