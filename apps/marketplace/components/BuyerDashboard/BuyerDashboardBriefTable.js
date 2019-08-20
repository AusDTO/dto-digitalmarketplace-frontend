import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import loadBuyerDashboard from 'marketplace/actions/buyerDashboardActions'
import { rootPath } from 'marketplace/routes'
import { hasPermission, mapLot } from 'marketplace/components/helpers'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

export class BuyerDashboardBriefTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      briefCount: {
        closed: 0,
        draft: 0,
        live: 0,
        withdrawn: 0
      },
      briefs: [],
      organisation: ''
    }
  }

  componentDidMount() {
    this.props.loadData(this.props.status).then(response => {
      const data = {
        briefs: response.data.briefs,
        briefCount: response.data.brief_counts,
        organisation: response.data.organisation
      }
      this.setState({
        ...data,
        loading: false
      })

      this.props.dashboardLoaded(data)
    })
  }

  getLinkedBriefTitle(item) {
    const { isPartOfTeam, isTeamLead, teams } = this.props

    let name = ''
    let url = ''
    let permissionToEdit = false
    if (item.status === 'draft') {
      if (
        hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts') ||
        hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities')
      ) {
        permissionToEdit = true
      }
    } else {
      permissionToEdit = true
    }
    switch (item.lot) {
      case 'rfx':
        url = `${rootPath}/brief/${item.id}/overview/rfx`
        name = 'Untitled seek proposals and quotes'
        break
      case 'training2':
        url = `${rootPath}/brief/${item.id}/overview/training2`
        name = 'Training (untitled)'
        break
      case 'atm':
        url = `${rootPath}/brief/${item.id}/overview/atm`
        name = 'Untitled ask the market'
        break
      case 'specialist':
        url = `${rootPath}/brief/${item.id}/overview/specialist`
        name = 'Untitled specialist'
        break
      case 'digital-outcome':
        url = `/buyers/frameworks/${item.framework}/requirements/${item.lot}/${item.id}`
        name = 'Untitled outcome'
        break
      case 'digital-professionals':
      case 'training':
        url = `${rootPath}/brief/${item.id}/overview`
        break
      default:
        url = ''
    }
    if (!permissionToEdit) {
      url = `${rootPath}/request-access/create_drafts`
    }

    return <a href={url}>{item.name || name}</a>
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.briefs.length === 0) {
      return (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <span />
              <p>You don&apos;t have any briefs. Create a new request to get started.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <BuyerDashboardHelp />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <table className={`${styles.resultListing} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col" className={styles.colId}>
                  ID
                </th>
                <th scope="col" className={styles.colName}>
                  Name
                </th>
                <th scope="col" className={styles.colOwner}>
                  Created by
                </th>
                {this.props.additionalColumns.headers.map(ac => ac)}
              </tr>
            </thead>
            <tbody>
              {this.state.briefs.map(item => (
                <tr key={`item.${item.id}`}>
                  <td className={styles.colId}>{item.id}</td>
                  <td className={styles.colName}>
                    {this.getLinkedBriefTitle(item)}
                    <br />
                    <span>{mapLot(item.lot)}</span>
                    <span className={styles.internalReference}>{item.internalReference}</span>
                  </td>
                  <td className={styles.colOwner}>
                    {item.creators.map(c => (
                      <React.Fragment key={c}>
                        {c}
                        <br />
                      </React.Fragment>
                    ))}
                  </td>
                  {this.props.additionalColumns.columns.map(ac => ac(item))}
                </tr>
              ))}
            </tbody>
          </table>
          <BuyerDashboardHelp />
        </div>
      </div>
    )
  }
}

BuyerDashboardBriefTable.defaultProps = {
  status: null,
  additionalColumns: {},
  dashboardLoaded: () => ({
    briefCount: {
      closed: 0,
      draft: 0,
      live: 0,
      withdrawn: 0
    },
    briefs: [],
    organisation: ''
  })
}

BuyerDashboardBriefTable.propTypes = {
  status: PropTypes.string,
  additionalColumns: PropTypes.object,
  dashboardLoaded: PropTypes.func
}

const mapStateToProps = state => ({
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

const mapDispatchToProps = dispatch => ({
  loadData: status => dispatch(loadBuyerDashboard(status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerDashboardBriefTable)
