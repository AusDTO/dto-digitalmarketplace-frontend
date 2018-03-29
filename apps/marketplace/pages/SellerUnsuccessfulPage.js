import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import SellerUnsuccessfulNav from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulNav'
import SellerUnsuccessfulIntroduction from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulIntroduction'
import SellerUnsuccessfulSelect from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulSelect'
import SellerUnsuccessfulReview from 'marketplace/components/SellerUnsuccessful/SellerUnsuccessfulReview'
import { rootPath } from 'marketplace/routes'

export class SellerUnsuccessfulPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stages: {
        introduction: 'todo',
        select: 'todo',
        review: 'todo', 
      },
      sellers: [
        {
          id: 1,
          name: 'Test seller 1'
        },
        {
          id: 2,
          name: 'Test seller 2'
        },
        {
          id: 3,
          name: 'Test seller 3'
        },
        {
          id: 4,
          name: 'Test seller 4'
        },
      ],
      selectedSellers: []
    }
    this.setStageStatus = this.setStageStatus.bind(this)
    this.moveToNextStage = this.moveToNextStage.bind(this)
    this.selectSeller = this.selectSeller.bind(this)
    this.deselectSeller = this.deselectSeller.bind(this)
    this.hasSelectedSeller = this.hasSelectedSeller.bind(this)
  }

  setStageStatus(stage, status) {
    let newStagesState = this.state.stages

    // there can only be one "doing" stage
    if (status === 'doing') {
      for (let status in this.state.stages) {
        if (this.state.stages[status] === 'doing') {
          newStagesState[status] = 'todo'
        }
      }
    }

    newStagesState[stage] = status
    this.setState({stages: newStagesState})
  }

  moveToNextStage(currentStage) {
    const stages = Object.keys(this.state.stages)
    const index = stages.indexOf(currentStage)

    if (index !== -1 && typeof stages[index + 1] !== 'undefined') {
      this.props.history.push(`${rootPath}/seller/unsuccessful/${stages[index + 1]}`)
    }
  }

  selectSeller(id) {
    let newSelectedSellers = this.state.selectedSellers.slice()
    let newSeller = {}
    this.state.sellers.map((seller) => {
      if (seller.id === parseInt(id)) {
        newSeller = seller
      }
    })
    newSelectedSellers.push(newSeller)
    this.setState({
      selectedSellers: newSelectedSellers
    })
  }

  deselectSeller(id) {
    let newSelectedSellers = this.state.selectedSellers.slice()
    newSelectedSellers = newSelectedSellers.filter(seller => seller.id !== parseInt(id))
    this.setState({
      selectedSellers: newSelectedSellers
    })
  }

  hasSelectedSeller() {
    return this.state.selectedSellers.length > 0
  }
  
  render() {
    return (
      <div className="row">
        <article role="main">
          <div className="col-sm-4">
            <SellerUnsuccessfulNav
              {...this.props}
              {...this.state.stages}
              setStageStatus={this.setStageStatus}
            />
          </div>
          <div className="col-sm-8">
            <Switch>
              <Route
                exact
                path={`${rootPath}/seller/unsuccessful`}
                render={() =>
                  <SellerUnsuccessfulIntroduction
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                  />
                }
              />
              <Route
                path={`${rootPath}/seller/unsuccessful/select`}
                render={() =>
                  <SellerUnsuccessfulSelect
                    sellers={this.state.sellers}
                    selectedSellers={this.state.selectedSellers}
                    setStageStatus={this.setStageStatus}
                    selectSeller={this.selectSeller}
                    deselectSeller={this.deselectSeller}
                    hasSelectedSeller={this.hasSelectedSeller}
                    moveToNextStage={this.moveToNextStage}
                  />
                }
              />
              <Route
                path={`${rootPath}/seller/unsuccessful/review`}
                render={() =>
                  <SellerUnsuccessfulReview
                    selectedSellers={this.state.selectedSellers}
                    hasSelectedSeller={this.hasSelectedSeller}
                    setStageStatus={this.setStageStatus}
                    moveToNextStage={this.moveToNextStage}
                  />
                }
              />
            </Switch>
          </div>
        </article>
      </div>
    )
  }
}

export default withRouter(SellerUnsuccessfulPage)
