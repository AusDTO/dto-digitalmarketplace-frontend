import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBuyerTeams } from '../../../actions/teamActions'
import TeamsOverviewTable from './TeamsOverviewTable'

import styles from './TeamsOverview.scss'

export class TeamsOverview extends Component {
  componentDidMount() {
    this.props.loadTeams()
  }

  render() {
    const { createTeamButton, loading, teamsOverview } = this.props
    const teams = teamsOverview.teams

    const NoTeamsMessage = () => (
      <div className={styles.initial}>
        <p>Easily track and manage access to opportunities created within your organisation.</p>
        {createTeamButton}
        <a href="">How teams work</a>
      </div>
    )

    if (loading) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <div className={styles.teams}>
        {Object.keys(teams).length === 0 ? <NoTeamsMessage /> : <TeamsOverviewTable teams={teams} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.currentlySending,
  teamsOverview: state.teamsDashboard.teamsOverview
})

const mapDispatchToProps = dispatch => ({
  loadTeams: () => dispatch(loadBuyerTeams())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview)
