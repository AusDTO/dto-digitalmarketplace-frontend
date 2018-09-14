import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import ProgressNav from 'marketplace/components/ProgressFlow/ProgressNav'
import ProgressContent from 'marketplace/components/ProgressFlow/ProgressContent'
import ProgressButtons from 'marketplace/components/ProgressFlow/ProgressButtons'

export class ProgressFlow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // this is the current state of the nav items in the progress indictor
      stages: {},
      // this is the state of whether the nav items are done
      stagesDone: {},
      // this is the current stage
      currentStage: ''
    }

    // populate the stage states
    this.props.flowStages.map(stage => {
      this.state.stages[stage.slug] = 'todo'
      this.state.stagesDone[stage.slug] = false
      return true
    })

    this.setCurrentStage = this.setCurrentStage.bind(this)
    this.setStageStatus = this.setStageStatus.bind(this)
    this.setStageDoneStatus = this.setStageDoneStatus.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  setStageStatus(stage, status) {
    this.setState(currentState => {
      const newState = { ...currentState }
      if (status === 'doing') {
        // there can only be one "doing" stage, so revert any existing 'doing' stage
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
  }

  handleFormSubmit() {
    this.props.saveBrief()
    // const nextStage = this.getNextStage(this.state.currentStage)
  }

  allStagesDone() {
    return !Object.values(this.state.stagesDone).some(val => val === false)
  }

  isLastStage(stage) {
    const stages = Object.keys(this.state.stages)
    return stage === stages[stages.length - 1]
  }

  render() {
    const items = []
    this.props.flowStages.map(stage =>
      items.push({
        link: `/${stage.slug}`,
        linkComponent: Link,
        text: stage.title,
        slug: stage.slug,
        status: this.state.stages[stage.slug]
      })
    )

    return (
      <Form model={this.props.model} onSubmit={this.handleFormSubmit}>
        <BrowserRouter basename={this.props.basename}>
          <div className="row">
            <div className="col-sm-4" aria-live="polite" aria-relevant="additions removals">
              <ProgressNav
                items={items}
                onNavChange={item => {
                  this.setStageStatus(item.slug, 'doing')
                }}
              />
            </div>
            <div className="col-sm-8">
              <Switch>
                {this.props.flowStages.map(stage => (
                  <Route
                    key={stage.slug}
                    path={`/${stage.slug}`}
                    render={() => (
                      <div>
                        <ProgressContent
                          stage={stage.slug}
                          model={this.props.model}
                          isDone={this.state.stagesDone[stage.slug]}
                          setCurrentStage={this.setCurrentStage}
                          setStageStatus={this.setStageStatus}
                          setStageDoneStatus={this.setStageDoneStatus}
                          saveBrief={this.props.saveBrief}
                          component={stage.component}
                        />
                        <ProgressButtons
                          isLastStage={this.isLastStage(stage.slug)}
                          submitEnabled={this.allStagesDone()}
                        />
                      </div>
                    )}
                  />
                ))}
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Form>
    )
  }
}

ProgressFlow.defaultProps = {
  basename: '',
  saveBrief: () => {}
}

ProgressFlow.propTypes = {
  basename: PropTypes.string,
  flowStages: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
  saveBrief: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(ProgressFlow)
