import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBrief } from 'marketplace/actions/briefActions'
import isValid from 'date-fns/is_valid'
import { rootPath } from 'marketplace/routes'
import Tick from 'marketplace/components/Icons/Tick/Tick'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import ClosedDate from 'shared/ClosedDate'
import styles from './BuyerRFXOverview.scss'

const answerSellerQuestionsRender = (brief, isPublished, questionsClosed) => {
  if (!isPublished) {
    return <span>Answer seller questions</span>
  }

  if (isPublished && questionsClosed) {
    return (
      <span>
        <Tick className={styles.tick} colour="#17788D" />
        <span>Answer seller questions</span>
      </span>
    )
  }

  return (
    <a href={`/buyers/frameworks/digital-marketplace/requirements/rfx/${brief.id}/supplier-questions/answer-question`}>
      Answer seller questions
    </a>
  )
}

const downloadResponsesRender = (brief, isPublished, isClosed) => {
  if (isPublished && isClosed) {
    return <a href={`${rootPath}/brief/${brief.id}/download-responses`}>Download responses</a>
  }

  return <span>Download responses</span>
}

const createWorkOrderRender = (brief, isPublished, isClosed) => {
  if (isPublished && isClosed) {
    let url = ''
    let title = ''
    if (brief.work_order_id) {
      url = `/work-orders/${brief.work_order_id}`
      title = 'Edit work order'
    } else {
      url = `/buyers/frameworks/${brief.frameworkSlug}/requirements/rfx/${brief.id}/work-orders/create`
      title = 'Create work order'
    }
    return <a href={url}>{title}</a>
  }

  return <span>Create work order</span>
}

class BuyerRFXOverview extends Component {
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

  render() {
    if (this.props.deleteBriefSuccess) {
      return <Redirect to={`${rootPath}/buyer-dashboard`} />
    }

    const { brief, briefResponses } = this.props

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

      return (
        <div>
          <div className={styles.header}>
            <AUheading size="xl" level="1">
              <small className={styles.briefTitle}>{brief.title || `New RFX request`}</small>
              Overview
            </AUheading>
            <div className={styles.headerMenu}>
              {isPublished &&
                !isClosed && (
                  <div className={styles.headerMenuClosingTime}>
                    Closing{' '}
                    <strong>
                      <ClosedDate countdown date={brief.dates.closing_time} />
                    </strong>
                  </div>
                )}
              <ul>
                {isPublished && (
                  <li>
                    <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
                  </li>
                )}
                {!isPublished && (
                  <li>
                    <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>Preview</a>
                  </li>
                )}
                {!isPublished && (
                  <li>
                    <a href="#delete" onClick={this.handleDeleteClick} className={styles.headerMenuDelete}>
                      Delete draft
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {this.state.showDeleteAlert && (
            <div className={styles.deleteAlert}>
              <AUpageAlert as="warning">
                <p>Are you sure you want to delete this opportunity?</p>
                <AUbutton onClick={() => this.handleDeleteBrief(brief.id)}>Yes, delete opportunity</AUbutton>
                <AUbutton as="secondary" onClick={this.toggleDeleteAlert}>
                  Do not delete
                </AUbutton>
              </AUpageAlert>
            </div>
          )}
          <ul className={styles.overviewList}>
            <li>
              {isPublished ? (
                <span>
                  <Tick className={styles.tick} colour="#17788D" />Create and publish request
                  <div className={styles.stageStatus}>
                    {invitedSellers} seller{invitedSellers > 1 && `s`} invited
                  </div>
                </span>
              ) : (
                <span>
                  <a href={`${rootPath}/buyer-rfx/${brief.id}/introduction`}>
                    {brief.title ? 'Edit and publish request' : 'Create and publish request'}
                  </a>
                </span>
              )}
            </li>
            <li>
              {answerSellerQuestionsRender(brief, isPublished, brief.clarificationQuestionsAreClosed)}
              {questionsAnswered > 0 && (
                <div className={styles.stageStatus}>
                  {questionsAnswered} question{questionsAnswered > 1 && `s`} answered
                </div>
              )}
            </li>
            {(briefResponseCount > 0 || !isPublished || !isClosed) && (
              <li>
                {downloadResponsesRender(brief, isPublished, isClosed)}
                {briefResponseCount > 0 && (
                  <div className={styles.stageStatus}>
                    {briefResponseCount} seller{briefResponseCount > 1 && `s`} responded
                  </div>
                )}
              </li>
            )}
            {(briefResponseCount > 0 || !isPublished || !isClosed) && (
              <li>{createWorkOrderRender(brief, isPublished, isClosed)}</li>
            )}
            {briefResponseCount === 0 && isClosed && <li>No sellers responded</li>}
          </ul>
        </div>
      )
    }
    return null
  }
}

BuyerRFXOverview.propTypes = {
  brief: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  deleteBriefSuccess: state.brief.deleteBriefSuccess
})

const mapDispatchToProps = dispatch => ({
  deleteBrief: briefId => dispatch(deleteBrief(briefId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFXOverview)
