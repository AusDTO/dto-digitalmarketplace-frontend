import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadBriefOverview } from 'marketplace/actions/briefActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefOverview from 'marketplace/components/Brief/BriefOverview'

export class BriefOverviewPageComponent extends Component {
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
          : <BriefOverview setFocus={setFocus} {...this.props} briefId={match.params.briefId} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentlySending: state.app.currentlySending,
  framework: state.brief.framework,
  loadSuccess: state.brief.loadBriefOverviewSuccess,
  lot: state.brief.lot,
  sections: state.brief.sections,
  title: state.brief.title
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadBriefOverview(briefId))
})

const BriefOverviewPage = connect(mapStateToProps, mapDispatchToProps)(BriefOverviewPageComponent)

export default BriefOverviewPage
