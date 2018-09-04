import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { required, requiredFile, validEmail, validPercentage } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import FilesInput from 'shared/form/FilesInput'
import Textarea from 'shared/form/Textarea'
import dmapi from 'marketplace/services/apiClient'

import styles from './BriefSpecialistResponseForm.scss'

const MaxSpecialists = 3

const BriefSpecialistResponseForm = ({
  model,
  brief,
  briefResponses,
  briefResponseSuccess,
  app,
  submitClicked,
  handleSubmit,
  setFocus,
  match,
  handleNameSubmit,
  specialistName,
  specialistNumber,
  addAnotherClicked,
  addAnotherSpecialist
}) => (
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {(briefResponseSuccess && !addAnotherSpecialist) || briefResponses.length >= MaxSpecialists ? (
            <Redirect to={`${match.url}/specialist/respond/submitted`} />
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
          {!specialistName ? (
            <div>
              {briefResponses.length === 0 && (
                <div>
                  <h1 className="au-display-xl">Apply for &lsquo;{brief.title}&rsquo;</h1>
                  <p>
                    You can add {MaxSpecialists} specialists. This opportunity closes on{' '}
                    {format(new Date(brief.applicationsClosedAt), 'DD/MM/YYYY')}.
                  </p>
                  <br />
                </div>
              )}
              <div className="au-display-lg">
                <strong>Specialist {specialistNumber}</strong>
              </div>
              <Form model={model} id="briefName" onSubmit={data => handleNameSubmit(data.specialistName)}>
                <Textfield
                  model={`${model}.specialistName`}
                  name="specialistName"
                  id="specialistName"
                  htmlFor="specialistName"
                  label="Full name"
                  validators={{
                    required
                  }}
                  messages={{
                    required: 'A name is required'
                  }}
                />
                <input
                  className="au-btn"
                  type="submit"
                  value={briefResponses.length > 0 ? 'Continue' : 'Start application'}
                />
              </Form>
            </div>
          ) : (
            <div>
              <div className={styles.stepTitle}>
                Specialist {specialistNumber} of {MaxSpecialists}
              </div>
              <h1 className="au-display-xl">{specialistName}</h1>
              <h2 className="au-display-lg">About</h2>
              <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
                <Textfield
                  model={`${model}.availability`}
                  name="availability"
                  id="availability"
                  htmlFor="availability"
                  label={`Earliest date ${specialistName} can start`}
                  maxLength={100}
                  validators={{
                    required
                  }}
                  messages={{
                    required: 'Enter a date for when you can start the project'
                  }}
                  description={`Buyer has requested ${brief.startDate}`}
                />
                <Textfield
                  model={`${model}.dayRate`}
                  name="dayRate"
                  id="dayRate"
                  htmlFor="dayRate"
                  label="Day rate (including GST)"
                  validators={{
                    required,
                    validPercentage
                  }}
                  messages={{
                    required: 'A day rate is required',
                    validPercentage: 'Enter only numbers eg. 600.00'
                  }}
                />
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
                      requiredFile: 'Choose a file for your résumés'
                    }}
                  />
                ) : (
                  <AUpageAlert as="warning" setFocus={setFocus}>
                    <h4 className="au-display-sm">There was a problem loading your details</h4>
                    <p>Only logged in sellers can respond to briefs</p>
                  </AUpageAlert>
                )}
                <h2 className="au-display-lg">Skills and experience</h2>
                {brief.essentialRequirements &&
                  brief.essentialRequirements.map((requirement, i) => (
                    <Textarea
                      key={requirement}
                      model={`${model}.essentialRequirements[${i}]`}
                      name={`essentialRequirement.${i}`}
                      id={`essentialRequirement.${i}`}
                      controlProps={{ limit: 150 }}
                      label={requirement}
                      validators={{ required }}
                      showMessagesDuringFocus
                      messages={{
                        required: `${requirement} is required`
                      }}
                    />
                  ))}
                {brief.niceToHaveRequirements &&
                  brief.niceToHaveRequirements.map((requirement, i) => (
                    <Textarea
                      key={requirement}
                      model={`${model}.niceToHaveRequirements[${i}]`}
                      name={`niceToHaveRequirement.${i}`}
                      id={`niceToHaveRequirement.${i}`}
                      controlProps={{ limit: 150 }}
                      label={`${requirement} (optional)`}
                    />
                  ))}
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
                <input
                  className="au-btn right-button-margin"
                  type="submit"
                  value="Submit specialist"
                  onClick={e => {
                    submitClicked(e)
                  }}
                />
                {specialistNumber < MaxSpecialists && (
                  <input
                    className="au-btn au-btn--secondary"
                    type="submit"
                    value="Submit and add another"
                    onClick={e => {
                      addAnotherClicked(e)
                    }}
                  />
                )}
              </Form>
            </div>
          )}
        </article>
      </div>
    </DocumentTitle>
  </div>
)

BriefSpecialistResponseForm.defaultProps = {
  model: '',
  brief: {},
  briefResponses: [],
  briefResponseSuccess: false,
  app: {},
  addAnotherSpecialist: false,
  specialistName: null,
  setFocus: null,
  match: null,
  submitClicked: null,
  handleSubmit: null,
  handleNameSubmit: null,
  specialistNumber: null,
  addAnotherClicked: null
}

BriefSpecialistResponseForm.propTypes = {
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
  specialistName: PropTypes.string,
  specialistNumber: PropTypes.number,
  addAnotherClicked: PropTypes.func,
  addAnotherSpecialist: PropTypes.bool.isRequired
}

export default BriefSpecialistResponseForm
