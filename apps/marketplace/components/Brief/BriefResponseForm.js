/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { required, validEmail, validPercentage } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import FilesInput from 'shared/form/FilesInput'
import Textarea from 'shared/form/Textarea'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import dmapi from 'marketplace/services/apiClient'

import styles from './BriefResponseForm.scss'

const BriefResponseForm = ({
  model,
  brief,
  briefResponseSuccess,
  app,
  currentlySending,
  submitClicked,
  handleSubmit,
  setFocus,
  match,
  uploading,
  loadingText
}) => (
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {briefResponseSuccess && <Redirect to={`${match.url}/respond/submitted`} />}
          {!briefResponseSuccess && (
            <ErrorBox
              title="There was a problem submitting your response"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />
          )}
          <header className="page-heading page-heading-without-breadcrumb">
            <h1 className="au-display-xl">Apply for &lsquo;{brief.title}&rsquo;</h1>
          </header>
          <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
            {app.supplierCode ? (
              brief.lotSlug &&
              brief.lotSlug === 'digital-professionals' && (
                <FilesInput
                  label="Attach up to 3 resumes"
                  hint="Attachments must be PDF or ODT format and a maximum of 5MB"
                  name="attachedDocumentURL"
                  model={`${model}.attachedDocumentURL.1`}
                  formFields={3}
                  fieldLabel="Upload resume"
                  url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                  api={dmapi}
                  description=""
                  uploading={uploading}
                />
              )
            ) : (
              <AUpageAlert as="warning" setFocus={setFocus}>
                <h4 className="au-display-sm">There was a problem loading your details</h4>
                <p>Only logged in sellers can respond to briefs</p>
              </AUpageAlert>
            )}
            <Textfield
              model={`${model}.availability`}
              name="availability"
              id="availability"
              htmlFor="availability"
              label="When can you start?"
              maxLength={100}
              description={
                brief.lotSlug && brief.lotSlug === 'digital-professionals' ? (
                  <span>
                    The buyer needs this role filled no later than <b>{brief.startDate}</b>
                  </span>
                ) : (
                  <span>
                    The buyer needs this project to start no later than <b>{brief.startDate}</b>
                  </span>
                )
              }
              validators={{
                required
              }}
              messages={{
                required: 'Enter a date for when you can start the project'
              }}
            />
            {brief.lotSlug && brief.lotSlug === 'digital-professionals' && (
              <Textfield
                model={`${model}.dayRate`}
                name="dayRate"
                id="dayRate"
                htmlFor="dayRate"
                label="Day rate"
                description="What is your day rate, including GST?"
                validators={{
                  required,
                  validPercentage
                }}
                messages={{
                  required: 'A day rate is required',
                  validPercentage: 'Enter only numbers eg. 600.00'
                }}
              />
            )}
            <fieldset className={styles.x_uikit_fieldset}>
              <span />
              <h2 className="au-display-lg">Skills and experience?</h2>
              {brief.lotSlug && brief.lotSlug === 'digital-professionals' && (
                <p>Answer the following criteria for all candidates</p>
              )}
              {brief.essentialRequirements &&
                brief.essentialRequirements.map((requirement, i) => (
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
                      required: `This is an essential requirement, let the buyer know how the skills and experience criteria is met`
                    }}
                  />
                ))}
              {brief.niceToHaveRequirements &&
                brief.niceToHaveRequirements.map((requirement, i) => (
                  <Textarea
                    key={`niceToHaveRequirement.${i}`}
                    model={`${model}.niceToHaveRequirements[${i}]`}
                    name={`niceToHaveRequirement.${i}`}
                    id={`niceToHaveRequirement.${i}`}
                    controlProps={{ limit: 150 }}
                    label={`${requirement} (optional)`}
                  />
                ))}
            </fieldset>
            <Textfield
              model={`${model}.respondToEmailAddress`}
              name="respondToEmailAddress"
              id="respondToEmailAddress"
              htmlFor="respondToEmailAddress"
              label="Contact email"
              description="All communication about your application will be sent to this address."
              defaultValue={app.emailAddress}
              validators={{
                required,
                validEmail
              }}
              messages={{
                required: 'A contact email is required',
                validEmail: 'A valid contact email is required'
              }}
            />
            <br />
            <br />
            <div className="au-page-alerts au-page-alerts--warning">
              <h3 className="au-display-md">Once you submit this application:</h3>
              <ul>
                {brief.lotSlug && brief.lotSlug === 'digital-professionals' && (
                  <li>
                    You <b>cannot</b> submit another candidate
                  </li>
                )}
                <li>
                  You <b>cannot</b> edit your application after submitting
                </li>
                <li>
                  The buyer will contact you after <b>{format(new Date(brief.applicationsClosedAt), 'DD/MM/YYYY')}</b>{' '}
                  {brief.lotSlug && brief.lotSlug === 'digital-professionals' ? (
                    <span> if you&apos;re shortlisted for the next stage </span>
                  ) : (
                    <span>to submit your proposal if you&apos;re shortlisted</span>
                  )}
                </li>
              </ul>

              {currentlySending || loadingText ? (
                <LoadingButton text={loadingText || 'Loading'} />
              ) : (
                <p>
                  <input className="au-btn" type="submit" value="Submit application" onClick={submitClicked} />
                </p>
              )}
            </div>
          </Form>
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  loadingText: null
}

BriefResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  loadingText: PropTypes.string
}

export default BriefResponseForm
