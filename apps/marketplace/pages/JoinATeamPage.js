import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { loadBuyerTeams } from 'marketplace/actions/teamActions'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import styles from '../main.scss'

class JoinATeamPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.props.loadTeams().then(res => {
      if (!res.status === 200) {
        this.setState({
          errorMessage: res.data
        })
      }
      this.setState({ loading: false })
      return true
    })
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
              <div className="col-sm-push-2 col-sm-8 col-xs-12">
                <AUpageAlert as="error">{this.state.errorMessage}</AUpageAlert>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-xs-12">
              {!this.props.isPartOfTeam && this.props.mustJoinTeam && (
                <React.Fragment>
                  <h1 className="au-display-xl">Join a team</h1>
                  <p>
                    Your agency requires each user in {this.props.agency} to be part of a team before they can access
                    features on the Digital Marketplace. Learn more about <a href="#1">working with internal teams</a>.
                  </p>
                  {Object.keys(this.props.teams).length > 0 && (
                    <React.Fragment>
                      <h2 className="au-display-lg">Current teams</h2>
                      <table className={`${styles.defaultStyle} ${styles.marginBottom3} col-xs-7`}>
                        {Object.values(this.props.teams).map(team => (
                          <tr key={team.id}>
                            <td className={styles.tableColumnWidth10}>{team.name}</td>
                            <td className={styles.tableColumnWidth2}>
                              <a href="#1">Request to join</a>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </React.Fragment>
                  )}
                  <p>
                    <a href="#1">Create a new team</a>
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
  agency: state.app.agency,
  isPartOfTeam: state.app.isPartOfTeam,
  mustJoinTeam: state.app.mustJoinTeam
})

const mapDispatchToProps = dispatch => ({
  loadTeams: () => dispatch(loadBuyerTeams())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JoinATeamPage)
)
