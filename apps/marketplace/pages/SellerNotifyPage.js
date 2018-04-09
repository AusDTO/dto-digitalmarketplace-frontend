import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PageAlert from '@gov.au/page-alerts/lib/js/react.js'
import SellerNotifyNav from 'marketplace/components/SellerNotify/SellerNotifyNav'
import SellerNotifyIntroduction from 'marketplace/components/SellerNotify/SellerNotifyIntroduction'
import SellerNotifySelect from 'marketplace/components/SellerNotify/SellerNotifySelect'
import SellerNotifyReview from 'marketplace/components/SellerNotify/SellerNotifyReview'
import SellerNotifySellerList from 'marketplace/components/SellerNotify/SellerNotifySellerList'
import ErrorBox from 'shared/form/ErrorBox'
import { rootPath } from 'marketplace/routes'
import { loadBrief, handleBriefSellerNotifySubmit } from 'marketplace/actions/briefActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class SellerNotifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stages: {
        introduction: 'todo',
        select: 'todo',
        review: 'todo'
      },
      selectedSellers: [],
      csrfToken: ''
    }
    this.setStageStatus = this.setStageStatus.bind(this)
    this.moveToNextStage = this.moveToNextStage.bind(this)
    this.moveToStage = this.moveToStage.bind(this)
    this.selectSeller = this.selectSeller.bind(this)
    this.deselectSeller = this.deselectSeller.bind(this)
    this.hasSelectedASeller = this.hasSelectedASeller.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData(this.props.match.params.briefId)
  }

  setStageStatus(stage, status) {
    this.setState(currentState => {
      const newState = { ...currentState }
      // there can only be one "doing" stage, so change any existing "doing" to "todo"
      if (status === 'doing') {
        Object.keys(newState.stages).map(stateStage => {
          if (newState.stages[stateStage] === 'doing') {
            newState.stages[stateStage] = 'todo'
          }
          return true
        })
      }
      newState.stages[stage] = status
      return newState
    })
  }

  moveToNextStage(currentStage) {
    const stages = Object.keys(this.state.stages)
    const index = stages.indexOf(currentStage)

    if (index !== -1 && typeof stages[index + 1] !== 'undefined') {
      this.props.history.push(
        `${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.flow}/${stages[index + 1]}`
      )
    }
  }

  moveToStage(stage) {
    if (this.state.stages[stage]) {
      this.props.history.push(`${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.flow}/${stage}`)
    }
  }

  selectSeller(supplierCode, callback) {
    this.setState(currentState => {
      const newState = { ...currentState }
      let newSeller = {}
      this.props.briefResponses.map(response => {
        if (response.supplier_code === parseInt(supplierCode, 10)) {
          newSeller = {
            supplier_code: response.supplier_code,
            supplier_name: response.supplier_name,
            contact_name: response.supplier_contact_name
          }
        }
        return true
      })
      newState.selectedSellers.push(newSeller)
      return newState
    }, callback)
  }

  deselectSeller(supplierCode, callback) {
    this.setState(currentState => {
      const newState = { ...currentState }
      newState.selectedSellers = newState.selectedSellers.filter(
        seller => seller.supplier_code !== parseInt(supplierCode, 10)
      )
      return newState
    }, callback)
  }

  hasSelectedASeller() {
    return this.state.selectedSellers.length > 0
  }

  render() {
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (!this.props.loadBriefSuccess) {
      return <ErrorBox title="There was a problem loading the brief details" setFocus={setFocus} />
    }

    if (this.props.currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.briefSellerNotifySubmitSuccess) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <PageAlert as="success">
              <h2>Emails have been sent to:</h2>
              <SellerNotifySellerList sellers={this.state.selectedSellers} />
            </PageAlert>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <article role="main">
          <div className="col-sm-4">
            <SellerNotifyNav {...this.props} {...this.state} setStageStatus={this.setStageStatus} />
          </div>
          <div className="col-sm-8">
            <Switch>
              <Route
                exact
                path={`${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.flow}`}
                render={() =>
                  <SellerNotifyIntroduction
                    flow={this.props.flow}
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                  />}
              />
              <Route
                path={`${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.flow}/select`}
                render={() =>
                  <SellerNotifySelect
                    briefResponses={this.props.briefResponses}
                    selectedSellers={this.state.selectedSellers}
                    setStageStatus={this.setStageStatus}
                    selectSeller={this.selectSeller}
                    deselectSeller={this.deselectSeller}
                    hasSelectedASeller={this.hasSelectedASeller}
                    moveToNextStage={this.moveToNextStage}
                  />}
              />
              <Route
                path={`${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.flow}/review`}
                render={() =>
                  <SellerNotifyReview
                    flow={this.props.flow}
                    brief={this.props.brief}
                    selectedSellers={this.state.selectedSellers}
                    hasSelectedASeller={this.hasSelectedASeller}
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                    moveToStage={this.moveToStage}
                    handleSubmit={this.props.handleSubmit}
                  />}
              />
            </Switch>
          </div>
        </article>
      </div>
    )
  }
}

SellerNotifyPage.propTypes = {
  match: PropTypes.object.isRequired,
  flow: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  briefResponses: state.brief.briefResponses,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  briefSellerNotifySubmitSuccess: state.brief.briefSellerNotifySubmitSuccess,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadBrief(briefId)),
  handleSubmit: (briefId, model) => dispatch(handleBriefSellerNotifySubmit(briefId, model))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerNotifyPage))
