import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
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
import { escapeQuote } from '../helpers'

import styles from './BriefSpecialistResponseForm2.scss'

//make sure to write some tests for this

const BriefSpecialistResponseForm2 = ({
  model,
  brief,
  briefResponses,
  briefResponseSuccess,
  app,
  submitClicked,
  currentlySending,
  handleSubmit,
  setFocus,
  match,
  handleNameSubmit,
  specialistGivenNames,
  specialistSurname,
  specialistNumber,
  addAnotherClicked,
  addAnotherSpecialist,
  uploading,
  loadingText,
  onRateChange,
  fileCount,
  addOtherDocument
}) => (
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {(briefResponseSuccess && !addAnotherSpecialist) || briefResponses.length >= brief.numberOfSuppliers ? (
            <Redirect to={`${match.url}/specialist2/respond/submitted`} />
          ) : (
            ''
          )}
          {!briefResponseSuccess && (
            <ErrorBox
              title="There was a problem submitting your response"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />
          )}
          {!specialistGivenNames && !specialistSurname ? (
            <div>
              {briefResponses.length === 0 && (
                <div>
                  <h1 className="au-display-xl">Apply for &lsquo;{brief.title}&rsquo;</h1>
                  <p>
                    You can submit up to {brief.numberOfSuppliers} candidate
                    {parseInt(brief.numberOfSuppliers, 10) === 1 ? '' : 's'} for this role. This opportunity closes on{' '}
                    {format(new Date(brief.applicationsClosedAt), 'DD-MM-YYYY')}.
                  </p>
                  <br />
                </div>
              )}
              <div className="au-display-lg">
                <strong>Candidate {specialistNumber}</strong>
              </div>
              <span>
                {"Enter the candidate's full legal name as it appears on their driver's licence or passport."}
              </span>
              <Form
                model={model}
                id="briefName"
                onSubmit={data => handleNameSubmit(data.specialistGivenNames, data.specialistSurname)}
              >
                <Textfield
                  model={`${model}.specialistGivenNames`}
                  name="specialistGivenNames"
                  id="specialistGivenNames"
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
                  htmlFor="specialistSurname"
                  label="Surname"
                  validators={{
                    required
                  }}
                  messages={{
                    required: 'Surname is required'
                  }}
                />
                <div className={styles.stepTitle}>
                  Specialist {specialistNumber} of {brief.numberOfSuppliers}
                </div>
                <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
                  <h1 className="au-display-xl">{`${specialistGivenNames} ${specialistSurname}`}</h1>
                  <h2 className="au-display-lg">About</h2>
                  <Textfield
                    model={`${model}.availability`}
                    name="availability"
                    id="availability"
                    htmlFor="availability"
                    label={`Earliest date ${specialistGivenNames} ${specialistSurname} can start`}
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
                          htmlFor="hourRate"
                          label="Hourly rate (including GST)"
                          className={styles.readOnly}
                          readOnly
                          prefix={'$'}
                        />
                      </div>
                    </div>
                  )}
                  {app.supplierCode ? (
                    <FilesInput
                      label="Résumé"
                      hint="Attachments must be PDF or ODT format and a maximum of 5MB"
                      name="attachedDocumentURL"
                      model={`${model}.attachedDocumentURL.0`}
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
                  ) : (
                    <AUpageAlert as="warning" setFocus={setFocus}>
                      <h3 className="au-display-sm">There was a problem loading your details</h3>
                      <p>Only logged in sellers can respond to briefs</p>
                    </AUpageAlert>
                  )}
                  <RadioList
                    id="visaStatus"
                    label={`What is ${specialistGivenNames} ${specialistSurname}'s citizenship status?`}
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
                      required: `"What is ${specialistGivenNames} ${specialistSurname}'s citizenship status?" is a required field`
                    }}
                  />
                  {brief.securityClearance === 'mustHave' && (
                    <RadioList
                      id="securityClearance"
                      label={`Does ${specialistGivenNames} ${specialistSurname} currently hold a 
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
                        required: `${specialistGivenNames} ${specialistSurname}'s security clearance is required`
                      }}
                    />
                  )}
                  <RadioList
                    id="previouslyWorked"
                    label={`Has ${specialistGivenNames} ${specialistSurname} previously worked for the ${brief.organisation}?`}
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
                      required: `"Has ${specialistGivenNames} ${specialistSurname} previously worked for the ${brief.organisation}?" is a required field`
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
                    Other documents (optional)
                  </AUheadings>
                  <p>
                    If requested by the buyer, you can upload additional documents for this candidate. Attachments must
                    be in DOC, DOCX, ODT, PDF, PPT, PPTX, XLS or XLSX format and a maximum size of 5MB.
                  </p>
                  {app.supplierCode &&
                    range(1, fileCount).map(i => (
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
                  {currentlySending || loadingText ? (
                    <LoadingButton text={loadingText || 'Loading'} />
                  ) : (
                    <span>
                      <input
                        className="au-btn right-button-margin"
                        type="submit"
                        value="Submit specialist"
                        onClick={e => {
                          submitClicked(e)
                        }}
                      />
                      {specialistNumber < brief.numberOfSuppliers && (
                        <input
                          className="au-btn au-btn--secondary"
                          type="submit"
                          value="Submit and add another"
                          onClick={e => {
                            addAnotherClicked(e)
                          }}
                        />
                      )}
                    </span>
                  )}
                  {/* Here */}
                </Form>
              </Form>
            </div>
          ) : (
            <div>
              <div className={styles.stepTitle}>
                Specialist {specialistNumber} of {brief.numberOfSuppliers}
              </div>
              <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
                <h1 className="au-display-xl">{`${specialistGivenNames} ${specialistSurname}`}</h1>
                <h2 className="au-display-lg">About</h2>
                <Textfield
                  model={`${model}.availability`}
                  name="availability"
                  id="availability"
                  htmlFor="availability"
                  label={`Earliest date ${specialistGivenNames} ${specialistSurname} can start`}
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
                        htmlFor="hourRate"
                        label="Hourly rate (including GST)"
                        className={styles.readOnly}
                        readOnly
                        prefix={'$'}
                      />
                    </div>
                  </div>
                )}
                {app.supplierCode ? (
                  <FilesInput
                    label="Résumé"
                    hint="Attachments must be PDF or ODT format and a maximum of 5MB"
                    name="attachedDocumentURL"
                    model={`${model}.attachedDocumentURL.0`}
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
                ) : (
                  <AUpageAlert as="warning" setFocus={setFocus}>
                    <h3 className="au-display-sm">There was a problem loading your details</h3>
                    <p>Only logged in sellers can respond to briefs</p>
                  </AUpageAlert>
                )}
                <RadioList
                  id="visaStatus"
                  label={`What is ${specialistGivenNames} ${specialistSurname}'s citizenship status?`}
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
                    required: `"What is ${specialistGivenNames} ${specialistSurname}'s citizenship status?" is a required field`
                  }}
                />
                {brief.securityClearance === 'mustHave' && (
                  <RadioList
                    id="securityClearance"
                    label={`Does ${specialistGivenNames} ${specialistSurname} currently hold a 
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
                      required: `${specialistGivenNames} ${specialistSurname}'s security clearance is required`
                    }}
                  />
                )}
                <RadioList
                  id="previouslyWorked"
                  label={`Has ${specialistGivenNames} ${specialistSurname} previously worked for the ${brief.organisation}?`}
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
                    required: `"Has ${specialistGivenNames} ${specialistSurname} previously worked for the ${brief.organisation}?" is a required field`
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
                  Other documents (optional)
                </AUheadings>
                <p>
                  If requested by the buyer, you can upload additional documents for this candidate. Attachments must be
                  in DOC, DOCX, ODT, PDF, PPT, PPTX, XLS or XLSX format and a maximum size of 5MB.
                </p>
                {app.supplierCode &&
                  range(1, fileCount).map(i => (
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
                {currentlySending || loadingText ? (
                  <LoadingButton text={loadingText || 'Loading'} />
                ) : (
                  <span>
                    <input
                      className="au-btn right-button-margin"
                      type="submit"
                      value="Submit specialist"
                      onClick={e => {
                        submitClicked(e)
                      }}
                    />
                    {specialistNumber < brief.numberOfSuppliers && (
                      <input
                        className="au-btn au-btn--secondary"
                        type="submit"
                        value="Submit and add another"
                        onClick={e => {
                          addAnotherClicked(e)
                        }}
                      />
                    )}
                  </span>
                )}
              </Form>
            </div>
          )}
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefSpecialistResponseForm2.defaultProps = {
  model: '',
  brief: {},
  briefResponses: [],
  briefResponseSuccess: false,
  app: {},
  addAnotherSpecialist: false,
  specialistGivenNames: null,
  specialistSurname: null,
  setFocus: null,
  match: null,
  submitClicked: null,
  handleSubmit: null,
  handleNameSubmit: null,
  specialistNumber: null,
  addAnotherClicked: null,
  uploading: () => null,
  loadingText: null,
  onRateChange: () => null,
  fileCount: 2,
  addOtherDocument: () => null
}

BriefSpecialistResponseForm2.propTypes = {
  model: PropTypes.string.isRequired,
  brief: PropTypes.object.isRequired,
  briefResponses: PropTypes.array.isRequired,
  briefResponseSuccess: PropTypes.bool,
  app: PropTypes.object.isRequired,
  setFocus: PropTypes.func,
  match: PropTypes.object,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleNameSubmit: PropTypes.func,
  specialistGivenNames: PropTypes.string,
  specialistSurname: PropTypes.string,
  specialistNumber: PropTypes.number,
  addAnotherClicked: PropTypes.func,
  addAnotherSpecialist: PropTypes.bool.isRequired,
  uploading: PropTypes.func,
  loadingText: PropTypes.string,
  onRateChange: PropTypes.func,
  fileCount: PropTypes.number,
  addOtherDocument: PropTypes.func
}

export default BriefSpecialistResponseForm2
