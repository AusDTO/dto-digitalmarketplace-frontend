import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AgreementLinks from './AgreementLinks'

const SignedMasterAgreement = props => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      Master agreement accepted
    </AUheading>
    <p>Your authorised representative has accepted the Master Agreement on behalf of your business</p>
    <p>
      <AgreementLinks htmlUrl={props.agreementHtmlUrl} pdfUrl={props.agreementPdfUrl} />
    </p>
  </React.Fragment>
)

SignedMasterAgreement.defaultProps = {
  agreementHtmlUrl: null,
  agreementPdfUrl: null
}

SignedMasterAgreement.propTypes = {
  agreementHtmlUrl: PropTypes.string,
  agreementPdfUrl: PropTypes.string
}

export default SignedMasterAgreement
