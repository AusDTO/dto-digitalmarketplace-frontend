import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerNotifyNav from 'marketplace/components/SellerNotify/SellerNotifyNav'
import SellerNotifyIntroduction from 'marketplace/components/SellerNotify/SellerNotifyIntroduction'
import SellerNotifySelect from 'marketplace/components/SellerNotify/SellerNotifySelect'
import SellerNotifyReview from 'marketplace/components/SellerNotify/SellerNotifyReview'
import SellerNotifySellerList from 'marketplace/components/SellerNotify/SellerNotifySellerList'
import ErrorBox from 'shared/form/ErrorBox'
import { rootPath } from 'marketplace/routes'
import { loadBriefSellers, handleBriefSellerNotifySubmit } from 'marketplace/actions/briefActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class SellerNotifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // this is the current state of the nav items in the progress indictor
      stages: {
        introduction: 'todo',
        select: 'todo',
        review: 'todo'
      },
      // this is the state of whether the nav items are done
      stagesDone: {
        introduction: false,
        select: false,
        review: false
      },
      selectedSellers: []
    }
    this.setStageStatus = this.setStageStatus.bind(this)
    this.moveToNextStage = this.moveToNextStage.bind(this)
    this.moveToStage = this.moveToStage.bind(this)
    this.selectSeller = this.selectSeller.bind(this)
    this.deselectSeller = this.deselectSeller.bind(this)
    this.hasSelectedASeller = this.hasSelectedASeller.bind(this)
    this.setStageDoneStatus = this.setStageDoneStatus.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData(this.props.match.params.briefId)
  }

  setStageStatus(stage, status) {
    this.setState(currentState => {
      const newState = { ...currentState }
      if (status === 'doing') {
        // there can only be one "doing" stage
        Object.keys(newState.stages).map(stateStage => {
          if (newState.stages[stateStage] === 'doing') {
            newState.stages[stateStage] = currentState.stagesDone[stateStage] ? 'done' : 'todo'
          }
          return true
        })
      }
      newState.stages[stage] = status
      return newState
    })
  }

  setStageDoneStatus(stage, isDone) {
    this.setState(currentState => {
      const newState = { ...currentState }
      newState.stagesDone[stage] = isDone
      return newState
    })
  }

  moveToNextStage(currentStage) {
    const stages = Object.keys(this.state.stages)
    const index = stages.indexOf(currentStage)

    if (index !== -1 && typeof stages[index + 1] !== 'undefined') {
      this.props.history.push(
        `${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.match.params.flow}/${stages[
          index + 1
        ]}`
      )
    }
  }

  moveToStage(stage) {
    if (this.state.stages[stage]) {
      this.props.history.push(
        `${rootPath}/brief/${this.props.match.params.briefId}/seller-${this.props.match.params.flow}/${stage}`
      )
    }
  }

  selectSeller(supplierCode, callback) {
    this.setState(currentState => {
      const newState = { ...currentState }
      let newSeller = {}
      this.props.sellers.map(response => {
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
    const {
      currentlySending,
      loadBriefSuccess,
      errorMessage,
      match,
      sellers,
      briefSellerNotifySubmitSuccess,
      handleSubmit,
      brief
    } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (currentlySending) {
      return <LoadingIndicatorFullPage />
    }

    if (!loadBriefSuccess) {
      return <ErrorBox title="There was a problem loading the brief details" setFocus={setFocus} />
    }

    if (errorMessage) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <PageAlert as="error">
              <p>
                {errorMessage}
              </p>
            </PageAlert>
          </div>
        </div>
      )
    }

    if (sellers.length < 1) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <PageAlert as="error">
              <p>This brief did not receive any responses.</p>
            </PageAlert>
          </div>
        </div>
      )
    }

    if (briefSellerNotifySubmitSuccess) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <PageAlert as="success">
              <AUheading size="lg" level="2">
                Emails have been sent to:
              </AUheading>
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
            <SellerNotifyNav
              {...this.state}
              flow={match.params.flow}
              briefId={match.params.briefId}
              setStageStatus={this.setStageStatus}
            />
          </div>
          <div className="col-sm-8">
            <Switch>
              <Route
                exact
                path={`${rootPath}/brief/${match.params.briefId}/seller-${match.params.flow}`}
                render={() =>
                  <SellerNotifyIntroduction
                    flow={match.params.flow}
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                    setStageDoneStatus={this.setStageDoneStatus}
                  />}
              />
              <Route
                path={`${rootPath}/brief/${match.params.briefId}/seller-${match.params.flow}/select`}
                render={() =>
                  <SellerNotifySelect
                    sellers={sellers}
                    selectedSellers={this.state.selectedSellers}
                    setStageStatus={this.setStageStatus}
                    selectSeller={this.selectSeller}
                    deselectSeller={this.deselectSeller}
                    hasSelectedASeller={this.hasSelectedASeller}
                    moveToNextStage={this.moveToNextStage}
                    setStageDoneStatus={this.setStageDoneStatus}
                  />}
              />
              <Route
                path={`${rootPath}/brief/${match.params.briefId}/seller-${match.params.flow}/review`}
                render={() =>
                  <SellerNotifyReview
                    flow={match.params.flow}
                    brief={brief}
                    selectedSellers={this.state.selectedSellers}
                    hasSelectedASeller={this.hasSelectedASeller}
                    setStageStatus={this.setStageStatus}
                    moveToStage={this.moveToStage}
                    handleSubmit={handleSubmit}
                    setStageDoneStatus={this.setStageDoneStatus}
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
  match: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  brief: state.brief.brief,
  sellers: state.brief.sellers,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  briefSellerNotifySubmitSuccess: state.brief.briefSellerNotifySubmitSuccess,
  errorMessage: state.app.errorMessage,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadBriefSellers(briefId)),
  handleSubmit: (briefId, model) => dispatch(handleBriefSellerNotifySubmit(briefId, model))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellerNotifyPage))
