import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { requiredFile, required, validEmail } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import FilesInput from 'shared/form/FilesInput'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import dmapi from 'marketplace/services/apiClient'

const BriefRFXResponseForm = ({
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
          {briefResponseSuccess && <Redirect to={`${match.url}/rfx/respond/submitted`} />}
          {!briefResponseSuccess && (
            <ErrorBox
              title="There was a problem submitting your response"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />
          )}
          <AUheading level="1" size="xl">
            Apply for &apos;{brief.title}&apos;
          </AUheading>
          <p>Attachments must be .DOC, .XLS, .PPT or .PDF format and a maximum of 20MB</p>
          {app.supplierCode ? (
            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              {brief.evaluationType.includes('Response template') && (
                <FilesInput
                  label="Response template"
                  fieldLabel="Upload response"
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
                    requiredFile: 'Choose a file for your response'
                  }}
                  uploading={uploading}
                />
              )}
              {brief.evaluationType.includes('Written proposal') && (
                <FilesInput
                  label="Written proposal"
                  hint={`Your proposal must include: ${brief.proposalType.map(type => type.toLowerCase()).join(', ')}`}
                  fieldLabel="Upload written proposal"
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
                    requiredFile: 'Choose a file for your written proposal'
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
              <AUheading level="2" size="lg">
                Once you submit this application
              </AUheading>
              <ul>
                <li>
                  You <strong>cannot</strong> edit your application after submitting.
                </li>
                <li>
                  The buyer will receive your response once the opportunity has closed on{' '}
                  {format(new Date(brief.applicationsClosedAt), 'DD MMMM')}.
                </li>
              </ul>
              {currentlySending || loadingText ? (
                <LoadingButton text={loadingText || 'Loading'} />
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
              <p>Only logged in sellers can respond to opportunities</p>
            </AUpageAlert>
          )}
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefRFXResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  loadingText: null
}

BriefRFXResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  loadingText: PropTypes.string
}

export default BriefRFXResponseForm
