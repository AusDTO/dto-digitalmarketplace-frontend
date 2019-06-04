import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input'
import MasterAgreement from './MasterAgreement'

export class SellerEditReviewStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acceptEnabled: false
    }
  }

  render() {
    const props = this.props
    const { model, onSubmit } = this.props
    return (
      <Form model={model} onSubmit={onSubmit} validators={{}}>
        <div>
          {!props[model].agreementStatus.canSign && (
            <React.Fragment>
              <AUheading level="1" size="xl">
                Accept the new Master Agreement from{' '}
                {format(parse(props[model].agreementStatus.startDate), 'D MMMM YYYY')}
              </AUheading>
              <p>
                Your authorised representative {props[model].supplier.data.representative} will be able to accept or
                decline the Master Agreement from {format(parse(props[model].agreementStatus.startDate), 'D MMMM YYYY')}.
              </p>
              <p>
                We recommend you view and circulate the new Master Agreement with the relevant parties before this date.
              </p>
              <p>
                <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
                  Download Master Agreement [TODO]
                </a>
                <br />
                <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
                  View Master Agreement in HTML [TODO]
                </a>
              </p>
            </React.Fragment>
          )}
          {props[model].agreementStatus.canSign &&
            !props[model].agreementStatus.canUserSign && (
              <React.Fragment>
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
                    type="submit"
                    onClick={e => {
                      e.preventDefault()
                      // props.onPublish()
                    }}
                  >
                    Send email to representative
                  </AUbutton>
                </p>
                <p>
                  <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
                    Download Master Agreement [TODO]
                  </a>
                  <br />
                  <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
                    View Master Agreement in HTML [TODO]
                  </a>
                </p>
              </React.Fragment>
            )}
          {props[model].agreementStatus.canSign &&
            props[model].agreementStatus.canUserSign && (
              <React.Fragment>
                <AUheading level="1" size="xl">
                  Your declaration
                </AUheading>
                <p>
                  A new Master Agreement takes effect from{' '}
                  {format(parse(props[model].agreementStatus.startDate), 'D MMMM YYYY')}. Your company must accept the
                  new agreement to apply for work through the Digital Marketplace. If you choose to decline, your
                  profile will be removed and you will not be able to apply for work.
                </p>
                <p>
                  <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
                    Download Master Agreement [TODO]
                  </a>
                  <br />
                  <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
                    View Master Agreement in HTML [TODO]
                  </a>
                </p>
                <MasterAgreement />
                <p>
                  <AUcheckbox
                    id="cb-declaration"
                    onClick={e => {
                      this.setState({
                        acceptEnabled: e.target.checked
                      })
                    }}
                    label={`I am ${props[model].supplier.data.representative}, an authorised representativee of (ABN: ${
                      props[model].supplier.abn
                    }) and I agree to the terms set out in the Marketplace Master Agreement.`}
                  />
                </p>
                <p>
                  <AUbutton
                    type="submit"
                    disabled={!this.state.acceptEnabled}
                    onClick={e => {
                      e.preventDefault()
                      // props.onPublish()
                    }}
                  >
                    Accept
                  </AUbutton>
                  <AUbutton
                    type="submit"
                    as="secondary"
                    onClick={e => {
                      e.preventDefault()
                      // props.onPublish()
                    }}
                  >
                    Decline
                  </AUbutton>
                </p>
              </React.Fragment>
            )}
        </div>
      </Form>
    )
  }
}

SellerEditReviewStage.defaultProps = {
  onSubmit: () => {},
  stagesTodo: []
}

SellerEditReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerEditReviewStage)
