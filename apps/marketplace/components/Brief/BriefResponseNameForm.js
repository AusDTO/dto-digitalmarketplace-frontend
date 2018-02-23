/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'
import format from 'date-fns/format'
import DocumentTitle from 'react-document-title'

import PageAlert from '@gov.au/page-alerts'
import { required } from 'marketplace/components/validators'
import ErrorBox from 'shared/form/ErrorBox'
import Textfield from 'shared/form/Textfield'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'

import styles from './BriefResponseNameForm.scss'

const BriefResponseNameForm = ({
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
          <ErrorBox
            title="There was a problem submitting your response"
            model={model}
            submitClicked={submitClicked}
            setFocus={setFocus}
          />
          <div>
            <h1 className="uikit-display-5">Add up to 3 specialists</h1>
            <div>You can withdraw or replace specialists any time before the opportunity closes on {format(new Date(brief.applicationsClosedAt), 'DD/MM/YYYY')}.</div>
            <br/>
            <div className="uikit-display-4"><strong>Specialist {specialistNumber}</strong></div>
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
              {currentlySending
                ? <LoadingButton />
              : <input className="uikit-btn right-button-margin" type="submit" value="Start application" onClick={submitClicked} />}
            </Form>
          </div>
        </article>
      </div>
    </DocumentTitle>
  </div>

BriefResponseNameForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null,
  handleNameSubmit: null,
  specialistName: null
}

BriefResponseNameForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleNameSubmit: PropTypes.func
}

export default BriefResponseNameForm
