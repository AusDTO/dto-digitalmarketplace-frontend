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
  showTrainerResumes,
  uploading,
  loadingText
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
            Submit a response
          </AUheading>
          {app.supplierCode ? (
            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                htmlFor="availability"
                label="When can you commence work?"
                maxLength={100}
                showCharacterCounter
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
                description="Make sure your proposal shows how you have addressed the buyer's criteria in the brief. This includes: the LDS (if listed), proposed training methods and duration of training."
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
                uploading={uploading}
              />
              <FilesInput
                label="Project costs"
                hint="Attachment must be PDF or ODT format and a maximum of 20MB"
                fieldLabel="Upload project costs"
                description="Project costs could be: preparation, delivery, resources and materials, travel and accommodation. You may also include: hourly rate, day rate or fixed price."
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
                uploading={uploading}
              />
              {showTrainerResumes && (
                <FilesInput
                  label="Trainer résumés"
                  hint="Résumés must be in the one document, must be PDF or ODT format, and a maximum of 20MB"
                  fieldLabel="Upload résumé"
                  description="You will need to submit the résumés of the trainers you have in mind. The Marketplace recommends up to 3 résumés (which you’ll need to upload as one document)."
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
                  uploading={uploading}
                />
              )}
              <Textfield
                model={`${model}.respondToEmailAddress`}
                name="respondToEmailAddress"
                id="respondToEmailAddress"
                htmlFor="respondToEmailAddress"
                label="Contact email"
                maxLength={100}
                showCharacterCounter
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
                showCharacterCounter
                validators={{
                  required,
                  validPhoneNumber
                }}
                messages={{
                  required: 'A contact number is required',
                  validPhoneNumber: 'Your contact number must be a valid phone number'
                }}
              />
              <AUheading level="2" size="xl">
                Once you submit
              </AUheading>
              <ul>
                <li>
                  You <strong>cannot</strong> edit your response once you have submitted.
                </li>
                <li>
                  The buyer will receive your response once the brief has closed on{' '}
                  {format(new Date(brief.applicationsClosedAt), 'dddd D MMMM YYYY')}.
                </li>
              </ul>
              {currentlySending || loadingText ? (
                <LoadingButton text={loadingText || 'Loading'} />
              ) : (
                <p>
                  <input className="au-btn" type="submit" value="Submit response" onClick={submitClicked} />
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
  handleSubmit: null,
  loadingText: null
}

BriefTrainingResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  showTrainerResumes: PropTypes.bool.isRequired,
  loadingText: PropTypes.string
}

export default BriefTrainingResponseForm
