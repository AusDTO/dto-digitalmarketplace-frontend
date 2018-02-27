/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'

import PageAlert from '@gov.au/page-alerts'
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
  handleNameSubmit,
  specialistName,
  specialistNumber,
  addAnotherClicked,
  addAnotherSpecialist
}) =>
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          {briefResponseSuccess && !addAnotherSpecialist ? <Redirect to={`${match.url}/respond/submitted`} /> : ''}
          {!briefResponseSuccess &&
            <ErrorBox
              title="There was a problem submitting your response"
              model={model}
              submitClicked={submitClicked}
              setFocus={setFocus}
            />}

          <div>
            <div className={styles.stepTitle}>Specialist {specialistNumber} of 3</div>
            <h1 className="uikit-display-6">{specialistName}</h1>
            <div className="uikit-display-5">
              About
            </div>
            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                htmlFor="availability"
                label="Earliest start date"
                maxLength={100}
                description={
                  <span>
                    Preferred start date is <b>{brief.startDate}</b>
                  </span>
                }
                validators={{
                  required
                }}
                messages={{
                  required: 'Enter a date for when you can start the project'
                }}
              />
              {brief.lotSlug &&
                brief.lotSlug === 'digital-professionals' &&
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
                />}
              {app.supplierCode
                ? brief.lotSlug &&
                  brief.lotSlug === 'digital-professionals' &&
                  <FilesInput
                    label="Resume"
                    hint="Attachments must be PDF or ODT format and a maximum of 5MB"
                    name="attachedDocumentURL"
                    model={model}
                    formFields={1}
                    fieldLabel="Upload resume"
                    url={`/brief/${brief.id}/respond/documents/${app.supplierCode}`}
                    api={dmapi}
                    description=""
                  />
                : <PageAlert as="warning" setFocus={setFocus}>
                    <h4>There was a problem loading your details</h4>
                    <p>Only logged in sellers can respond to briefs</p>
                  </PageAlert>}
              <fieldset className={styles.x_uikit_fieldset}>
                <h2>Skills and experience?</h2>
                {brief.lotSlug &&
                  brief.lotSlug === 'digital-professionals' &&
                  <p>Answer the following criteria for all candidates</p>}
                {brief.essentialRequirements &&
                  brief.essentialRequirements.map((requirement, i) =>
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
                  )}
                {brief.niceToHaveRequirements &&
                  brief.niceToHaveRequirements.map((requirement, i) =>
                    <Textarea
                      key={`niceToHaveRequirement.${i}`}
                      model={`${model}.niceToHaveRequirements[${i}]`}
                      name={`niceToHaveRequirement.${i}`}
                      id={`niceToHaveRequirement.${i}`}
                      controlProps={{ limit: 150 }}
                      label={`${requirement} (optional)`}
                    />
                  )}
              </fieldset>
              {currentlySending
                ? <LoadingButton />
              : <input className="uikit-btn right-button-margin" type="submit" value="Submit specialist" onClick={submitClicked} />}
              {currentlySending
                ? <LoadingButton />
              : <div className="uikit-btn uikit-btn--tertiary" onClick={addAnotherClicked(true)}>Submit and add another</div>}
            </Form>
          </div>

        </article>
      </div>
    </DocumentTitle>
  </div>

BriefResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  handleNameSubmit: null,
  specialistName: null
}

BriefResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleNameSubmit: PropTypes.func
}

export default BriefResponseForm
