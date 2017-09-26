/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import Layout from 'shared/Layout'

import BaseForm from 'shared/form/BaseForm'
import SubmitForm from 'shared/form/SubmitForm'
import ErrorBox from 'shared/form/ErrorBox'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'shared/validators'
import { loadProfile } from 'orams/actions/profileActions'

class ToolsForm extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    returnLink: PropTypes.string
  }

  componentDidMount() {
    this.props.loadProfileData(this.props.form.model)
  }

  render() {
    const { action, csrf_token, model, form, children, handleSubmit, nextRoute, submitClicked } = this.props
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
            Tools and methodologies
          </h1>
          <p>Enhance your profile and give buyers more ways to find you through keyword search</p>
        </header>
        <article role="main">
          <ErrorBox model={model} setFocus={setFocus} submitClicked={submitClicked} />
          <Form
            model={model}
            action={action}
            method="post"
            id="Tools__create"
            valid={form.valid}
            component={SubmitForm}
            onSubmit={data => handleSubmit(data)}
          >
            {csrf_token && <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />}

            <Textarea
              model={`${model}.tools`}
              name="tools"
              id="tools"
              controlProps={{ limit: 200 }}
              label="Tools"
              description="What delivery management software, tools or other artefacts do you use day-to-day?."
              validators={{ required }}
              showMessagesDuringFocus={true}
              messages={{
                required: `Tools is required`
              }}
            />

            <Textarea
              model={`${model}.methodologies`}
              name="methodologies"
              id="methodologies"
              controlProps={{ limit: 200 }}
              label="Methodologies"
              description="What methodologies form the core of your practice?"
              validators={{ required }}
              showMessagesDuringFocus={true}
              messages={{
                required: `Methodologies is required`
              }}
            />

            <Textarea
              model={`${model}.technologies`}
              name="technologies"
              id="technologies"
              controlProps={{ limit: 200 }}
              label="Technologies (optional)"
              description="What technologies or programming languages do you use?"
              showMessagesDuringFocus={true}
            />
            {children}

            <button type="submit" className="uikit-btn">
              Update profile
            </button>
          </Form>
        </article>
      </Layout>
    )
  }
}

ToolsForm.defaultProps = {
  tools: '',
  methodologies: ''
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'toolsForm')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfileData: form => dispatch(loadProfile(form))
  }
}

export { mapStateToProps, ToolsForm as Form }

export default connect(mapStateToProps, mapDispatchToProps)(ToolsForm)
