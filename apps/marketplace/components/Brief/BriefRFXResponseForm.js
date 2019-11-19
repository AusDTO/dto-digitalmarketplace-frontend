import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { requiredFile, required, validEmail, validPhoneNumber } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import FilesInput from 'shared/form/FilesInput'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import range from 'lodash/range'
import dmapi from 'marketplace/services/apiClient'
import { rootPath } from 'marketplace/routes'
import styles from './BriefRFXResponseForm.scss'

export class BriefRFXResponseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileCount: 1
    }
  }

  componentDidMount() {
    this.updateRequiredFileCount()
  }

  // returns the types of evaluations in the brief that require a file upload response
  getBriefEvaluationTypesForUpload() {
    let types = []
    if (this.props.brief && this.props.brief.evaluationType) {
      types = this.props.brief.evaluationType.filter(evaluationType =>
        ['Written proposal', 'Response template'].includes(evaluationType)
      )
    }
    return types
  }

  updateRequiredFileCount() {
    let fileCount = this.getBriefEvaluationTypesForUpload().length + 1
    if (this.props.briefResponseForm.attachedDocumentURL.length > fileCount) {
      fileCount = this.props.briefResponseForm.attachedDocumentURL.length
    }
    this.setState({ fileCount })
  }

  addFileField() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.fileCount += 1
      return newState
    })
  }

  render() {
    const {
      model,
      brief,
      briefResponseSuccess,
      app,
      currentlySending,
      submitClicked,
      handleSubmit,
      setFocus,
      uploading,
      loadingText,
      briefResponseStatus,
      saveClicked,
      briefResponseForm,
      briefResponseId
    } = this.props

    return (
      <div className="row">
        <DocumentTitle title="Brief Response - Digital Marketplace">
          <div className="col-sm-push-2 col-sm-8 col-xs-12">
            <article role="main">
              {briefResponseSuccess && (
                <Redirect to={`${rootPath}/brief/${brief.id}/rfx/respond/${briefResponseId}/submitted`} />
              )}
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
              <p>Attachments must be .DOC, .XLS, .PPT or .PDF format and no more than 20MB</p>
              {app.supplierCode ? (
                <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
                  {this.getBriefEvaluationTypesForUpload().map((evaluationType, index) => {
                    if (evaluationType === 'Written proposal') {
                      return (
                        <FilesInput
                          key={evaluationType}
                          label="Written proposal"
                          hint={`Your proposal must include: ${brief.proposalType
                            .map(type => type.toLowerCase())
                            .join(', ')}`}
                          fieldLabel="Upload written proposal"
                          name="attachedDocumentURL"
                          model={`${model}.attachedDocumentURL.${index}`}
                          formFields={1}
                          url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                          api={dmapi}
                          fileId={index}
                          validators={{
                            requiredFile
                          }}
                          messages={{
                            requiredFile: 'You must upload your written proposal'
                          }}
                          uploading={uploading}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        />
                      )
                    } else if (evaluationType === 'Response template') {
                      return (
                        <FilesInput
                          key={evaluationType}
                          label="Completed response template"
                          fieldLabel="Upload response"
                          name="attachedDocumentURL"
                          model={`${model}.attachedDocumentURL.${index}`}
                          formFields={1}
                          url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                          api={dmapi}
                          fileId={index}
                          validators={{
                            requiredFile
                          }}
                          messages={{
                            requiredFile: 'You must upload your completed response template'
                          }}
                          uploading={uploading}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        />
                      )
                    }
                    return null
                  })}
                  <AUheading level="2" size="sm">
                    Additional documents (optional)
                  </AUheading>
                  <small className={styles.smallText}>
                    If requested by the buyer, you can upload additional documents
                  </small>
                  {this.state.fileCount > 0 &&
                    range(this.state.fileCount - this.getBriefEvaluationTypesForUpload().length).map(i => {
                      const index = this.getBriefEvaluationTypesForUpload().length + i
                      return (
                        <FilesInput
                          key={index}
                          title="Additional documents"
                          fieldLabel="Upload document"
                          name="attachedDocumentURL"
                          model={`${model}.attachedDocumentURL.${index}`}
                          formFields={1}
                          url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                          api={dmapi}
                          fileId={index}
                          uploading={uploading}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        />
                      )
                    })}
                  {this.state.fileCount < 10 && (
                    <p>
                      <a
                        href="#add"
                        onClick={e => {
                          e.preventDefault()
                          this.addFileField()
                        }}
                      >
                        Upload another document
                      </a>
                    </p>
                  )}
                  <Textfield
                    model={`${model}.respondToEmailAddress`}
                    name="respondToEmailAddress"
                    id="respondToEmailAddress"
                    htmlFor="respondToEmailAddress"
                    label="Email"
                    description="All communication about your application will be sent to this address."
                    defaultValue={
                      briefResponseForm.respondToEmailAddress
                        ? briefResponseForm.respondToEmailAddress
                        : app.emailAddress
                    }
                    maxLength={100}
                    validators={{
                      required,
                      validEmail
                    }}
                    messages={{
                      required: 'You must add an email',
                      validEmail: 'You must add a valid email'
                    }}
                  />
                  <Textfield
                    model={`${model}.respondToPhone`}
                    name="respondToPhone"
                    id="respondToPhone"
                    htmlFor="respondToPhone"
                    defaultValue={briefResponseForm.respondToPhone}
                    label="Phone number"
                    maxLength={100}
                    validators={{
                      required,
                      validPhoneNumber
                    }}
                    messages={{
                      required: 'You must add a valid phone number',
                      validPhoneNumber: 'You must add a valid phone number'
                    }}
                  />
                  <AUheading level="2" size="lg">
                    Once you submit this application
                  </AUheading>
                  <ul>
                    <li>You can edit your application after submitting.</li>
                    <li>
                      The buyer will receive your response once the opportunity has closed on{' '}
                      {format(new Date(brief.applicationsClosedAt), 'dddd D MMMM YYYY')}.
                    </li>
                  </ul>
                  {currentlySending || loadingText ? (
                    <LoadingButton text={loadingText || 'Loading'} />
                  ) : (
                    <p>
                      {briefResponseStatus === 'submitted' && (
                        <input className="au-btn" type="submit" value="Update application" onClick={submitClicked} />
                      )}
                      {briefResponseStatus === 'submitted' && (
                        <a
                          className="au-btn au-btn--tertiary"
                          href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}
                        >
                          Cancel all updates
                        </a>
                      )}
                      {briefResponseStatus === 'draft' && (
                        <input className="au-btn" type="submit" value="Submit application" onClick={submitClicked} />
                      )}
                      {briefResponseStatus === 'draft' && (
                        <input
                          className="au-btn au-btn--tertiary"
                          type="button"
                          value="Save and return later"
                          onClick={e => {
                            saveClicked(e)
                          }}
                        />
                      )}
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
  }
}

BriefRFXResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  loadingText: null,
  briefResponseStatus: '',
  briefResponseId: ''
}

BriefRFXResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  loadingText: PropTypes.string,
  briefResponseStatus: PropTypes.string,
  briefResponseId: PropTypes.string
}

export default BriefRFXResponseForm
