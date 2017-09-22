import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import Layout from 'shared/Layout'

import BaseForm from 'shared/form/BaseForm'
import SubmitForm from 'shared/form/SubmitForm'
import ErrorBox from 'shared/form/ErrorBox'
import MultiInput from 'shared/form/MultiInput.js'
import formProps from 'shared/formPropsSelector'
import { loadProfile } from 'orams/actions/profileActions'

class AwardsForm extends BaseForm {
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
            Awards and accreditations
          </h1>
          <p>
            This is your opportunity to share some of the things you are proud of. All questions are optional but can
            help your business attract potential buyers.{' '}
          </p>
        </header>
        <article role="main">
          <ErrorBox model={model} setFocus={setFocus} submitClicked={submitClicked} />
          <Form
            model={model}
            action={action}
            method="post"
            id="Awards__create"
            valid={form.valid}
            component={SubmitForm}
            onSubmit={data => handleSubmit(data)}
          >
            {csrf_token && <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />}

            <MultiInput
              id="certifications"
              model={`${model}.certifications`}
              name="certifications"
              htmlFor="certifications"
              label="Accreditations (optional)"
              controlProps={{ defaultRows: 2 }}
              description="Does your business have any formal accreditations you want to share? "
            />

            <MultiInput
              id="boards"
              model={`${model}.boards`}
              name="boards"
              htmlFor="boards"
              label="Industry engagement (optional)"
              controlProps={{ defaultRows: 2 }}
              description="Are you involved in any boards, committees or groups for your industry?"
            />

            <MultiInput
              id="awards"
              model={`${model}.awards`}
              name="awards"
              htmlFor="awards"
              label="Awards (optional)"
              controlProps={{ defaultRows: 2 }}
              description="Has your work been recognised and awarded within your industry or by others?"
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

AwardsForm.defaultProps = {
  title: 'Awards and accreditations'
}

const mapStateToProps = state => {
  return {
    ...formProps(state, 'awardsForm')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfileData: form => dispatch(loadProfile(form))
  }
}

export { mapStateToProps, AwardsForm as Form }

export default connect(mapStateToProps, mapDispatchToProps)(AwardsForm)
