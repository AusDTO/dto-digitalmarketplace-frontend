import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadBrief } from 'marketplace/actions/briefActions'
import { setErrorMessage } from 'marketplace/actions/appActions'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import InvitedSellers from 'marketplace/components/BuyerBriefFlow/InvitedSellers'

class InvitedSellerPage extends Component {
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
    this.props.loadData(this.props.match.params.briefId).then(response => {
      if (response.status === 200) {
        this.setState({
          loading: false
        })
      }
      if (this.props.brief && !['rfx', 'specialist'].includes(this.props.brief.lotSlug)) {
        this.props.setError('Only RFX and specialist briefs have invited sellers.')
      }
      if (this.props.brief && this.props.brief.sellers && Object.keys(this.props.brief.sellers).length < 1) {
        this.props.setError('No invited sellers to show.')
      }
    })
  }

  render() {
    if (this.props.errorMessage) {
      let hasFocused = false
      const setFocus = e => {
        if (!hasFocused) {
          hasFocused = true
          e.focus()
        }
      }
      return (
        <ErrorBoxComponent
          title="A problem occurred when loading the brief details"
          errorMessage={this.props.errorMessage}
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.sellers) {
      return <InvitedSellers sellers={this.props.brief.sellers} />
    }

    return null
  }
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  oldWorkOrderCreator: state.brief.oldWorkOrderCreator,
  questionsAsked: state.brief.questionsAsked,
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadBrief(briefId)),
  setError: message => dispatch(setErrorMessage(message))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvitedSellerPage)
)
