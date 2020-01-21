import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import DocumentTitle from 'react-document-title'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import range from 'lodash/range'
import { required, requiredFile, validEmail, validPercentage } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import FilesInput from 'shared/form/FilesInput'
import Textarea from 'shared/form/Textarea'
import RadioList from 'shared/form/RadioList'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import dmapi from 'marketplace/services/apiClient'
import { rootPath } from 'marketplace/routes'
import { escapeQuote } from '../helpers'
import { connect } from 'react-redux'

import styles from './BriefSpecialistResponseForm2.scss'

const getCandidateName = formModel => {
  let name = 'the candidate'
  if (formModel.specialistGivenNames && formModel.specialistSurname) {
    name = `${formModel.specialistGivenNames} ${formModel.specialistSurname}`
  }
  return name
}

const showResumeField = (formModel, briefResponseStatus) =>
  formModel.resume.length > 0 || (formModel.resume.length === 0 && briefResponseStatus === 'draft')

const BriefSpecialistResponseForm2 = ({
  briefResponseForm,
  model,
  brief,
  briefResponseStatus,
  briefResponseSuccess,
  app,
  onSubmitClicked,
  onSaveClicked,
  currentlySending,
  handleSubmit,
  setFocus,
  briefResponseId,
  briefResponseSave,
  uploading,
  loadingText,
  onRateChange,
  fileCount,
  addOtherDocument,
  supplierContact
  // isRecruiterFlag
}) => (
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {briefResponseSuccess && briefResponseSave && <Redirect to={`${rootPath}/brief/${brief.id}/responses`} />}
          {briefResponseSuccess && !briefResponseSave && (
            <Redirect to={`${rootPath}/brief/${brief.id}/specialist2/respond/${briefResponseId}/submitted`} />
          )}
          {!briefResponseSuccess && (
            <ErrorBox
              title="There was a problem submitting your response"
              model={model}
              submitClicked={onSubmitClicked}
              setFocus={setFocus}
            />
          )}
          <div>
            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              <h1 className="au-display-xl">
                {briefResponseStatus === 'draft' ? 'Submit' : 'Edit'} candidate for &lsquo;{brief.title}&rsquo;
              </h1>
              <Textfield
                model={`${model}.specialistGivenNames`}
                name="specialistGivenNames"
                id="specialistGivenNames"
                defaultValue={briefResponseForm.specialistGivenNames}
                htmlFor="specialistGivenNames"
                label="Given name(s)"
                validators={{
                  required
                }}
                messages={{
                  required: 'Given name(s) is required'
                }}
              />
              <Textfield
                model={`${model}.specialistSurname`}
                name="specialistSurname"
                id="specialistSurname"
                defaultValue={briefResponseForm.specialistSurname}
                htmlFor="specialistSurname"
                label="Surname"
                validators={{
                  required
                }}
                messages={{
                  required: 'Surname is required'
                }}
              />
              {/* {isRecruiterFlag && ( */}
              {app.isHybridFlag && (
                <RadioList
                  id="candidate"
                  label={`This candidate is a:`}
                  name="candidate"
                  model={`${model}.candidate`}
                  validators={{
                    required
                  }}
                  options={[
                    {
                      label: 'contractor from your recruitment pool',
                      value: 'recruiter'
                    },
                    {
                      label: 'consultant from your company',
                      value: 'consultant'
                    }
                  ]}
                  messages={{ required: 'You must select where the candidate is from' }}
                />
              )}

              <h2 className="au-display-lg">About</h2>
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                defaultValue={briefResponseForm.availability}
                htmlFor="availability"
                label={`Earliest date ${getCandidateName(briefResponseForm)} can start`}
                maxLength={100}
                validators={{
                  required
                }}
                messages={{
                  required: 'Enter a date for when you can start the project'
                }}
                description={`Buyer has requested ${format(parse(brief.startDate), 'DD-MM-YYYY')}`}
              />
              {brief.preferredFormatForRates === 'dailyRate' && (
                <div className="row">
                  <div className="col-sm-6">
                    <Textfield
                      model={`${model}.dayRateExcludingGST`}
                      name="dayRateExcludingGST"
                      id="dayRateExcludingGST"
                      defaultValue={briefResponseForm.dayRateExcludingGST}
                      htmlFor="dayRateExcludingGST"
                      label="Day rate (excluding GST)"
                      validators={{
                        required,
                        validPercentage
                      }}
                      messages={{
                        required: 'Daily rate is required',
                        validPercentage: 'Enter only numbers eg. 600.00'
                      }}
                      prefix={'$'}
                      onChange={data => onRateChange('dayRate', data.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Textfield
                      model={`${model}.dayRate`}
                      name="dayRate"
                      id="dayRate"
                      defaultValue={briefResponseForm.dayRate}
                      htmlFor="dayRate"
                      label="Day rate (including GST)"
                      className={styles.readOnly}
                      readOnly
                      prefix={'$'}
                    />
                  </div>
                </div>
              )}
              {brief.preferredFormatForRates === 'hourlyRate' && (
                <div className="row">
                  <div className="col-sm-6">
                    <Textfield
                      model={`${model}.hourRateExcludingGST`}
                      name="hourRateExcludingGST"
                      id="hourRateExcludingGST"
                      defaultValue={briefResponseForm.hourRateExcludingGST}
                      htmlFor="hourRateExcludingGST"
                      label="Hourly rate (excluding GST)"
                      validators={{
                        required,
                        validPercentage
                      }}
                      messages={{
                        required: 'Hourly rate is required',
                        validPercentage: 'Enter only numbers eg. 600.00'
                      }}
                      onChange={data => onRateChange('hourRate', data.target.value)}
                      prefix={'$'}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Textfield
                      model={`${model}.hourRate`}
                      name="hourRate"
                      id="hourRate"
                      defaultValue={briefResponseForm.hourRate}
                      htmlFor="hourRate"
                      label="Hourly rate (including GST)"
                      className={styles.readOnly}
                      readOnly
                      prefix={'$'}
                    />
                  </div>
                </div>
              )}
              {showResumeField(briefResponseForm, briefResponseStatus) && (
                <FilesInput
                  label="Résumé"
                  hint="Attachments must be PDF or ODT format and a maximum of 5MB"
                  name="resume"
                  model={`${model}.resume.0`}
                  fileId={0}
                  formFields={1}
                  fieldLabel="Upload résumé"
                  url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                  api={dmapi}
                  description=""
                  validators={{
                    requiredFile
                  }}
                  messages={{
                    requiredFile: 'Upload a file for your résumé'
                  }}
                  uploading={uploading}
                />
              )}
              <RadioList
                id="visaStatus"
                label={`What is ${getCandidateName(briefResponseForm)}'s citizenship status?`}
                name="visaStatus"
                model={`${model}.visaStatus`}
                validators={{
                  required
                }}
                options={[
                  {
                    label: 'Australian citizen',
                    value: 'AustralianCitizen'
                  },
                  {
                    label: 'Permanent resident',
                    value: 'PermanentResident'
                  },
                  {
                    label: 'Foreign national with a valid visa',
                    value: 'ForeignNationalWithAValidVisa'
                  }
                ]}
                messages={{
                  required: `"What is ${getCandidateName(briefResponseForm)}'s citizenship status?" is a required field`
                }}
              />
              {brief.securityClearance === 'mustHave' && (
                <RadioList
                  id="securityClearance"
                  label={`Does ${getCandidateName(briefResponseForm)} currently hold a 
                    ${brief.securityClearanceCurrent === 'baseline' ? 'baseline' : ''}
                    ${brief.securityClearanceCurrent === 'nv1' ? 'negative vetting level 1' : ''}
                    ${brief.securityClearanceCurrent === 'nv2' ? 'negative vetting level 2' : ''}
                    ${brief.securityClearanceCurrent === 'pv' ? 'positive vetting' : ''} security clearance?`}
                  name="securityClearance"
                  model={`${model}.securityClearance`}
                  validators={{
                    required
                  }}
                  options={[
                    {
                      label: 'Yes',
                      value: 'Yes'
                    },
                    {
                      label: 'No',
                      value: 'No'
                    }
                  ]}
                  messages={{
                    required: `${getCandidateName(briefResponseForm)}'s security clearance is required`
                  }}
                />
              )}
              <RadioList
                id="previouslyWorked"
                label={`Has ${getCandidateName(briefResponseForm)} previously worked for the ${brief.organisation}?`}
                name="previouslyWorked"
                model={`${model}.previouslyWorked`}
                validators={{
                  required
                }}
                options={[
                  {
                    label: 'Yes',
                    value: 'Yes'
                  },
                  {
                    label: 'No',
                    value: 'No'
                  }
                ]}
                messages={{
                  required: `"Has ${getCandidateName(briefResponseForm)} previously worked for the ${
                    brief.organisation
                  }?" is a required field`
                }}
              />
              <h2 className="au-display-lg">Essential selection criteria</h2>
              {brief.essentialRequirements &&
                brief.essentialRequirements.map((requirement, i) => (
                  <Textarea
                    key={requirement.criteria}
                    model={`${model}.essentialRequirements['${escapeQuote(requirement.criteria)}']`}
                    name={`essentialRequirement.${requirement.criteria}`}
                    id={`essentialRequirement.${i}`}
                    controlProps={{
                      limit: 500,
                      rows: '8'
                    }}
                    label={requirement.criteria}
                    validators={{ required }}
                    showMessagesDuringFocus
                    messages={{
                      required: `${requirement.criteria} is required`
                    }}
                    description={brief.includeWeightingsEssential ? `Weighting: ${requirement.weighting}%` : ''}
                  />
                ))}
              {brief.niceToHaveRequirements && brief.niceToHaveRequirements.length > 0 && (
                <React.Fragment>
                  <h2 className="au-display-lg">Desirable selection criteria</h2>
                  {brief.niceToHaveRequirements.map((requirement, i) => (
                    <Textarea
                      key={requirement.criteria}
                      model={`${model}.niceToHaveRequirements['${escapeQuote(requirement.criteria)}']`}
                      name={`niceToHaveRequirement.${requirement.criteria}`}
                      id={`niceToHaveRequirement.${i}`}
                      controlProps={{
                        limit: 500,
                        rows: '8'
                      }}
                      label={`${requirement.criteria} (optional)`}
                      description={brief.includeWeightingsNiceToHave ? `Weighting: ${requirement.weighting}%` : ''}
                    />
                  ))}
                </React.Fragment>
              )}
              <AUheadings level="2" size="sm">
                {showResumeField(briefResponseForm, briefResponseStatus) ? 'Other documents (optional)' : 'Attachments'}
              </AUheadings>
              <p>
                {showResumeField(briefResponseForm, briefResponseStatus) && (
                  <span>If requested by the buyer, you can upload additional documents for this candidate. </span>
                )}
                Attachments must be in DOC, DOCX, ODT, PDF, PPT, PPTX, XLS or XLSX format and a maximum size of 5MB.
              </p>
              {app.supplierCode &&
                range(fileCount + 1).map(i => (
                  <FilesInput
                    key={i}
                    fileId={i}
                    name="attachedDocumentURL"
                    model={`${model}.attachedDocumentURL.${i}`}
                    formFields={1}
                    fieldLabel="Upload another document"
                    url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                    api={dmapi}
                    description=""
                    validators={{}}
                    messages={{}}
                    uploading={uploading}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt"
                  />
                ))}
              {fileCount < 10 && (
                <p>
                  <a
                    href="#add"
                    onClick={e => {
                      e.preventDefault()
                      addOtherDocument()
                    }}
                  >
                    Add another
                  </a>
                </p>
              )}
              <Textfield
                model={`${model}.respondToEmailAddress`}
                name="respondToEmailAddress"
                id="respondToEmailAddress"
                htmlFor="respondToEmailAddress"
                label="Contact email"
                description="All communication about your application will be sent to this address."
                defaultValue={
                  briefResponseForm.respondToEmailAddress
                    ? briefResponseForm.respondToEmailAddress
                    : supplierContact.email
                }
                validators={{
                  required,
                  validEmail
                }}
                messages={{
                  required: 'A contact email is required',
                  validEmail: 'A valid contact email is required'
                }}
              />
              {currentlySending || loadingText ? (
                <LoadingButton text={loadingText || 'Loading'} />
              ) : (
                <span>
                  <input
                    className="au-btn right-button-margin"
                    type="submit"
                    value={briefResponseStatus === 'submitted' ? 'Update candidate' : 'Submit candidate'}
                    onClick={e => {
                      onSubmitClicked(e)
                    }}
                  />
                  {briefResponseStatus === 'submitted' && (
                    <a className="au-btn au-btn--tertiary" href={`${rootPath}/brief/${brief.id}/responses`}>
                      Cancel all updates
                    </a>
                  )}
                  {briefResponseStatus === 'draft' && (
                    <input
                      className="au-btn au-btn--tertiary"
                      type="button"
                      value="Save and return later"
                      onClick={e => {
                        onSaveClicked(e)
                      }}
                    />
                  )}
                </span>
              )}
            </Form>
          </div>
        </article>
      </div>
    </DocumentTitle>
  </div>
)

const mapStateToProps = state => ({
  isHybridFlag: state.app.isHybridFlag
})

BriefSpecialistResponseForm2.defaultProps = {
  model: '',
  brief: {},
  briefResponseSuccess: false,
  briefResponseStatus: '',
  app: {},
  briefResponseSave: false,
  setFocus: null,
  onSubmitClicked: () => {},
  onSaveClicked: () => {},
  handleSubmit: null,
  uploading: () => null,
  loadingText: null,
  onRateChange: () => null,
  fileCount: 2,
  addOtherDocument: () => null
  // isRecruiterFlag: false
}

BriefSpecialistResponseForm2.propTypes = {
  model: PropTypes.string.isRequired,
  brief: PropTypes.object.isRequired,
  briefResponseSuccess: PropTypes.bool,
  briefResponseStatus: PropTypes.string,
  supplierContact: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  app: PropTypes.object.isRequired,
  setFocus: PropTypes.func,
  onSubmitClicked: PropTypes.func,
  onSaveClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  briefResponseSave: PropTypes.bool,
  uploading: PropTypes.func,
  loadingText: PropTypes.string,
  onRateChange: PropTypes.func,
  fileCount: PropTypes.number,
  addOtherDocument: PropTypes.func
  // isRecruiterFlag:PropTypes.bool
}

export default connect(mapStateToProps)(BriefSpecialistResponseForm2)
