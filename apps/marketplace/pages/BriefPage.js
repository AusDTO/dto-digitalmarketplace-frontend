import React, { Component } from 'react'
import { actions } from 'react-redux-form'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ErrorBox from 'shared/form/ErrorBox'
import NotFound from 'marketplace/components/NotFound'
import BriefDownloadResponses from 'marketplace/components/Brief/BriefDownloadResponses'
import BriefDownloadWorkOrder from 'marketplace/components/Brief/BriefDownloadWorkOrder'
import { loadBrief } from 'marketplace/actions/briefActions'
import { handleFeedbackSubmit } from 'marketplace/actions/appActions'
import BriefSubmitted from 'marketplace/components/Brief/BriefSubmitted'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class BriefPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  componentWillMount() {
    const briefId = this.props.match.params.briefId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId)
    }
  }

  handleFeedbackSubmit(values) {
    this.props.handleFeedbackSubmit({
      timeToComplete: this.state.submitClicked ? this.state.submitClicked - this.props.loadedAt : null,
      object_id: this.props.brief.id,
      object_type: 'Brief',
      userType: this.props.app.userType,
      ...values
    })
  }

  render() {
    const { currentlySending, loadBriefSuccess, match, app } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div className="brief-page">
        {currentlySending ? (
          <LoadingIndicatorFullPage />
        ) : (
          <Switch>
            <Route
              path={`${match.url}/published`}
              render={() => (
                <BriefSubmitted
                  setFocus={setFocus}
                  submitClicked={this.state.submitClicked}
                  handleSubmit={values => this.handleFeedbackSubmit(values)}
                  {...this.props}
                />
              )}
            />
            <Route
              path={`${match.url}/download-responses`}
              render={() => (
                <span>
                  {!app.errorMessage && loadBriefSuccess ? (
                    <BriefDownloadResponses
                      brief={this.props.brief}
                      briefResponses={this.props.briefResponses}
                      briefResponseDownloaded={this.props.briefResponseDownloaded}
                      onDownloadBrief={() => this.props.loadInitialData(this.props.brief.id)}
                    />
                  ) : (
                    <ErrorBox title="There was a problem downloading the documents" setFocus={setFocus} />
                  )}{' '}
                </span>
              )}
            />
            <Route
              path={`${match.url}/download-work-order`}
              render={() => (
                <span>
                  {!app.errorMessage && loadBriefSuccess ? (
                    <BriefDownloadWorkOrder brief={this.props.brief} />
                  ) : (
                    <ErrorBox title="There was a problem loading the brief" setFocus={setFocus} />
                  )}{' '}
                </span>
              )}
            />
            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    )
  }
}

BriefPage.defaultProps = {
  loadInitialData: null,
  loadBriefSuccess: null,
  briefResponseSuccess: null
}

BriefPage.propTypes = {
  brief: PropTypes.shape({
    briefSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  loadInitialData: PropTypes.func,
  loadBriefSuccess: PropTypes.bool,
  briefResponseSuccess: PropTypes.bool
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  briefResponseDownloaded: state.brief.briefResponseDownloaded,
  loadedAt: state.brief.loadedAt,
  app: state.app,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  currentlySending: state.app.currentlySending
})

const mapResetDispatchToProps = dispatch => ({
  handleFeedbackSubmit: model => dispatch(handleFeedbackSubmit(model)),
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  changeModel: (model, value) => dispatch(actions.change(model, value))
})

export default withRouter(
  connect(
    mapResetStateToProps,
    mapResetDispatchToProps
  )(BriefPage)
)
