import React from 'react'
import PropTypes from 'prop-types'

const AgreementLinks = props => (
  <React.Fragment>
    <a
      href={props.pdfUrl ? props.pdfUrl : '/api/2/r/master-agreement-current.pdf'}
      rel="noopener noreferrer"
      target="_blank"
    >
      Download Master Agreement
    </a>
    <br />
    <a
      href={props.htmlUrl ? props.htmlUrl : '/api/2/r/master-agreement-current.html'}
      rel="noopener noreferrer"
      target="_blank"
    >
      View Master Agreement in HTML
    </a>
  </React.Fragment>
)

AgreementLinks.propTypes = {
  htmlUrl: PropTypes.string.isRequired,
  pdfUrl: PropTypes.string.isRequired
}

export default AgreementLinks
