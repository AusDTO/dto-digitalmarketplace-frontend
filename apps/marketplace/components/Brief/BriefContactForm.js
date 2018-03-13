/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import DocumentTitle from 'react-document-title'

import Textfield from 'shared/form/Textfield'
import ErrorBox from 'shared/form/ErrorBox'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'
import { required, validEmail } from 'shared/validators'

import styles from './BriefContactForm.scss'

const BriefContactForm = ({
  model,
  setFocus,
  submitClicked,
  currentlySending
}) =>
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <ErrorBox
            title="There was a problem submitting the form"
            model={model}
            submitClicked={submitClicked}
            setFocus={setFocus}
          />
          <div>
            <h1 className="uikit-display-4"><strong>Point of contact</strong></h1>
            <div>The person who receives all communication about this opportunity.</div>
            <Form model={model} id="briefContactForm" onSubmit={data => handleSubmit(data)}>
              <Textfield
                model={`${model}.emailAddress`}
                name="emailAddress"
                id="emailAddress"
                htmlFor="emailAddress"
                label="Email"
                type="email"
                validators={{ required, validEmail }}
                messages={{
                  required: 'Your email is required',
                  validEmail: 'A validly formatted email is required.'
                }}
              />
              {currentlySending
                ? <LoadingButton />
                : <input className="uikit-btn" type="submit" value="Update email" onClick={submitClicked} />}
            </Form>
          </div>
        </article>
      </div>
    </DocumentTitle>
  </div>

export default BriefContactForm
