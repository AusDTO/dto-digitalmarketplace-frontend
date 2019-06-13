import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AgreementLinks from './AgreementLinks'

const NewMasterAgreement = props => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      Accept the new Master Agreement from {format(parse(props.startDate), 'D MMMM YYYY')}
    </AUheading>
    <p>
      Your authorised representative, {props.representative}, will be able to accept or decline the new Master Agreement
      on {format(parse(props.startDate), 'D MMMM YYYY')}.
    </p>
    <p>We recommend you review the new Master Agreement and circulate to relevant parties before this date.</p>
    <p>
      <AgreementLinks />
    </p>
  </React.Fragment>
)

NewMasterAgreement.defaultProps = {
  startDate: '',
  representative: ''
}

NewMasterAgreement.propTypes = {
  startDate: PropTypes.string,
  representative: PropTypes.string
}

export default NewMasterAgreement
