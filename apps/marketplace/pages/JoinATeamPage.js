import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { loadBuyerTeams, requestToJoin, getJoinRequests } from 'marketplace/actions/teamActions'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import styles from '../main.scss'

class JoinATeamPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      requestSent: false,
      pendingRequests: {},
      teamNameToJoin: '',
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.props
      .loadTeams()
      .then(this.getPendingRequests())
      .then(res => {
        if (res.status !== 200) {
          this.setState({
            errorMessage: res.data
          })
        }
        this.setState({ loading: false })
        return true
      })
  }

  getPendingRequests() {
    return this.props.getJoinRequests().then(res => {
      if (res.status === 200 && res.data.join_requests) {
        this.setState({ pendingRequests: { ...res.data.join_requests } })
      }
    })
  }

  handleRequestClick(e, teamId, teamName) {
    e.preventDefault()
    this.setState({ loading: true })
    this.props.requestToJoin(teamId).then(res => {
      if (res.status === 200) {
        this.setState({ requestSent: true, teamNameToJoin: teamName })
        this.getPendingRequests()
      } else {
        this.setState({
          errorMessage: res.data
        })
      }
      this.setState({ loading: false })
      return true
    })
  }

  showRequestToJoin(teamId) {
    return (
      Object.keys(this.state.pendingRequests).length === 0 || typeof this.state.pendingRequests[teamId] !== 'undefined'
    )
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.isPartOfTeam || !this.props.mustJoinTeam) {
      return <Redirect to={`${rootPath}/buyer-dashboard`} />
    }

    return (
      <DocumentTitle title="Join a team - Digital Marketplace">
        <React.Fragment>
          {this.state.errorMessage && (
            <div className="row">
              <div className="col-xs-12">
                <AUpageAlert as="error">{this.state.errorMessage}</AUpageAlert>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-xs-12">
              {!this.props.isPartOfTeam && this.props.mustJoinTeam && (
                <React.Fragment>
                  {this.state.requestSent && this.state.teamNameToJoin && (
                    <AUpageAlert as="success">
                      <React.Fragment>
                        <AUheading level="4" size="md">
                          Your request to join &apos;{this.state.teamNameToJoin}&apos; team has been sent to the team
                          lead/s for approval.
                        </AUheading>
                        <p>You will be notified via email when they have accepted or declined your request.</p>
                      </React.Fragment>
                    </AUpageAlert>
                  )}
                  <h1 className="au-display-xl">Join a team</h1>
                  <p>
                    Your agency requires each user in {this.props.organisation} to be part of a team before they can
                    access features on the Digital Marketplace. Learn more about{' '}
                    <a href="/api/2/r/how-teams-work" rel="noopener noreferrer" target="_blank">
                      working with internal teams
                    </a>
                    .
                  </p>
                  {Object.keys(this.props.teams).length > 0 && (
                    <table className={`${styles.defaultStyle} ${styles.marginBottom1} ${styles.marginTop1} col-xs-12`}>
                      <thead>
                        <tr>
                          <th className={styles.textAlignLeft}>Current teams</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(this.props.teams).map(team => (
                          <tr key={team.id}>
                            <td className={styles.tableColumnWidth6}>{team.name}</td>
                            <td className={`${styles.tableColumnWidth6} ${styles.textAlignRight}`}>
                              {typeof this.state.pendingRequests[team.id] !== 'undefined' &&
                                this.state.pendingRequests[team.id].length > 0 && (
                                  <span
                                    className={`${styles.green} ${styles.inlineBlock} ${styles.textAlignLeft} ${styles.marginRight1}`}
                                  >
                                    {this.state.pendingRequests[team.id].map(request => (
                                      <em key={request.id}>
                                        <strong>Request sent: </strong>
                                        <span>
                                          {format(request.created_at, 'D MMMM YYYY [at] hh:mma')}
                                          <br />
                                        </span>
                                      </em>
                                    ))}
                                  </span>
                                )}
                              {this.showRequestToJoin(team.id) && (
                                <span className={`${styles.inlineBlock} ${styles.textVerticalAlignTop}`}>
                                  <a href="#request" onClick={e => this.handleRequestClick(e, team.id, team.name)}>
                                    Request to join
                                  </a>
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <p>
                    <a href={`${rootPath}/team/create-new`}>Create a new team</a>
                  </p>
                </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = state => ({
  teams: state.teamsDashboard.teamsOverview.teams,
  organisation: state.teamsDashboard.organisation,
  isPartOfTeam: state.app.isPartOfTeam,
  mustJoinTeam: state.app.mustJoinTeam
})

const mapDispatchToProps = dispatch => ({
  loadTeams: () => dispatch(loadBuyerTeams()),
  getJoinRequests: () => dispatch(getJoinRequests()),
  requestToJoin: teamId => dispatch(requestToJoin(teamId))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JoinATeamPage)
)
