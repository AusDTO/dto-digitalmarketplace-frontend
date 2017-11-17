/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import PageAlert from '@gov.au/page-alerts'

import { loadProfile } from 'orams/actions/profileActions'
import { hideNav } from 'orams/actions/editPriceActions'

import { required, limitNumbers, validLinks, validABN } from 'shared/validators'
import Layout from 'shared/Layout'
import BaseForm from 'shared/form/BaseForm'
import ErrorBox from 'shared/form/ErrorBox'
import Textarea from 'shared/form/Textarea'
import Textfield from 'shared/form/Textfield'
import formProps from 'shared/form/formPropsSelector'
import LoadingButton from 'shared/LoadingButton/LoadingButton'

import './BusinessDetailsForm.scss'

class BusinessDetailsForm extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string
  }

  componentDidMount() {
    this.props.loadProfileData(this.props.form.model)
    this.props.hideNav(null)
  }

  onAdd(e) {
    e.preventDefault()
    const { model, addAddress, businessDetailsForm } = this.props
    addAddress(model, businessDetailsForm.addresses || {})
  }

  onRemove(id, e) {
    e.preventDefault()
    const { model, removeAddress } = this.props
    removeAddress(model, id)
  }

  render() {
    const {
      submitClicked,
      action,
      csrf_token,
      model,
      children,
      handleSubmit,
      businessDetailsForm,
      profileUpdated,
      currentlySending
    } = this.props
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <Layout>
        <header>
          <h1 className="uikit-display-5" tabIndex="-1">
            Check your business details
          </h1>
        </header>
        <article role="main">
          {profileUpdated
            ? <PageAlert as="success">
                <h4>Profile updated</h4>
              </PageAlert>
            : ''}
          <ErrorBox model={model} setFocus={setFocus} submitClicked={submitClicked} />
          <Form
            model={model}
            action={action}
            id="BusinessDetails__create"
            validateOn="submit"
            onSubmit={data => handleSubmit(data)}
          >
            {csrf_token && <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />}

            <Textfield
              model={`${model}.name`}
              name="name"
              id="name"
              htmlFor="name"
              label="Business name"
              validators={{ required }}
              messages={{
                required: 'Business name is required'
              }}
            />

            <Textfield
              model={`${model}.abn`}
              name="abn"
              id="abn"
              htmlFor="abn"
              label="ABN"
              description={<span>You need an Australian Business Number to do business in Australia.</span>}
              messages={{
                validABN: 'ABN is required and must match a valid ABN as listed on the Australian Business Register'
              }}
              validators={{ validABN }}
            />

            <Textarea
              model={`${model}.summary`}
              name="summary"
              id="summary"
              controlProps={{ limit: 50 }}
              label="Summary"
              description="3-4 sentences that describe your business. This can be seen by all government buyers."
              messages={{
                required: 'You must provide a seller summary'
              }}
              validators={{ required }}
            />

            <Textfield
              model={`${model}.website`}
              name="website"
              id="website"
              htmlFor="website"
              label="Website URL"
              description="Provide a link to your website beginning with http"
              messages={{
                required: 'You must provide a website link beginning with http',
                validLinks: 'Links provided must begin with http'
              }}
              validators={{ required, validLinks }}
            />

            <Textfield
              model={`${model}.linkedin`}
              name="linkedin"
              id="linkedin"
              htmlFor="linkedin"
              label="LinkedIn URL (optional)"
              description="Provide a LinkedIn URL beginning with http"
              messages={{
                validLinks: 'Links provided must begin with http'
              }}
              validators={{ validLinks }}
            />

            <Textfield
              model={`${model}.address_address_line`}
              name="address.address_line"
              id="address_line"
              htmlFor="address_line"
              label="Primary Address"
              description="Principal place of business."
              messages={{
                required: 'You must provide an address'
              }}
              validators={{ required }}
            />

            <Textfield
              model={`${model}.address_suburb`}
              name="address.suburb"
              id="suburb"
              htmlFor="suburb"
              label="Suburb"
              messages={{
                required: 'You must provide a suburb'
              }}
              validators={{ required }}
            />
            <Textfield
              model={`${model}.address_state`}
              name="address.state"
              id="state"
              htmlFor="state"
              label="State"
              messages={{
                required: 'You must provide a state'
              }}
              validators={{ required }}
            />
            <Textfield
              model={`${model}.address_postal_code`}
              name="address.postal_code"
              id="postal_code"
              htmlFor="postal_code"
              label="Postcode"
              maxLength="4"
              messages={{
                required: 'You must provide a postal code. ',
                limitNumbers: 'Postal codes must be four digits long and only numbers.'
              }}
              validators={{ required, limitNumbers: limitNumbers(4) }}
            />
            <div>
              {businessDetailsForm.addresses &&
                Object.keys(businessDetailsForm.addresses)
                  .filter(value => {
                    return value > 0 && businessDetailsForm.addresses[value] !== null
                  })
                  .map((key, i) => {
                    return (
                      <div className="address-wrapper" key={key}>
                        <hr className="hr" />
                        <div className="row">
                          <div className="col-xs-8 col-sm-10">
                            <h3 className="uikit-display-3">Additional address</h3>
                          </div>
                          <div className="col-xs-4 col-sm-2">
                            <a href="#" onClick={this.onRemove.bind(this, key)}>
                              Remove
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xs-12 col-sm-10">
                            <Textfield
                              model={`${model}.addresses.${key}.address_line`}
                              name={`address_line-${key}`}
                              id={`address_line-${key}`}
                              htmlFor={`address_line-${key}`}
                              label="Address"
                              messages={{
                                required: 'You must provide address'
                              }}
                              validators={{ required }}
                            />
                            <Textfield
                              model={`${model}.addresses.${key}.suburb`}
                              name={`suburb-${key}`}
                              id={`suburb-${key}`}
                              htmlFor={`suburb-${key}`}
                              label="Suburb"
                              messages={{
                                required: 'You must provide a suburb'
                              }}
                              validators={{ required }}
                            />
                            <Textfield
                              model={`${model}.addresses.${key}.state`}
                              name={`state-${key}`}
                              id={`state-${key}`}
                              htmlFor={`state-${key}`}
                              label="State"
                              messages={{
                                required: 'You must provide a state'
                              }}
                              validators={{ required }}
                            />
                            <Textfield
                              model={`${model}.addresses.${key}.postal_code`}
                              name={`postal_code-${key}`}
                              id={`postal_code-${key}`}
                              htmlFor={`postal_code-${key}`}
                              label="Postcode"
                              maxLength="4"
                              messages={{
                                required: 'You must provide a postal code. ',
                                limitNumbers: 'Postal codes must be four digits long and only numbers.'
                              }}
                              validators={{ required, limitNumbers: limitNumbers(4) }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
            </div>

            {children}

            {currentlySending
              ? <LoadingButton />
              : <button type="submit" className="uikit-btn">
                  Update profile
                </button>}
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'businessDetailsForm'),
    profileUpdated: state.app.profileUpdated,
    currentlySending: state.app.currentlySending
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfileData: form => dispatch(loadProfile(form)),
    hideNav: (bool) => dispatch(hideNav(bool))
  }
}

export { Textfield, mapStateToProps, BusinessDetailsForm as Form }

export default connect(mapStateToProps, mapDispatchToProps)(BusinessDetailsForm)
