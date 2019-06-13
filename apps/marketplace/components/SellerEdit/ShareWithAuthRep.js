import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { notifyAuthRep } from 'marketplace/actions/sellerEditActions'
import AgreementLinks from './AgreementLinks'

export class ShareWithAuthRep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEmailSent: false,
      buttonDisabled: false,
      emailSendError: false
    }
    this.notifyAuthRep = this.notifyAuthRep.bind(this)
  }

  notifyAuthRep() {
    const data = { ...this.props[this.props.model] }
    this.setState({
      buttonDisabled: true,
      emailSendError: false
    })
    return this.props.notifyAuthRep(data.supplier.code).then(response => {
      if (response.status === 200) {
        this.setState({
          showEmailSent: true
        })
      } else {
        this.setState({
          emailSendError: true
        })
      }
      this.setState({
        buttonDisabled: false
      })
    })
  }

  render() {
    const props = this.props
    const { model } = this.props
    return (
      <React.Fragment>
        {this.state.showEmailSent && (
          <AUpageAlert as="success">
            <AUheading level="1" size="md">
              Email sent
            </AUheading>
            <p
              ref={ref => {
                this.declineAlertRef = ref
              }}
            >
              {`An email has been sent to ${props[model].supplier.data.email}`}
            </p>
            <br />
          </AUpageAlert>
        )}
        {this.state.emailSendError && (
          <AUpageAlert as="error">
            <AUheading level="1" size="md">
              Email not sent
            </AUheading>
            <p>{`An error has occured while sending an email to ${props[model].supplier.data.email}`}</p>
          </AUpageAlert>
        )}
        <AUheading level="1" size="xl">
          Share with authorised representative
        </AUheading>
        <p>
          Only the authorised representative, {props[model].supplier.data.representative}, can accept the Master
          Agreement terms on behalf of {props[model].supplier.name}.
        </p>
        <p>Would you like to send an email to {props[model].supplier.data.email} so they can proceed?</p>
        <p>
          <AUbutton
            disabled={this.state.buttonDisabled}
            onClick={e => {
              e.preventDefault()
              this.notifyAuthRep()
            }}
          >
            Send email to representative
          </AUbutton>
        </p>
        <p>
          <AgreementLinks />
        </p>
      </React.Fragment>
    )
  }
}

ShareWithAuthRep.defaultProps = {}

ShareWithAuthRep.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = dispatch => ({
  notifyAuthRep: supplierCode => dispatch(notifyAuthRep(supplierCode))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareWithAuthRep)
