import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadBuyerTeams } from '../../actions/teamActions'

import styles from './TeamsOverview.scss'

export class TeamsOverview extends Component {
  componentDidMount() {
    this.props.loadTeams()
  }

  render() {
    const { createTeamButton } = this.props

    return (
      <div className={styles.teams}>
        <div className={styles.initial}>
          <p>Easily track and manage access to opportunities created within your organisation.</p>
          {createTeamButton}
          <a href="">How teams work</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.currentlySending,
  teams: state.teamsDashboard.teams
})

const mapDispatchToProps = dispatch => ({
  loadTeams: () => dispatch(loadBuyerTeams())
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview)
