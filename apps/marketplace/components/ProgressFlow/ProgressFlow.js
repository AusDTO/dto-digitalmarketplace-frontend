import React, { Component } from 'react'
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
      // this is the entire flow's data model
      model: this.props.model
    }

    // populate the stage states
    this.props.flowStages.map(stage => {
      this.state.stages[stage.slug] = 'todo'
      this.state.stagesDone[stage.slug] = false
      return true
    })

    this.setStageStatus = this.setStageStatus.bind(this)
    this.setStageDoneStatus = this.setStageDoneStatus.bind(this)
    this.updateModel = this.updateModel.bind(this)
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

  getNextStage(curStage) {
    let nextStage = ''
    const stages = Object.keys(this.state.stages)
    const curIndex = stages.indexOf(curStage)
    if (curIndex !== -1 && typeof stages[curIndex + 1] !== 'undefined') {
      nextStage = stages[curIndex + 1]
    }
    return nextStage
  }

  updateModel(model) {
    this.setState(curState => {
      const newState = { ...curState }
      newState.model = { ...curState.model, ...model }
      return newState
    })
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
                        model={this.state.model}
                        updateModel={this.updateModel}
                        setStageStatus={this.setStageStatus}
                        setStageDoneStatus={this.setStageDoneStatus}
                        component={stage.component}
                      />
                      <ProgressButtons nextStage={this.getNextStage(stage.slug)} />
                    </div>
                  )}
                />
              ))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

ProgressFlow.defaultProps = {
  basename: ''
}

ProgressFlow.propTypes = {
  basename: PropTypes.string,
  flowStages: PropTypes.array.isRequired,
  model: PropTypes.object.isRequired
}

export default ProgressFlow
