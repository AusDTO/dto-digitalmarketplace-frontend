import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPublicBrief } from 'marketplace/actions/briefActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import BuyerRFXCompleted from 'marketplace/components/BuyerRFX/BuyerRFXCompleted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { rootPath } from 'marketplace/routes'

class BuyerRFXCompletedPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    if (this.props.match.params.briefId) {
      this.getBriefData()
    }
  }

  getBriefData() {
    this.setState({
      loading: true
    })
    this.props.loadInitialData(this.props.match.params.briefId).then(() => {
      this.setState({
        loading: false
      })
    })
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
          title="A problem has occurred"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    const briefId = this.props.match.params.briefId

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.status && this.props.brief.status !== 'live') {
      return (
        <ErrorBoxComponent
          title="A problem has occurred"
          errorMessage={
            <span>
              This opportunity is not live. This could be because it has closed, been withdrawn or has not yet been
              published. Please{' '}
              <a href={`${rootPath}/brief/${this.props.brief.id}/overview/${this.props.brief.lot}`}>
                return to the overview page
              </a>{' '}
              to check or contact us if you have any issues.
            </span>
          }
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.props.brief && this.props.brief.closedAt) {
      return (
        <BuyerRFXCompleted
          contactEmail={this.props.emailAddress}
          briefId={briefId}
          closingDate={this.props.brief.closedAt}
        />
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  errorMessage: state.app.errorMessage,
  emailAddress: state.app.emailAddress
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerRFXCompletedPage)
