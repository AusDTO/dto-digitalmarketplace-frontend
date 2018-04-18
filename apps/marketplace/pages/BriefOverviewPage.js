import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadBriefOverview } from 'marketplace/actions/briefActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefOverview from 'marketplace/components/Brief/BriefOverview'

export class BriefOverviewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadData(this.props.match.params.briefId)
  }

  render() {
    const { currentlySending, match } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div className="brief-page">
        {currentlySending
          ? <LoadingIndicatorFullPage />
          : <BriefOverview
              setFocus={setFocus}
              {...this.props}
              briefId={match.params.briefId}
              title={this.props.title}
            />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loadSuccess: state.brief.loadBriefOverviewSuccess,
  framework: state.brief.framework,
  title: state.brief.title,
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadBriefOverview(briefId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BriefOverviewPage)
