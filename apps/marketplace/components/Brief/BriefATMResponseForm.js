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
import FilesInput from 'shared/form/FilesInput'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import range from 'lodash/range'
import dmapi from 'marketplace/services/apiClient'
import styles from './BriefATMResponseForm.scss'
import { escapeQuote } from '../helpers'

const briefRequiresDocumentUpload = brief => {
  let mustUpload = false
  if (
    brief.evaluationType.includes('Case study') ||
    brief.evaluationType.includes('References') ||
    brief.evaluationType.includes('Résumés')
  ) {
    mustUpload = true
  }
  return mustUpload
}

export class BriefATMResponseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileCount: 1
    }
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
      match,
      uploading,
      loadingText
    } = this.props

    return (
      <div className="row">
        <DocumentTitle title="Brief Response - Digital Marketplace">
          <div className="col-sm-push-2 col-sm-8 col-xs-12">
            <article role="main">
              {briefResponseSuccess && <Redirect to={`${match.url}/atm/respond/submitted`} />}
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
              {app.supplierCode ? (
                <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
                  <Textfield
                    model={`${model}.availability`}
                    name="availability"
                    id="availability"
                    htmlFor="availability"
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
                  {briefRequiresDocumentUpload(brief) && (
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
                          requiredFile: 'You must upload your written proposal'
                        }}
                        uploading={uploading}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      />
                    </React.Fragment>
                  )}
                  <AUheading level="2" size="sm">
                    Additional documents (optional)
                  </AUheading>
                  <small className={styles.smallText}>
                    If requested by the buyer, you can upload additional documents
                  </small>
                  {range(this.state.fileCount).map(i => {
                    const index = briefRequiresDocumentUpload(brief) ? i + 1 : i
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
                    description="All communication about your application will be sent to this email."
                    defaultValue={app.emailAddress}
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
                  <AUheading level="2" size="lg">
                    Once you submit this application
                  </AUheading>
                  <ul>
                    <li>
                      You <strong>cannot</strong> edit your application after submitting.
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
  }
}

BriefATMResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  loadingText: null
}

BriefATMResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  loadingText: PropTypes.string
}

export default BriefATMResponseForm
