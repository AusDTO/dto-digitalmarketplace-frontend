import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { deleteBrief, loadBriefOverview } from 'marketplace/actions/briefActions'
import ErrorBox from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import BriefOverview from 'marketplace/components/Brief/Overview/BriefOverview'

export class BriefOverviewPageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadData(this.props.match.params.briefId)
  }

  render() {
    const { currentlySending, loadBriefOverviewSuccess, match } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div>
        {currentlySending && <LoadingIndicatorFullPage />}
        {!currentlySending && loadBriefOverviewSuccess ? (
          <BriefOverview setFocus={setFocus} briefId={match.params.briefId} {...this.props} />
        ) : (
          <ErrorBox title="There was a problem loading the brief" setFocus={setFocus} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentlySending: state.app.currentlySending,
  deleteBriefSuccess: state.brief.deleteBriefSuccess,
  loadBriefOverviewSuccess: state.brief.loadBriefOverviewSuccess,
  sections: state.brief.overview.sections,
  status: state.brief.overview.status,
  title: state.brief.overview.title,
  lotSlug: state.brief.overview.lot_slug
})

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadBriefOverview(briefId)),
  deleteBrief: briefId => dispatch(deleteBrief(briefId))
})

const BriefOverviewPage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BriefOverviewPageComponent)
)

export default BriefOverviewPage
