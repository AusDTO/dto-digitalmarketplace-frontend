import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AgreementLinks from './AgreementLinks'

const SignedMasterAgreement = () => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      Master agreement accepted
    </AUheading>
    <p>Your authorised representative has accepted the Master Agreement on behalf of your business</p>
    <p>
      <AgreementLinks />
    </p>
  </React.Fragment>
)

export default SignedMasterAgreement
