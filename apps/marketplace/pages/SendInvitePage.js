import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { parse } from 'qs'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { sendInvite } from '../actions/memberActions'

export class SendInvitePageComponent extends Component {
  componentDidMount() {
    if (this.props.match.params.token && this.getEmailFromQueryString()) {
      this.props.sendInvite(this.props.match.params.token, this.getEmailFromQueryString())
    }
  }

  getEmailFromQueryString() {
    const parsed = parse(this.props.location.search.substr(1))
    let emailAddress = ''
    if (parsed.e) {
      emailAddress = parsed.e
    }
    return emailAddress
  }

  render() {
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (this.props.errorMessage) {
      return (
        <ErrorBoxComponent
          title="There was a problem sending the invitation"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (!this.props.match.params.token || !this.getEmailFromQueryString()) {
      return (
        <ErrorBoxComponent
          title="There was a problem loading the invite details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.props.sendInviteSuccess) {
      return (
        <div>
          <h1>Invitation successfully sent</h1>
          <p>
            The user has been sent the invitation to the email address <strong>{this.props.user.email_address}</strong>.
          </p>
        </div>
      )
    }

    return <LoadingIndicatorFullPage />
  }
}

const mapStateToProps = state => ({
  sendInviteSuccess: state.user.sendInviteSuccess,
  user: state.user.user,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  sendInvite: (token, emailAddress) => dispatch(sendInvite(token, emailAddress))
})

const SendInvitePage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SendInvitePageComponent)
)

export default SendInvitePage
