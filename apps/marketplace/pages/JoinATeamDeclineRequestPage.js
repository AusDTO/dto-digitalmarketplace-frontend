import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { LocalForm } from 'react-redux-form'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { getJoinRequest, declineRequestToJoin } from 'marketplace/actions/teamActions'
import Textarea from 'shared/form/Textarea'
import { required } from 'shared/validators'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class JoinATeamDeclineRequestPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      requestDeclined: false,
      requesterName: '',
      teamName: '',
      errorMessage: ''
    }

    this.handleDeclineSubmit = this.handleDeclineSubmit.bind(this)
  }

  componentDidMount() {
    const token = this.props.match.params.token
    const teamId = this.props.match.params.teamId
    this.props.getJoinRequest(teamId, token).then(res => {
      if (res.status === 200) {
        this.setState({
          requesterName: res.data.join_request.user_name,
          teamName: res.data.join_request.team_name
        })
      } else {
        this.setState({
          errorMessage: res.data.message
        })
      }
      this.setState({ loading: false })
      return true
    })
  }

  handleDeclineSubmit(data) {
    const token = this.props.match.params.token
    const teamId = this.props.match.params.teamId
    if (data.reason) {
      this.setState({ loading: true })
      this.props.declineRequestToJoin(teamId, token, data.reason).then(res => {
        if (res.status === 200) {
          this.setState({ requestDeclined: true })
        } else {
          this.setState({
            errorMessage: res.data.message
          })
        }
        this.setState({ loading: false })
        return true
      })
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (!this.props.isPartOfTeam || !this.props.isTeamLead) {
      return <Redirect to={`${rootPath}/buyer-dashboard`} />
    }

    return (
      <DocumentTitle title="Decline request - Digital Marketplace">
        <React.Fragment>
          {this.state.errorMessage && (
            <div className="row">
              <div className="col-xs-12">
                <AUpageAlert as="error">{this.state.errorMessage}</AUpageAlert>
              </div>
            </div>
          )}
          {this.state.requesterName && this.state.teamName && (
            <div className="row">
              <div className="col-xs-12">
                {this.state.requestDeclined && (
                  <AUpageAlert as="success">
                    <React.Fragment>
                      <AUheading level="4" size="md">
                        You have successfully declined {this.state.requesterName}&apos;s request to join the &apos;
                        {this.state.teamName}&apos; team.
                      </AUheading>
                      <p>
                        <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
                      </p>
                    </React.Fragment>
                  </AUpageAlert>
                )}
                {!this.state.requestDeclined && (
                  <React.Fragment>
                    <AUheading size="xl" level="1">
                      Decline request
                    </AUheading>
                    <p>
                      We will notify {this.state.requesterName} of your reason for declining their request to join the
                      &apos;{this.state.teamName}&apos; team.
                    </p>
                    <LocalForm onSubmit={this.handleDeclineSubmit}>
                      <Textarea
                        model=".reason"
                        name="reason"
                        id="reason"
                        controlProps={{ limit: 500 }}
                        label="Add a reason"
                        validators={{ required }}
                        messages={{
                          required: 'A reason is required'
                        }}
                      />
                      <AUbutton type="submit">Decline request now</AUbutton>
                    </LocalForm>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      </DocumentTitle>
    )
  }
}

JoinATeamDeclineRequestPage.defaultProps = {
  isPartOfTeam: false,
  isTeamLead: false
}

const mapStateToProps = state => ({
  isPartOfTeam: state.app.isPartOfTeam,
  isTeamLead: state.app.isTeamLead
})

const mapDispatchToProps = dispatch => ({
  getJoinRequest: (teamId, token) => dispatch(getJoinRequest(teamId, token)),
  declineRequestToJoin: (teamId, token, reason) => dispatch(declineRequestToJoin(teamId, token, reason))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JoinATeamDeclineRequestPage)
)
