import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { loadBuyerTeams } from 'marketplace/actions/teamActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

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
              <article role="main">
                {!this.props.isPartOfTeam && this.props.mustJoinTeam && (
                  <React.Fragment>
                    <h1 className="au-display-xl">Join a team</h1>
                    <p>
                      Your agency requires each user in {this.props.agency} to be part of a team before they can access
                      features on the Digital Marketplace. Learn more about <a href="#1">working with internal teams</a>
                      .
                    </p>
                    {Object.keys(this.props.teams).length > 0 && (
                      <React.Fragment>
                        <h2 className="au-display-lg">Current teams</h2>
                        <ul>
                          {Object.values(this.props.teams).map(team => (
                            <li key={team.id}>{team.name}</li>
                          ))}
                        </ul>
                      </React.Fragment>
                    )}
                    <p>
                      <a href="#1">Create a new team</a>
                    </p>
                  </React.Fragment>
                )}
              </article>
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
