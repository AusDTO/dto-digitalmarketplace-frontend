import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'

const requiredName = v => required(v.supplier.data.representative)
const requiredEmail = v => required(v.supplier.data.email)
const requiredPhone = v => required(v.supplier.data.phone)

export const done = v => requiredName(v) && requiredEmail(v) && requiredPhone(v)

const SellerEditRepresentativeStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredName,
        requiredEmail,
        requiredPhone
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Authorised representative
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        requiredName: 'Name is required',
        requiredEmail: 'Email is required',
        requiredPhone: 'Phone is required'
      }}
    />
    <Textfield
      model={`${props.model}.supplier.data.representative`}
      label="Name"
      description="The contact listed on your seller profile page and the person who receives new opportunities by email."
      name="representative"
      id="representative"
      htmlFor="representative"
      defaultValue={props[props.model].supplier.data.representative}
      maxLength={100}
      showMaxLength
      validators={{
        required
      }}
    />
    <Textfield
      model={`${props.model}.supplier.data.email`}
      label="Email"
      name="email"
      id="email"
      htmlFor="email"
      defaultValue={props[props.model].supplier.data.email}
      validators={{
        required
      }}
    />
    <Textfield
      model={`${props.model}.supplier.data.phone`}
      label="Phone"
      description="Please include the area code for landlines."
      name="phone"
      id="phone"
      htmlFor="phone"
      defaultValue={props[props.model].supplier.data.phone}
      maxLength={100}
      validators={{
        required
      }}
    />
    {props.formButtons}
  </Form>
)

SellerEditRepresentativeStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerEditRepresentativeStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerEditRepresentativeStage)
