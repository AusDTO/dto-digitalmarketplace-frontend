import React, { Component } from 'react'
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgressNav from 'marketplace/components/ProgressFlow/ProgressNav'
import BuyerRFQStages from 'marketplace/components/BuyerRFQ/BuyerRFQStages'
import { rootPath } from 'marketplace/routes'

class BuyerRFQPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // this is the current state of the nav items in the progress indictor
      stages: {},
      // this is the state of whether the nav items are done
      stagesDone: {}
    }

    // populate the stage states
    BuyerRFQStages.map(stage => {
      this.state.stages[stage.slug] = 'todo'
      this.state.stagesDone[stage.slug] = false
      return true
    })
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

  render() {
    const items = []
    BuyerRFQStages.map(stage => (
      items.push({
        link: `/${stage.slug}`,
        linkComponent: Link,
        text: stage.title,
        slug: stage.slug,
        status: this.state.stages[stage.slug]
      })
    ))

    return (
      <BrowserRouter basename={`${rootPath}/buyer-rfq`}>
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
              {BuyerRFQStages.map(stage => (
                <Route key={stage.slug} path={`/${stage.slug}`} component={stage.component} />
              ))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default BuyerRFQPage
