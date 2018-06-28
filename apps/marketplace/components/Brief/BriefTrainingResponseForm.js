import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { required, requiredFile, validEmail, validPhoneNumber } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import FilesInput from 'shared/form/FilesInput'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import dmapi from 'marketplace/services/apiClient'

const BriefTrainingResponseForm = ({
  model,
  brief,
  briefResponseSuccess,
  app,
  currentlySending,
  submitClicked,
  handleSubmit,
  setFocus,
  match,
  showTrainerResumes
}) => (
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {briefResponseSuccess && <Redirect to={`${match.url}/training/respond/submitted`} />}
          {!briefResponseSuccess && (
            <ErrorBox
              title="There was a problem submitting your response"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />
          )}
          <AUheading level="1" size="xxl">
            Apply for {brief.title}
          </AUheading>
          {app.supplierCode ? (
            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                htmlFor="availability"
                label="When can you commence work on the training?"
                maxLength={100}
                showMaxLength
                description={<span>The buyer has requested no later than {brief.startDate}</span>}
                validators={{
                  required
                }}
                messages={{
                  required: 'Enter a date for when you can start the project'
                }}
              />
              <FilesInput
                label="Written proposal"
                hint="Attachment must be PDF or ODT format and a maximum of 20MB"
                fieldLabel="Upload proposal"
                description="Make sure your proposal demonstrates how you have addressed the buyer's criteria in the brief."
                name="attachedDocumentURL"
                model={`${model}.attachedDocumentURL.0`}
                formFields={1}
                url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                api={dmapi}
                fileId={0}
                validators={{
                  requiredFile
                }}
                messages={{
                  requiredFile: 'Choose a file for your written proposal'
                }}
              />
              <FilesInput
                label="Project costs"
                hint="Attachment must be PDF or ODT format and a maximum of 20MB"
                fieldLabel="Upload project costs"
                name="attachedDocumentURL"
                model={`${model}.attachedDocumentURL.1`}
                formFields={1}
                url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                api={dmapi}
                fileId={1}
                validators={{
                  requiredFile
                }}
                messages={{
                  requiredFile: 'Choose a file for your project costs'
                }}
              />
              {showTrainerResumes && (
                <FilesInput
                  label="Trainer résumés"
                  hint="Résumés must be in the one document, must be PDF or ODT format, and a maximum of 20MB"
                  fieldLabel="Upload résumé"
                  name="attachedDocumentURL"
                  model={`${model}.attachedDocumentURL.2`}
                  formFields={1}
                  url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                  api={dmapi}
                  fileId={2}
                  validators={{
                    requiredFile
                  }}
                  messages={{
                    requiredFile: 'Choose a file for your trainer résumés'
                  }}
                />
              )}
              <CheckboxDetailsField
                model={`${model}.hasCitizenship`}
                id="citizenship"
                name="citizenship"
                label="These specialists have Australian Citizenship"
                detailsModel={model}
                messages={{}}
              />
              <Textfield
                model={`${model}.respondToEmailAddress`}
                name="respondToEmailAddress"
                id="respondToEmailAddress"
                htmlFor="respondToEmailAddress"
                label="Contact email"
                maxLength={100}
                showMaxLength
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
              <Textfield
                model={`${model}.respondToPhone`}
                name="respondToPhone"
                id="respondToPhone"
                htmlFor="respondToPhone"
                label="Contact phone number"
                maxLength={100}
                showMaxLength
                validators={{ validPhoneNumber }}
                messages={{
                  validPhoneNumber: 'Your contact number must be a valid phone number'
                }}
              />
              <AUheading level="2" size="xl">
                Once you submit this application
              </AUheading>
              <ul>
                <li>
                  You <strong>cannot</strong> edit your application after submitting.
                </li>
                <li>
                  The buyer will receive your response once the brief has closed on{' '}
                  {format(new Date(brief.applicationsClosedAt), 'DD MMMM')}.
                </li>
              </ul>
              {currentlySending ? (
                <LoadingButton />
              ) : (
                <p>
                  <input className="au-btn" type="submit" value="Submit application" onClick={submitClicked} />
                </p>
              )}
            </Form>
          ) : (
            <AUpageAlert as="error">
              <AUheading level="2" size="md">
                There was a problem loading your details
              </AUheading>
              <p>Only logged in sellers can respond to briefs</p>
            </AUpageAlert>
          )}
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefTrainingResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null
}

BriefTrainingResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  showTrainerResumes: PropTypes.bool.isRequired
}

export default BriefTrainingResponseForm
