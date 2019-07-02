import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import loadBuyerDashboard from 'marketplace/actions/buyerDashboardActions'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardHelp from './BuyerDashboardHelp'
import styles from './BuyerDashboard.scss'

const getLinkedBriefTitle = item => {
  let name = ''
  let url = ''
  switch (item.lot) {
    case 'rfx':
      url = `${rootPath}/brief/${item.id}/overview/rfx`
      name = 'Untitled seek proposals and quotes'
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
  return <a href={url}>{item.name || name}</a>
}

const mapLot = item => {
  switch (item.lot) {
    case 'atm':
    case 'digital-outcome':
      return 'Ask the market'
    case 'rfx':
      return 'Seek proposals and quotes'
    case 'digital-professionals':
    case 'specialist':
      return 'Specialist'
    case 'training':
      return 'Training'
    default:
      return item.lot
  }
}

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
      briefs: []
    }
  }

  componentDidMount() {
    this.props.loadData(this.props.status).then(response => {
      this.setState({
        briefs: response.data.briefs,
        briefCount: response.data.brief_counts,
        loading: false
      })
      this.props.briefCountUpdated(response.data.brief_counts)
    })
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
                  Owner
                </th>
                {this.props.additionalColumns.headers.map(ac => ac)}
              </tr>
            </thead>
            <tbody>
              {this.state.briefs.map(item => (
                <tr key={`item.${item.id}`}>
                  <td className={styles.colId}>{item.id}</td>
                  <td className={styles.colName}>
                    {getLinkedBriefTitle(item)}
                    <br />
                    <span>{mapLot(item)}</span>
                    <span className={styles.internalReference}>{item.internalReference}</span>
                  </td>
                  <td className={styles.colName}>{item.owner}</td>
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
  briefCountUpdated: () => ({
    closed: 0,
    draft: 0,
    live: 0,
    withdrawn: 0
  })
}

BuyerDashboardBriefTable.propTypes = {
  status: PropTypes.string,
  additionalColumns: PropTypes.object,
  briefCountUpdated: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  loadData: status => dispatch(loadBuyerDashboard(status))
})

export default connect(null, mapDispatchToProps)(BuyerDashboardBriefTable)
