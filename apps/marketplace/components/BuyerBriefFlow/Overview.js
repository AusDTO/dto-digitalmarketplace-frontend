import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBrief } from 'marketplace/actions/briefActions'
import isValid from 'date-fns/is_valid'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'
import Tick from 'marketplace/components/Icons/Tick/Tick'
import OverviewHeader from './Overview/OverviewHeader'
import ConfirmActionAlert from '../Alerts/ConfirmActionAlert'
import { mapLot } from '../helpers'

import styles from './Overview.scss'

const createWorkOrderRender = (brief, flow, isPublished, isClosed, oldWorkOrderCreator) => {
  if (isPublished && isClosed) {
    let url = ''
    let title = ''
    if (brief.work_order_id) {
      url = `/work-orders/${brief.work_order_id}`
      title = 'Edit work order'
    } else {
      url = `/buyers/frameworks/${brief.frameworkSlug}/requirements/${flow}/${brief.id}/work-orders/create`
      title = 'Create work order'
    }
    if (!oldWorkOrderCreator) {
      url = `/2/buyer-award/${brief.id}`
      title = 'Download work order'
    }
    return <a href={url}>{title}</a>
  }

  return <span>Create work order</span>
}

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteAlert: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
  }

  handleDeleteBrief(id) {
    this.props.deleteBrief(id)
  }

  toggleDeleteAlert() {
    this.setState(prevState => ({
      showDeleteAlert: !prevState.showDeleteAlert
    }))
  }

  handleDeleteClick(e) {
    e.preventDefault()
    this.setState({
      showDeleteAlert: true
    })
  }

  answerSellerQuestionsRender(brief, isPublished, isClosed) {
    const { isPartOfTeam, isTeamLead, teams } = this.props
    const text = <span>Answer seller questions</span>

    if (!isPublished) {
      return text
    }

    if (brief.status === 'withdrawn' || (isPublished && isClosed)) {
      return (
        <span>
          <Tick className={styles.tick} colour="#17788D" />
          {text}
        </span>
      )
    }

    let url = `${rootPath}/request-access/answer_seller_questions`
    if (hasPermission(isPartOfTeam, isTeamLead, teams, 'answer_seller_questions')) {
      url = `${rootPath}/brief/${brief.id}/questions`
    }
    return <a href={url}>Answer seller questions</a>
  }

  downloadResponsesRender(brief, isPublished, isClosed) {
    const { isPartOfTeam, isTeamLead, teams } = this.props

    if (isPublished && isClosed) {
      let url = `${rootPath}/request-access/download_responses`
      if (hasPermission(isPartOfTeam, isTeamLead, teams, 'download_responses')) {
        url = `${rootPath}/brief/${brief.id}/download-responses`
      }
      return <a href={url}>Download responses</a>
    }

    return <span>Download responses</span>
  }

  render() {
    if (this.props.deleteBriefSuccess) {
      return <Redirect to={`${rootPath}/buyer-dashboard`} />
    }

    const {
      brief,
      briefResponses,
      canCloseOpportunity,
      flow,
      location,
      oldWorkOrderCreator,
      questionsAsked,
      isPartOfTeam,
      isTeamLead,
      teams
    } = this.props

    if (brief && brief.id && brief.dates) {
      const isPublished = brief.dates.published_date && isValid(new Date(brief.dates.published_date))

      const isClosed = brief.status === 'closed'

      const invitedSellers =
        brief.sellers && Object.keys(brief.sellers).length > 0 ? Object.keys(brief.sellers).length : 0

      const questionsAnswered =
        brief.clarificationQuestions && brief.clarificationQuestions.length > 0
          ? brief.clarificationQuestions.length
          : 0

      const briefResponseCount = briefResponses && briefResponses.length > 0 ? briefResponses.length : 0
      const flowName = mapLot(flow).toLowerCase()

      return (
        <div>
          <OverviewHeader
            brief={brief}
            canCloseOpportunity={canCloseOpportunity}
            flowName={flowName}
            handleDeleteClick={this.handleDeleteClick}
            isClosed={isClosed}
            isPublished={isPublished}
            isPartOfTeam={isPartOfTeam}
            isTeamLead={isTeamLead}
            teams={teams}
          />
          {this.state.showDeleteAlert && (
            <div className={styles.deleteAlert}>
              <ConfirmActionAlert
                cancelButtonText="Do not delete"
                confirmButtonText="Yes, delete opportunity"
                content={<p>Are you sure you want to delete this opportunity?</p>}
                handleCancelClick={this.toggleDeleteAlert}
                handleConfirmClick={() => this.handleDeleteBrief(brief.id)}
                type="warning"
              />
            </div>
          )}
          <ul className={styles.overviewList}>
            <li>
              {isPublished ? (
                <span>
                  <Tick className={styles.tick} colour="#17788D" />
                  Create and publish request
                  <div className={styles.stageStatus}>
                    {invitedSellers > 0 && (
                      <span>
                        <a href={`${rootPath}/brief/${brief.id}/invited`}>
                          {invitedSellers} seller{invitedSellers > 1 && `s`} invited
                        </a>
                      </span>
                    )}
                  </div>
                </span>
              ) : (
                <span>
                  {hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts') ||
                  hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') ? (
                    <a href={`${rootPath}/buyer-${flow}/${brief.id}/introduction`}>
                      {brief.title ? 'Edit and publish request' : 'Create and publish request'}
                    </a>
                  ) : (
                    <a href={`${rootPath}/request-access/create_drafts`}>
                      {brief.title ? 'Edit and publish request' : 'Create and publish request'}
                    </a>
                  )}
                </span>
              )}
            </li>
            {brief.status === 'live' && isPublished && (
              <li>
                {hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') ? (
                  <Link
                    to={{
                      pathname: `${rootPath}/brief/${brief.id}/edit`,
                      state: { from: location.pathname }
                    }}
                  >
                    Edit live opportunity
                  </Link>
                ) : (
                  <a href={`${rootPath}/request-access/publish_opportunities`}>Edit live opportunity</a>
                )}
                <div className={styles.stageStatus}>
                  <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View live opportunity</a>
                </div>
              </li>
            )}
            <li>
              {this.answerSellerQuestionsRender(brief, isPublished, isClosed)}
              <div className={styles.stageStatus}>
                {questionsAsked} questions asked, {questionsAnswered} answer{questionsAnswered > 1 && `s`} published
              </div>
            </li>
            {brief.status !== 'withdrawn' && (briefResponseCount > 0 || !isPublished || !isClosed) && (
              <li>
                {this.downloadResponsesRender(brief, isPublished, isClosed)}
                {briefResponseCount > 0 && (
                  <div className={styles.stageStatus}>
                    {flow === 'specialist'
                      ? `${briefResponseCount} candidate${briefResponseCount > 1 ? `s` : ''} submitted`
                      : `${briefResponseCount} seller${briefResponseCount > 1 ? `s` : ''} submitted`}
                  </div>
                )}
              </li>
            )}
            {brief.status !== 'withdrawn' &&
              ['rfx', 'training2', 'specialist'].includes(flow) &&
              (briefResponseCount > 0 || !isPublished || !isClosed) && (
                <li>{createWorkOrderRender(brief, flow, isPublished, isClosed, oldWorkOrderCreator)}</li>
              )}
            {briefResponseCount === 0 && isClosed && <li>No sellers responded</li>}
            {brief.status === 'withdrawn' && <li>Opportunity withdrawn</li>}
          </ul>
        </div>
      )
    }
    return null
  }
}

Overview.defaultProps = {
  location: {},
  oldWorkOrderCreator: true,
  questionsAsked: 0
}

Overview.propTypes = {
  brief: PropTypes.object.isRequired,
  flow: PropTypes.string.isRequired,
  location: PropTypes.object,
  oldWorkOrderCreator: PropTypes.bool,
  questionsAsked: PropTypes.number
}

const mapStateToProps = state => ({
  canCloseOpportunity: state.brief.canCloseOpportunity,
  deleteBriefSuccess: state.brief.deleteBriefSuccess,
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

const mapDispatchToProps = dispatch => ({
  deleteBrief: briefId => dispatch(deleteBrief(briefId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
