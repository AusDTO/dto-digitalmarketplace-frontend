import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class BriefDownloadDocuments extends Component {
  componentDidMount() {
    window.location = `/api/2/brief/${this.props.brief.id}/respond/documents`
  }

  render() {
    return (
      <span>
        <strong>Downloading documents for opportunity &quot;{this.props.brief.title}&quot;... </strong>
      </span>
    )
  }
}

BriefDownloadDocuments.propTypes = {
  brief: PropTypes.object.isRequired
}

export default BriefDownloadDocuments
