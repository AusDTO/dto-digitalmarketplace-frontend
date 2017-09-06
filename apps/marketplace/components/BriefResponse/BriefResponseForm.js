/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import PageAlert from '@gov.au/page-alerts'

import { required, validEmail } from '../../components/validators'
import Layout from '../../components/shared/Layout'
import BaseForm from '../../components/shared/form/BaseForm'
import ErrorBox from '../../components/shared/form/ErrorBox' // eslint-disable-line import/no-named-as-default
import Textfield from '../../components/shared/form/Textfield'
import formProps from '../../components/shared/form/formPropsSelector' // eslint-disable-line import/no-named-as-default
import { handleBriefResponseSubmit } from '../../actions/briefActions'
import Textarea from '../shared/form/Textarea'

class BriefResponse extends BaseForm {
  static propTypes = {
    action: PropTypes.string,
    csrf_token: PropTypes.string,
    form: PropTypes.object.isRequired,
    brief: PropTypes.object,
    errors: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      briefResponseSuccess: null,
      briefResponseMessage: null,
      submitClicked: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.form.valid) {
      if (!nextProps.form.valid) {
        this.setState({
          briefResponseSuccess: null,
          briefResponseMessage: null
        })
      }
    }

    if (this.props.briefResponseSuccess !== nextProps.briefResponseSuccess) {
      this.setState({
        briefResponseSuccess: nextProps.briefResponseSuccess,
        briefResponseMessage: nextProps.isDuplicate
          ? <li>
              <p>
                An account with this email domain already exists. Someone in your team may have already created an
                account with the Marketplace
              </p>
            </li>
          : <li>
              <p>
                The Digital Marketplace encountered an error trying to send your briefResponse email. Please try again
                later or{' '}
                <a href="/contact-us" target="_blank" rel="external">
                  {' '}contact us{' '}
                </a>{' '}
                for assistance.
              </p>
            </li>
      })
    }
  }

  handleSubmit(briefId, model) {
    this.setState({ briefResponseSuccess: null, briefResponseMessage: null })
    this.props.handleBriefResponseSubmit(briefId, model)
  }

  onSubmitFailed() {
    window.scrollTo(0, 0)
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { brief, csrf_token, model, form, children, briefResponseForm } = this.props
    const valid = form.valid
    const { briefResponseSuccess, briefResponseMessage } = this.state

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div>
        {briefResponseSuccess &&
          <div>
            {briefResponseMessage &&
              <PageAlert as="success">
                <h4>Signup email sent</h4>
              </PageAlert>}
            <article role="main">
              <header className="page-heading page-heading-without-breadcrumb">
                <h1>Thanks for responding to a brief on the Digital Marketplace.</h1>
              </header>
              <div>
                <p>
                  An email has been sent to
                  <strong>{briefResponseForm.email_address}</strong> with a copy of your brief response.
                </p>
                <p>
                  If you don’t receive the email within the next 5 minutes or so, check to see if it’s been classified
                  as spam or
                  <a href="/contact-us" target="_blank" rel="external">
                    {' '}contact us{' '}
                  </a>{' '}
                  for assistance.
                </p>
              </div>
            </article>
          </div>}

        <Layout>
          {briefResponseMessage &&
            valid &&
            <PageAlert as="error">
              <h4>Brief response was not sent</h4>
              <ul>
                {briefResponseMessage}
              </ul>
            </PageAlert>}
          <header>
            <h1>
              Apply for &lsquo;{brief.title}&rsquo;
            </h1>
          </header>
          <article role="main">
            <ErrorBox model={model} submitClicked={this.state.submitClicked} setFocus={setFocus} />
            The buyer will compare your response with other seller responses to create a shortlist for the evaluation
            stage. To progress, consider each answer carefully.<br />
            <br />
            As a guide, you could explain:<br />
            <ul>
              <li>what the situation was</li>
              <li>the work the specialist or team completed</li>
              <li>what the results were</li>
            </ul>
            You can reuse examples if you wish.
            <Form
              model={model}
              method="post"
              id="briefResponse"
              onSubmit={data => this.handleSubmit(brief.id, data)}
              onSubmitFailed={this.onSubmitFailed}
            >
              {csrf_token && <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />}
              <h2>Do you have the essential skills and experience?</h2>
              <p>You must have all essential skills and experience to apply for this opportunity.</p>
              {brief.essentialRequirements.map((requirement, i) =>
                <Textarea
                  key={`essentialRequirement.${i}`}
                  model={`${model}.essentialRequirements[${i}]`}
                  name={`essentialRequirement.${i}`}
                  id={`essentialRequirement.${i}`}
                  controlProps={{ limit: 150 }}
                  label={requirement}
                  validators={{ required }}
                  showMessagesDuringFocus
                  messages={{
                    required: `Essential skills and experience are required`
                  }}
                />
              )}

              <h2>Do you have any of the nice-to-have skills and experience?</h2>
              <p>This section is optional but may help your application stand out.</p>
              {brief.niceToHaveRequirements.map((requirement, i) =>
                <Textarea
                  key={`niceToHaveRequirement.${i}`}
                  model={`${model}.niceToHaveRequirements[${i}]`}
                  name={`niceToHaveRequirement.${i}`}
                  id={`niceToHaveRequirement.${i}`}
                  controlProps={{ limit: 150 }}
                  label={requirement}
                />
              )}
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                htmlFor="availability"
                label="When can you start?"
                description="For example: 31/12/2016"
                validators={{
                  required
                }}
                messages={{
                  required: 'Availability is required'
                }}
              />
              <Textfield
                model={`${model}.respondToEmailAddress`}
                name="respondToEmailAddress"
                id="respondToEmailAddress"
                htmlFor="respondToEmailAddress"
                label="Contact email"
                description="All communication about your application will be sent to this address."
                validators={{
                  required,
                  validEmail
                }}
                messages={{
                  required: 'A contact email is required',
                  validEmail: 'A valid contact email is required'
                }}
              />
              {children}

              <p className="uikit-callout">
                <b>Remember</b>
                <br />
                — Only one 1 response per seller is allowed<br />
                — You cannot edit your application after submitting<br />
              </p>
              <input className="uikit-btn" type="submit" value="Submit" onClick={this.onSubmitClicked} />
            </Form>
          </article>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleBriefResponseSubmit: (briefId, model) => dispatch(handleBriefResponseSubmit(briefId, model))
})

const mapStateToProps = state => ({
  ...formProps(state, 'briefResponseForm'),
  brief: state.brief.brief,
  briefResponseSuccess: state.brief.briefResponseSuccess,
  briefResponseErrored: state.brief.briefResponseErrored,
  isDuplicate: state.brief.isDuplicate
})

export { Textfield, mapStateToProps, BriefResponse as Form }

export default connect(mapStateToProps, mapDispatchToProps)(BriefResponse)
