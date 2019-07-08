import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerTeamMembers } from '../../actions/teamActions'

import styles from './PeopleOverview.scss'

export class PeopleOverview extends Component {
  componentDidMount() {
    this.props.loadTeamMembers()
  }

  render() {
    const { loading, teamMembers } = this.props

    if (loading) {
      return <LoadingIndicatorFullPage />
    }

    if (teamMembers.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <p>You don&apos;t have any team members to show.</p>
          </div>
        </div>
      )
    }

    return (
      <div className={`${styles.people} row`}>
        <div className="col-xs-12">
          <p>
            If someone has left your organisation, <a href="/contact-us">contact us</a> to have them removed.
          </p>
          <table className={`col-xs-12 ${styles.peopleOverview}`}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map(teamMember => (
                <tr key={`item.${teamMember.email}`}>
                  <td>{teamMember.name}</td>
                  <td>
                    <a href={`mailto:${teamMember.email}`}>{teamMember.email}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.currentlySending,
  teamMembers: state.teamsDashboard.buyerTeamMembers.items
})

const mapDispatchToProps = dispatch => ({
  loadTeamMembers: () => dispatch(loadBuyerTeamMembers())
})

export default connect(mapStateToProps, mapDispatchToProps)(PeopleOverview)
