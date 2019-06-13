import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AgreementLinks from './AgreementLinks'

const NewMasterAgreement = props => (
  <React.Fragment>
    <AUheading level="1" size="xl">
      Accept the new Master Agreement from {format(parse(props[props.model].agreementStatus.startDate), 'D MMMM YYYY')}
    </AUheading>
    <p>
      Your authorised representative, {props[props.model].supplier.data.representative}, will be able to accept or
      decline the new Master Agreement on {format(parse(props[props.model].agreementStatus.startDate), 'D MMMM YYYY')}.
    </p>
    <p>We recommend you review the new Master Agreement and circulate to relevant parties before this date.</p>
    <p>
      <AgreementLinks />
    </p>
  </React.Fragment>
)

NewMasterAgreement.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(NewMasterAgreement)
