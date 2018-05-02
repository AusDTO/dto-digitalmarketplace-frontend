import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

const canDownload = () => {
  const hasDownload = typeof document.createElement('a').download !== 'undefined'
  const hasBlob = typeof window.Blob !== 'undefined'
  const hasObjectURL = typeof window.URL !== 'undefined' && window.URL.createObjectURL !== 'undefined'
  return hasDownload && hasBlob && hasObjectURL
}

export class BriefDownloadDocuments extends Component {
  componentDidMount() {
    this.props.downloadBriefDocuments(this.props.brief.id)
  }

  createDownloadElement() {
    if (canDownload()) {
      const blob = new window.Blob([this.props.briefDocumentsData], { type: 'application/zip' })
      return (
        <a href={window.URL.createObjectURL(blob)} download={`brief-${this.props.brief.id}-resumes.zip`}>
          Download
        </a>
      )
    }

    return (
      <iframe
        src={`/api/2/brief/${this.props.brief.id}/respond/documents`}
        width="0"
        height="0"
        title="document download"
      />
    )
  }

  render() {
    return (
      <span>
        <strong>
          Downloading documents for brief &quot;{this.props.brief.title}&quot;...{' '}
        </strong>
        {this.props.briefDocumentsData ? this.createDownloadElement() : <LoadingIndicatorFullPage />}
      </span>
    )
  }
}

BriefDownloadDocuments.propTypes = {
  brief: PropTypes.object.isRequired,
  downloadBriefDocuments: PropTypes.func.isRequired
}

export default BriefDownloadDocuments
