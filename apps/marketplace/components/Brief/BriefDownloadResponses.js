import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import { getResponsesFileSizeAndType, hasPermission } from 'marketplace/components/helpers'
import styles from './BriefDownloadResponses.scss'

export class BriefDownloadResponses extends Component {
  constructor(props) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    setTimeout(() => {
      this.props.onDownloadBrief()
    }, 500)
  }

  render() {
    const { brief, briefResponses, briefResponseDownloaded, isPartOfTeam, isTeamLead, mustJoinTeam, teams } = this.props

    if (!isPartOfTeam && mustJoinTeam) {
      return <Redirect to={`${rootPath}/team/join`} />
    }

    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'download_responses')) {
      return <Redirect to={`${rootPath}/request-access/download_responses`} />
    }
    if (briefResponses.length === 0) {
      return (
        <span>
          <AUheading size="xl" level="1">
            This opportunity has not received any responses.
          </AUheading>
          <p>
            <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
          </p>
        </span>
      )
    }

    if (!brief.responsesZipFilesize && brief.lot === 'digital-professionals') {
      return (
        <AUpageAlert as="error">
          <AUheading size="md" level="1">
            This opportunity does not have a responses file available for download.
          </AUheading>
          <p>
            <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
          </p>
        </AUpageAlert>
      )
    }

    return (
      <span>
        <AUheading size="xl" level="1">
          {brief.lot === 'specialist' ? (
            <React.Fragment>
              {briefResponses.length === 1 && `1 candidate has responded to your opportunity.`}
              {briefResponses.length > 1 && `${briefResponses.length} candidates have responded to your opportunity.`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {briefResponses.length === 1 && `You've had 1 response to your opportunity.`}
              {briefResponses.length > 1 && `You've had ${briefResponses.length} responses to your opportunity.`}
            </React.Fragment>
          )}
          <small className={styles.headingSub}>{brief.title}</small>
        </AUheading>
        <p>
          <a
            href={`/api/2/brief/${brief.id}/respond/documents`}
            onClick={this.handleButtonClick}
            rel="noopener noreferrer"
            target="_blank"
            className="au-btn"
          >
            Download responses {getResponsesFileSizeAndType(brief.responsesZipFilesize, brief.lot)}
          </a>
        </p>
        <AUheading size="md" level="2">
          Downloaded by:
        </AUheading>
        {briefResponseDownloaded && (
          <table className={styles.downloadedByTable}>
            <tbody>
              {briefResponseDownloaded.map(item => (
                <tr key={`${item.name}_${item.created_at}`}>
                  <td className={styles.colName}>{item.name}</td>
                  <td className={styles.colDate}>{format(new Date(item.created_at), 'HH:mm DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p>
          <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
        </p>
      </span>
    )
  }
}

BriefDownloadResponses.defaultProps = {
  onDownloadBrief: () => {}
}

BriefDownloadResponses.propTypes = {
  brief: PropTypes.object.isRequired,
  briefResponses: PropTypes.array.isRequired,
  briefResponseDownloaded: PropTypes.array.isRequired,
  onDownloadBrief: PropTypes.func
}

const mapStateToProps = state => ({
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam,
  mustJoinTeam: state.app.mustJoinTeam
})

export default connect(mapStateToProps)(BriefDownloadResponses)
