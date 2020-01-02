import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { requiredFile, required, validEmail, validPhoneNumber } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import FilesInput from 'shared/form/FilesInput'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import ConfirmActionAlert from 'marketplace/components/Alerts/ConfirmActionAlert'
import range from 'lodash/range'
import dmapi from 'marketplace/services/apiClient'
import { rootPath } from 'marketplace/routes'
import stylesMain from 'marketplace/main.scss'
import styles from './BriefATMResponseForm.scss'
import { escapeQuote } from '../helpers'

export class BriefATMResponseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileCount: 1,
      showDeleteAlert: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
  }

  componentDidMount() {
    this.updateRequiredFileCount()
  }

  updateRequiredFileCount() {
    this.setState(curState => {
      const newState = { ...curState }
      let fileCount = curState.fileCount
      if (this.props.briefResponseForm.attachedDocumentURL.length > fileCount) {
        fileCount = this.props.briefResponseForm.attachedDocumentURL.length
      }
      newState.fileCount = fileCount
      return newState
    })
  }

  addFileField() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.fileCount += 1
      return newState
    })
  }

  briefRequiresDocumentUpload() {
    let mustUpload = false
    if (
      this.props.brief.evaluationType.includes('Case study') ||
      this.props.brief.evaluationType.includes('References') ||
      this.props.brief.evaluationType.includes('Résumés')
    ) {
      mustUpload = true
    }
    return mustUpload
  }

  showRequiredUploadField() {
    let show = false
    if (
      this.props.briefResponseForm.writtenProposal.length > 0 ||
      (this.props.briefResponseForm.writtenProposal.length === 0 && this.props.briefResponseStatus === 'draft')
    ) {
      show = true
    }
    return show
  }

  handleDeleteClick(e) {
    e.preventDefault()
    this.setState({
      showDeleteAlert: true
    })
  }

  toggleDeleteAlert() {
    this.setState(prevState => ({
      showDeleteAlert: !prevState.showDeleteAlert
    }))
  }

  render() {
    const {
      model,
      brief,
      briefResponseSuccess,
      briefResponseSave,
      app,
      currentlySending,
      onSubmitClicked,
      handleSubmit,
      setFocus,
      uploading,
      loadingText,
      briefResponseStatus,
      onSaveClicked,
      briefResponseForm,
      briefResponseId,
      supplierContact
    } = this.props

    return (
      <div className="row">
        <DocumentTitle title="Brief Response - Digital Marketplace">
          <div className="col-sm-push-2 col-sm-8 col-xs-12">
            <article role="main">
              {briefResponseSuccess && !briefResponseSave && (
                <Redirect to={`${rootPath}/brief/${brief.id}/atm/respond/${briefResponseId}/submitted`} />
              )}
              {briefResponseSuccess && briefResponseSave && <Redirect to={`${rootPath}/seller-dashboard`} />}
              {!briefResponseSuccess && (
                <ErrorBox
                  title="There was a problem submitting your response"
                  model={model}
                  onSubmitClicked={onSubmitClicked}
                  setFocus={setFocus}
                />
              )}
              {this.state.showDeleteAlert && (
                <div className={stylesMain.marginBottom2}>
                  <ConfirmActionAlert
                    cancelButtonText="Do not withdraw application"
                    confirmButtonText="Yes, withdraw application"
                    content={
                      <div>
                        <AUheading level="2" size="md">
                          Are you sure?
                        </AUheading>
                        <p>If you withdraw this application, it will be permanently deleted.</p>
                      </div>
                    }
                    handleCancelClick={this.toggleDeleteAlert}
                    handleConfirmClick={() => this.props.onBriefResponseDelete(briefResponseId)}
                    type="warning"
                  />
                </div>
              )}
              <div className={styles.headingArea}>
                <AUheading level="1" size="xl">
                  Apply for &apos;{brief.title}&apos;
                </AUheading>
                {briefResponseStatus === 'submitted' && !this.state.showDeleteAlert && (
                  <input
                    type="button"
                    className={`${styles.withdrawButton} au-btn`}
                    onClick={this.handleDeleteClick}
                    value="Withdraw application"
                  />
                )}
              </div>
              {app.supplierCode ? (
                <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
                  <Textfield
                    model={`${model}.availability`}
                    name="availability"
                    id="availability"
                    htmlFor="availability"
                    defaultValue={briefResponseForm.availability}
                    label="When can you start?"
                    maxLength={100}
                    description={
                      <span>
                        The buyer needs this project to start no later than <b>{brief.startDate}</b>
                      </span>
                    }
                    validators={{
                      required
                    }}
                    messages={{
                      required: 'Enter a date for when you can start the project'
                    }}
                  />
                  <AUheading level="2" size="lg">
                    Response criteria
                  </AUheading>
                  <p>Demonstrate how you meet the buyer&apos;s needs.</p>
                  {brief.evaluationCriteria.map((evaluationCriteria, i) => (
                    <Textarea
                      key={evaluationCriteria.criteria}
                      model={`${model}.criteria['${escapeQuote(evaluationCriteria.criteria)}']`}
                      name={`criteria.${evaluationCriteria.criteria}`}
                      id={`criteria.${i}`}
                      controlProps={{ limit: 500 }}
                      label={evaluationCriteria.criteria}
                      validators={{ required }}
                      showMessagesDuringFocus
                      messages={{
                        required: `The "${evaluationCriteria.criteria}" criteria response is required`
                      }}
                    />
                  ))}
                  {this.showRequiredUploadField() && this.briefRequiresDocumentUpload() && (
                    <React.Fragment>
                      <AUheading level="2" size="lg">
                        Upload documentation
                      </AUheading>
                      <ul>
                        <li>Documents must be in .DOC, .XLS, .PPT, or .PDF format and no more than 50MB.</li>
                        <li>
                          You need to provide:
                          <ul>
                            {brief.evaluationType.map(item => (
                              <span key={item}>
                                {['Case study', 'References', 'Résumés'].includes(item) && <li>{item}</li>}
                              </span>
                            ))}
                          </ul>
                        </li>
                      </ul>
                      <FilesInput
                        label=""
                        fieldLabel="Upload document"
                        name="writtenProposal"
                        model={`${model}.writtenProposal.0`}
                        formFields={1}
                        url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                        api={dmapi}
                        fileId={0}
                        validators={{
                          requiredFile
                        }}
                        messages={{
                          requiredFile: 'You must upload your written proposal'
                        }}
                        uploading={uploading}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      />
                    </React.Fragment>
                  )}
                  <AUheading level="2" size="sm">
                    {this.showRequiredUploadField() ? 'Additional documents (optional)' : 'Attachments'}
                  </AUheading>
                  <p>
                    {this.showRequiredUploadField() && (
                      <span>If requested by the buyer, you can upload additional documents. </span>
                    )}
                    Attachments must be in DOC, DOCX, ODT, PDF, PPT, PPTX, XLS or XLSX format and a maximum size of
                    50MB.
                  </p>
                  {range(this.state.fileCount).map(index => (
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
                  ))}
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
                    description="All communication about your application will be sent to this email."
                    defaultValue={
                      briefResponseForm.respondToEmailAddress
                        ? briefResponseForm.respondToEmailAddress
                        : supplierContact.email
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
                    defaultValue={
                      briefResponseForm.respondToPhone ? briefResponseForm.respondToPhone : supplierContact.phone
                    }
                    label="Phone number"
                    maxLength={100}
                    validators={{
                      required,
                      validPhoneNumber
                    }}
                    messages={{
                      required: 'You must add a phone number',
                      validPhoneNumber: 'You must add a valid phone number'
                    }}
                  />
                  {currentlySending || loadingText ? (
                    <LoadingButton text={loadingText || 'Loading'} />
                  ) : (
                    <p>
                      {briefResponseStatus === 'submitted' && (
                        <input className="au-btn" type="submit" value="Update application" onClick={onSubmitClicked} />
                      )}
                      {briefResponseStatus === 'submitted' && (
                        <a className="au-btn au-btn--tertiary" href={`${rootPath}/seller-dashboard`}>
                          Cancel all updates
                        </a>
                      )}
                      {briefResponseStatus === 'draft' && (
                        <input className="au-btn" type="submit" value="Submit application" onClick={onSubmitClicked} />
                      )}
                      {briefResponseStatus === 'draft' && (
                        <input
                          className="au-btn au-btn--tertiary"
                          type="button"
                          value="Save and return later"
                          onClick={onSaveClicked}
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

BriefATMResponseForm.defaultProps = {
  onSubmitClicked: () => {},
  onBriefResponseDelete: () => {},
  onSaveClicked: () => {},
  handleSubmit: null,
  loadingText: null,
  briefResponseStatus: '',
  briefResponseId: ''
}

BriefATMResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  supplierContact: PropTypes.shape({
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }).isRequired,
  model: PropTypes.string.isRequired,
  onSubmitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  loadingText: PropTypes.string,
  briefResponseStatus: PropTypes.string,
  briefResponseId: PropTypes.string,
  onBriefResponseDelete: PropTypes.func,
  onSaveClicked: PropTypes.func
}

export default BriefATMResponseForm
