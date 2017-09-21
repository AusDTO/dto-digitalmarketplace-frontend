/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import { required, validEmail, validPercentage } from 'marketplace/components/validators'
import ErrorBox from 'marketplace/components/shared/form/ErrorBox'
import Textfield from 'marketplace/components/shared/form/Textfield'
import FilesInput from 'marketplace/components/shared/form/FilesInput'
import Textarea from 'marketplace/components/shared/form/Textarea'
import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'

export class BriefResponseForm extends React.Component {
  render() {
    const {
      model,
      brief,
      briefResponseSuccess,
      supplierCode,
      currentlySending,
      submitClicked,
      handleSubmit,
      setFocus
    } = this.props

    return (
      <div className="row">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <article role="main">
            {briefResponseSuccess && <Redirect to={`${this.props.match.url}/respond/submitted`} />}
            {!briefResponseSuccess &&
              <ErrorBox
                title="There was a problem submitting your response"
                model={model}
                submitClicked={submitClicked}
                setFocus={setFocus}
              />}
            <header className="page-heading page-heading-without-breadcrumb">
              <h1>
                Apply for &lsquo;{brief.title}&rsquo;
              </h1>
            </header>

            <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
              <h2>Do you have the essential skills and experience?</h2>
              <p>You must have all essential skills and experience to apply for this opportunity.</p>
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
                      required: `Essential skills and experience are required`
                    }}
                  />
                )}

              <h2>Do you have any of the nice-to-have skills and experience?</h2>
              <p>This section is optional but may help your application stand out.</p>
              {brief.niceToHaveRequirements &&
                brief.niceToHaveRequirements.map((requirement, i) =>
                  <Textarea
                    key={`niceToHaveRequirement.${i}`}
                    model={`${model}.niceToHaveRequirements[${i}]`}
                    name={`niceToHaveRequirement.${i}`}
                    id={`niceToHaveRequirement.${i}`}
                    controlProps={{ limit: 150 }}
                    label={requirement}
                  />
                )}
              <Textfield
                model={`${model}.availability`}
                name="availability"
                id="availability"
                htmlFor="availability"
                label="When can you start?"
                description="For example: 31/12/2016"
                validators={{
                  required
                }}
                messages={{
                  required: 'Availability is required'
                }}
              />
              <Textfield
                model={`${model}.respondToEmailAddress`}
                name="respondToEmailAddress"
                id="respondToEmailAddress"
                htmlFor="respondToEmailAddress"
                label="Contact email"
                description="All communication about your application will be sent to this address."
                validators={{
                  required,
                  validEmail
                }}
                messages={{
                  required: 'A contact email is required',
                  validEmail: 'A valid contact email is required'
                }}
              />
              {supplierCode &&
                brief.lotSlug &&
                brief.lotSlug === 'digital-professionals' &&
                <span>
                  <Textfield
                    model={`${model}.dayRate`}
                    name="dayRate"
                    id="dayRate"
                    htmlFor="dayRate"
                    label="Day rate"
                    description="What is your daily rate, including GST?"
                    validators={{
                      required,
                      validPercentage
                    }}
                    messages={{
                      required: 'A day rate is required',
                      validPercentage: 'Enter only numbers eg. 600.00'
                    }}
                  />
                  <FilesInput
                    label="Attach a resume"
                    description="Use an Open Document Format (ODF) or PDF/A (eg .pdf, .odt). The maximum file size of each document is 5MB."
                    hint="You can only submit one application per opportunity, however you can upload a maximum of 3 candidate CVs in this application in response to the opportunity requirements."
                    name="attachedDocumentURL"
                    model={model}
                    formFields={3}
                    url={`/brief/${brief.id}/respond/documents/${supplierCode}`}
                  />
                </span>}

              <p className="uikit-page-alerts uikit-page-alerts--info">
                <b>Remember</b>
                <br />
                — Only one 1 response per seller is allowed<br />
                — You cannot edit your application after submitting<br />
              </p>
              <p>
                {currentlySending
                  ? <LoadingButton />
                  : <input className="uikit-btn" type="submit" value="Submit" onClick={submitClicked} />}
              </p>
            </Form>
          </article>
        </div>
      </div>
    )
  }
}

BriefResponseForm.defaultProps = {
  submitClicked: null,
  handleSubmit: null
}

BriefResponseForm.propTypes = {
  brief: PropTypes.shape({
    briefResponseSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  submitClicked: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default BriefResponseForm
