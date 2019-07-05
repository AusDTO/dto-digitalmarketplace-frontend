import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import { getResponsesFileSizeAndType } from 'marketplace/components/helpers'
import styles from './BriefDownloadResponses.scss'

export class BriefDownloadResponses extends Component {
  constructor(props) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    setTimeout(() => {
      this.props.reloadBrief()
    }, 500)
  }

  render() {
    if (this.props.briefResponses.length === 0) {
      return (
        <span>
          <AUheading size="xl" level="1">
            This brief has not received any responses.
          </AUheading>
          <p>
            <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
          </p>
        </span>
      )
    }

    if (!this.props.brief.responsesZipFilesize && this.props.brief.lot === 'digital-professionals') {
      return (
        <AUpageAlert as="error">
          <AUheading size="md" level="1">
            This brief does not have a responses file available for download.
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
          {this.props.brief.lot === 'specialist' ? (
            <React.Fragment>
              {this.props.briefResponses.length === 1 && `1 candidate has responded to your opportunity.`}
              {this.props.briefResponses.length > 1 &&
                `${this.props.briefResponses.length} candidates have responded to your opportunity.`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.props.briefResponses.length === 1 && `You've had 1 response to your opportunity.`}
              {this.props.briefResponses.length > 1 &&
                `You've had ${this.props.briefResponses.length} responses to your opportunity.`}
            </React.Fragment>
          )}
          <small className={styles.headingSub}>{this.props.brief.title}</small>
        </AUheading>
        <p>
          <a
            href={`/api/2/brief/${this.props.brief.id}/respond/documents`}
            onClick={this.handleButtonClick}
            rel="noopener noreferrer"
            target="_blank"
            className="au-btn"
          >
            Download responses{' '}
            {getResponsesFileSizeAndType(this.props.brief.responsesZipFilesize, this.props.brief.lot)}
          </a>
        </p>
        <AUheading size="md" level="2">
          Downloaded by:
        </AUheading>
        {this.props.briefResponseDownloaded && (
          <table className={styles.downloadedByTable}>
            <tbody>
              {this.props.briefResponseDownloaded.map(item => (
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
  reloadBrief: () => {}
}

BriefDownloadResponses.propTypes = {
  brief: PropTypes.object.isRequired,
  briefResponses: PropTypes.array.isRequired,
  briefResponseDownloaded: PropTypes.array.isRequired,
  reloadBrief: PropTypes.func
}

export default BriefDownloadResponses
