/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'

import { required, validEmail, validPercentage } from 'marketplace/components/validators'
import ErrorBox from 'marketplace/components/shared/form/ErrorBox'
import Textfield from 'marketplace/components/shared/form/Textfield'
import FilesInput from 'marketplace/components/shared/form/FilesInput'
import Textarea from 'marketplace/components/shared/form/Textarea'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'

import styles from './BriefResponseForm.scss'

export class BriefResponseForm extends React.Component {
  render() {
    const {
      model,
      brief,
      briefResponseSuccess,
      supplierCode,
      currentlySending,
      submitClicked,
      handleSubmit,
      setFocus
    } = this.props

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            {briefResponseSuccess && <Redirect to={`${this.props.match.url}/respond/submitted`} />}
            {!briefResponseSuccess &&
              <ErrorBox
                title="There was a problem submitting your response"
                model={model}
                submitClicked={submitClicked}
                setFocus={setFocus}
              />}
            <header className="page-heading page-heading-without-breadcrumb">
              <h1>
                Apply for &lsquo;{brief.title}&rsquo;
              </h1>
            </header>
            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              {supplierCode &&
                brief.lotSlug &&
                brief.lotSlug === 'digital-professionals' &&
                <FilesInput
                  label="Attach up to 3 resumes"
                  hint="Attachments must be PDF or ODT format and a maximum of 5MB"
                  name="attachedDocumentURL"
                  model={model}
                  formFields={3}
                  fieldLabel="Upload resume"
                  url={`/brief/${brief.id}/respond/documents/${supplierCode}`}
                />}
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                htmlFor="availability"
                label="When can you start?"
                description={
                  brief.lotSlug && brief.lotSlug === 'digital-professionals'
                    ? <span>
                        The buyer needs this role filled no later than <b>{brief.startDate}</b>
                      </span>
                    : <span>
                        The buyer needs this project to start no later than <b>{brief.startDate}</b>
                      </span>
                }
                validators={{
                  required
                }}
                messages={{
                  required: 'Availability is required'
                }}
              />
              {brief.lotSlug &&
                brief.lotSlug === 'digital-professionals' &&
                <Textfield
                  model={`${model}.dayRate`}
                  name="dayRate"
                  id="dayRate"
                  htmlFor="dayRate"
                  label="Day rate"
                  description="What is your daily rate, including GST?"
                  validators={{
                    required,
                    validPercentage
                  }}
                  messages={{
                    required: 'A day rate is required',
                    validPercentage: 'Enter only numbers eg. 600.00'
                  }}
                />}
              <fieldset className={styles.x_uikit_fieldset}>
                <h2>Skills and experience?</h2>
                {brief.lotSlug &&
                  brief.lotSlug === 'digital-professionals' &&
                  <p>Answer the following criteria for all candidates</p>}
                {brief.essentialRequirements &&
                  brief.essentialRequirements.map((requirement, i) =>
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
                {brief.niceToHaveRequirements &&
                  brief.niceToHaveRequirements.map((requirement, i) =>
                    <Textarea
                      key={`niceToHaveRequirement.${i}`}
                      model={`${model}.niceToHaveRequirements[${i}]`}
                      name={`niceToHaveRequirement.${i}`}
                      id={`niceToHaveRequirement.${i}`}
                      controlProps={{ limit: 150 }}
                      label={`${requirement} (optional)`}
                    />
                  )}
              </fieldset>
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
              <div className="uikit-page-alerts uikit-page-alerts--warning" style={{ marginTop: '3em' }}>
                <h3>Once you submit this application:</h3>
                <ul>
                  {brief.lotSlug &&
                    brief.lotSlug === 'digital-professionals' &&
                    <li>
                      You <b>cannot</b> submit another candidate
                    </li>}
                  <li>
                    You <b>cannot</b> edit your application after submitting
                  </li>
                  <li>
                    The buyer will contact you after <b>
                      {format(new Date(brief.applicationsClosedAt), 'DD/MM/YYYY')}
                    </b>{' '}
                    if you&rapos;re shortlisted for the next stage
                  </li>
                </ul>

                {currentlySending
                  ? <LoadingButton />
                  : <input className="uikit-btn" type="submit" value="Submit application" onClick={submitClicked} />}
              </div>
            </Form>
          </article>
        </div>
      </div>
    )
  }
}

BriefResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null
}

BriefResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default BriefResponseForm
