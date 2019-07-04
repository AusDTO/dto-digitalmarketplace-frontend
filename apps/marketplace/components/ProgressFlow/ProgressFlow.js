/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Router, Link, withRouter, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { connect } from 'react-redux'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import ProgressNav from 'marketplace/components/ProgressFlow/ProgressNav'
import ProgressContent from 'marketplace/components/ProgressFlow/ProgressContent'
import ProgressButtons from 'marketplace/components/ProgressFlow/ProgressButtons'
import styles from './ProgressFlow.scss'

const handleFormSubmitFailed = () => {
  window.scrollTo(0, 0)
}

export class ProgressFlow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // this is the current state of the nav items in the progress indicator
      stages: {},
      // this is the state of whether the nav items are done
      stagesDone: {},
      // this is the current stage
      currentStage: '',
      activateReturn: false,
      activatePreview: false,
      saving: false,
      confirmationChecked: false
    }

    // populate the stage states
    this.props.stages.map(stage => {
      this.state.stages[stage.slug] = 'todo'
      this.state.stagesDone[stage.slug] = false
      return true
    })

    // determine the initial "doing" stage from the route
    if (
      Object.keys(this.props.match.params).includes('stage') &&
      Object.keys(this.state.stages).includes(this.props.match.params.stage)
    ) {
      this.state.stages[this.props.match.params.stage] = 'doing'
    }

    this.history = createHistory({
      basename: this.props.basename
    })

    this.setCurrentStage = this.setCurrentStage.bind(this)
    this.setStageStatus = this.setStageStatus.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handlePublish = this.handlePublish.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleConfirmationClick = this.handleConfirmationClick.bind(this)
  }

  componentDidMount() {
    this.updateAllStagesDoneStatus()
  }

  componentDidUpdate(prevProps) {
    // if the form model has changed, redetermine each stage's done status
    if (JSON.stringify(prevProps[this.props.model]) !== JSON.stringify(this.props[this.props.model])) {
      this.updateAllStagesDoneStatus()
    }
  }

  setStageStatus(stage, status) {
    this.setState(curState => {
      const newState = { ...curState }
      if (status === 'doing') {
        // there can only be one "doing" stage, so revert any existing "doing" stage
        Object.keys(newState.stages).map(stateStage => {
          if (newState.stages[stateStage] === 'doing') {
            newState.stages[stateStage] = curState.stagesDone[stateStage] ? 'done' : 'todo'
          }
          return true
        })
      }
      newState.stages[stage] = status
      return newState
    })
  }

  getNextStage(curStage) {
    let nextStage = ''
    const stages = Object.keys(this.state.stages)
    const curIndex = stages.indexOf(curStage)
    if (curIndex !== -1 && typeof stages[curIndex + 1] !== 'undefined') {
      nextStage = stages[curIndex + 1]
    }
    return nextStage
  }

  setCurrentStage(stage) {
    this.setState({
      currentStage: stage
    })
    this.setStageStatus(stage, 'doing')
  }

  getTodoStages() {
    // remove the final review stage if it exists
    const stages = { ...this.state.stagesDone }
    if (stages.review !== undefined) {
      delete stages.review
    }
    return Object.keys(stages).filter(stage => !this.state.stagesDone[stage])
  }

  updateAllStagesDoneStatus() {
    const stagesDone = { ...this.state.stagesDone }
    const stages = { ...this.state.stages }
    this.props.stages.map(stage => {
      if (typeof stage.isDone === 'function') {
        stagesDone[stage.slug] = stage.isDone(this.props[this.props.model])
        if (stagesDone[stage.slug] && stages[stage.slug] !== 'doing') {
          stages[stage.slug] = 'done'
        }
      }
      return true
    })
    this.setState(curState => {
      const newState = { ...curState }
      newState.stagesDone = { ...curState.stagesDone, ...stagesDone }
      newState.stages = { ...curState.stages, ...stages }
      return newState
    })
  }

  handleFormSubmit() {
    this.setState({
      saving: true
    })
    this.props.saveModel().then(response => {
      if (!response.error) {
        this.setState({
          saving: false
        })
        const nextStage = this.getNextStage(this.state.currentStage)
        if (nextStage) {
          this.props.history.push(`${this.props.basename}/${nextStage}`)
          this.setCurrentStage(nextStage)
        }
        window.scrollTo(0, 0)
      }
    })
  }

  handlePublish() {
    this.props.saveModel(true)
  }

  handlePreview() {
    this.setState({
      activatePreview: true
    })
  }

  handleReturn() {
    this.setState({
      activateReturn: true
    })
  }

  handleConfirmationClick(checked) {
    this.setState({
      confirmationChecked: checked
    })
  }

  allStagesDone() {
    // remove the final review stage if it exists
    const stages = { ...this.state.stagesDone }
    if (stages.review !== undefined) {
      delete stages.review
    }
    return (
      !Object.values(stages).some(val => val === false) &&
      (!this.props.progressButtons.showConfirmationCheckbox ||
        (this.props.progressButtons.showConfirmationCheckbox && this.state.confirmationChecked))
    )
  }

  isLastStage(stage) {
    const stages = Object.keys(this.state.stages)
    return stage === stages[stages.length - 1]
  }

  isFirstStage(stage) {
    const stages = Object.keys(this.state.stages)
    return stage === stages[0]
  }

  render() {
    if (this.state.activateReturn && this.props.returnPath) {
      return <Redirect to={this.props.returnPath} push />
    }

    if (this.state.activatePreview && this.props.previewPath) {
      return <Redirect to={this.props.previewPath} push />
    }

    const items = []
    this.props.stages.map(stage =>
      items.push({
        link: `${this.props.basename}/${stage.slug}`,
        linkComponent: Link,
        text: stage.title,
        slug: stage.slug,
        status: this.state.stages[stage.slug]
      })
    )

    const ProgressNavElement = () => (
      <ProgressNav
        items={items}
        onNavChange={item => {
          this.setCurrentStage(item.slug)
        }}
      />
    )

    return (
      <Router history={this.props.history}>
        <div className="row">
          <div className="col-sm-4 col-md-3" aria-live="polite" aria-relevant="additions removals">
            <div className={styles.desktopMenu}>
              <ProgressNavElement />
            </div>
            <div className={styles.mobileMenu}>
              <AUaccordion header="Form sections">
                <ProgressNavElement />
              </AUaccordion>
            </div>
          </div>
          <div className="col-sm-8 col-md-8 col-md-offset-1">
            {this.state.saving && <LoadingIndicatorFullPage />}
            {!this.state.saving &&
              this.props.stages.map(stage => (
                <Route
                  key={stage.slug}
                  path={`${this.props.basename}/${stage.slug}`}
                  render={() => (
                    <div>
                      <ProgressContent
                        component={stage.component}
                        formButtons={
                          <ProgressButtons
                            confirmationText={this.props.confirmationText}
                            isFirstStage={this.isFirstStage(stage.slug)}
                            isLastStage={this.isLastStage(stage.slug)}
                            onConfirmationClick={this.handleConfirmationClick}
                            onPreview={this.handlePreview}
                            onPublish={this.handlePublish}
                            onReturn={this.handleReturn}
                            publishEnabled={this.allStagesDone()}
                            publishText={this.props.progressButtons.publishText}
                            showConfirmationCheckbox={this.props.progressButtons.showConfirmationCheckbox}
                            showReturnText={this.props.progressButtons.showReturnText}
                            showReviewButton={this.props.progressButtons.showReviewButton}
                            startText={this.props.progressButtons.startText}
                          />
                        }
                        model={this.props.model}
                        onStageMount={this.props.onStageMount}
                        onSubmit={this.handleFormSubmit}
                        onSubmitFailed={handleFormSubmitFailed}
                        saveModel={this.props.saveModel}
                        setCurrentStage={this.setCurrentStage}
                        stage={stage.slug}
                        stagesTodo={this.getTodoStages()}
                      />
                    </div>
                  )}
                />
              ))}
          </div>
        </div>
      </Router>
    )
  }
}

ProgressFlow.defaultProps = {
  basename: '',
  onStageMount: () => {},
  previewPath: '',
  progressButtons: {},
  returnPath: '',
  saveModel: () => {}
}

ProgressFlow.propTypes = {
  basename: PropTypes.string,
  model: PropTypes.string.isRequired,
  onStageMount: PropTypes.func,
  previewPath: PropTypes.string,
  progressButtons: PropTypes.object,
  returnPath: PropTypes.string,
  saveModel: PropTypes.func,
  stages: PropTypes.array.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default withRouter(connect(mapStateToProps)(ProgressFlow))
