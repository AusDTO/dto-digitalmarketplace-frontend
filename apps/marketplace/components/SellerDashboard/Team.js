import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadTeam } from 'marketplace/actions/sellerDashboardActions'
import styles from './SellerDashboard.scss'

export class Team extends Component {
  componentDidMount() {
    this.props.loadData()
  }

  render() {
    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          {this.props.items.length > 0 ? (
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={styles.colName}>
                    Name
                  </th>
                  <th scope="col" className={styles.colEmail}>
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.items.map(item => (
                  <tr key={`item.${item.id}`}>
                    <td className={styles.colId}>{item.name}</td>
                    <td className={styles.colName}>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            'No team members'
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.sellerDashboard.team.items,
  loadSuccess: state.sellerDashboard.loadTeamSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadTeam())
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
