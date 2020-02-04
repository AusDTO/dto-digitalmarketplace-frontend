import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import get from 'lodash/get';
import find from 'lodash/find';
import startCase from 'lodash/startCase';

import { required, validLinks, validPhoneNumber } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';
import StatefulError from '../../../../shared/form/StatefulError';
import AssessmentCriteria from './AssessmentCriteria';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

import domains from '../../../SellerRegistration/components/DomainSelector/domains';

import styles from '../../../SellerRegistration/components/SellerRegistration.css';
import caseStudy from './CaseStudyForm.css'

class CaseStudyForm extends BaseForm {

  static propTypes = {
    action: PropTypes.string,
    form: PropTypes.object.isRequired,
    model: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,

    formErrors: PropTypes.object,
    returnLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    mode: PropTypes.oneOf(['add', 'edit']),
    csrf_token: PropTypes.string,
    serverRender: PropTypes.bool
  }

  render() {
    let {
      action,
      csrf_token,
      model,
      returnLink = null,
      mode,
      form,
      buttonText,
      service,
      service_slug,
      children,
      onSubmit,
      onSubmitFailed,
      isAssessment,
      submitClicked
    } = this.props;

    if (!buttonText) {
      buttonText = mode === 'edit' ? 'Save Changes' : 'Publish Case Study';
    }
      const linkRequiredIfTitle = (vals) => {
          if (!vals) return true;
          let valid = true;
          vals.forEach( (val) => {
              if (!isEmpty(val.title) && isEmpty(val.url)) {
                  valid = false;
              }
          });
          return valid;
      };
    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }
    return (
      <Layout>
        <header>
            {isAssessment ? (
              <div className={styles.content}>
                <h1 className="au-display-xl" styleName="styles.content-heading" tabIndex="-1" ref="header" aria-describedby="header-description">Have you got expertise in {startCase(service)}?</h1>
                <p>Before you can apply for this opportunity you need to provide a case study and reference that meets our <a href={`/assessment-criteria#${service_slug}`} target="_blank" rel="noopener noreferrer">assessment criteria</a>.</p>
                <p><b>If we can confirm your expertise before the opportunity closes we will invite you to apply.</b></p>
                <p>If successful you can apply for {startCase(service)} opportunities in future without the need for further assessment.</p>
              </div>
            ) : (
              <div className={styles.content}>
                <h1 className="au-display-xl" styleName="styles.content-heading" tabIndex="-1" ref="header" aria-describedby="header-description">{mode === 'edit' ? 'Edit' : 'Add'} case study</h1>
                <p id="header-description">
                  Remember, your case study must meet the {service} <a href={`/assessment-criteria#${service_slug}`} target="_blank" rel="noopener noreferrer">assessment criteria</a>.
                  You can update your case studies before an assessment begins.
                  For more about assessments see the <a href="/sellers-guide" target="_blank" rel="noopener noreferrer">seller guide</a>.
                </p>
              </div>
            )}
          <div className="calloutMistake">
            <b> Avoid common mistakes </b>
            <ul className="mistake-list">
              <li>Check the <a href="/assessment-criteria">assessment criteria</a> to ensure the service chosen is a good match for the case study.</li>
              <li>Case studies need to be for the company within the time period the ABN has been registered. Otherwise, state clearly that it was completed by an employee when they worked for another company.</li>
              <li>If using acronyms, their meaning must be written out clearly.</li>
          <li>Check for punctuation, spelling mistakes and grammatical errors.</li>
          <li>Use plain english to explain what you did, with reference to the tools and methodologies you used.</li>
          <li>Case studies should be for one project, not multiple.              </li>
            </ul>
          </div>
        </header>
        <article role="main">
          <ErrorBox submitClicked={submitClicked} model={model} setFocus={setFocus}/>
          <Form model={model}
            action={action}
            method="post"
            id="casestudy__create"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
          >

            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            <Textfield
              model={`${model}.title`}
              name="title"
              id="title"
              htmlFor="title"
              label="Give your case study a title"
              validators={{ required }}
              messages={{
                required: 'Title is required',
              }}
            />

            <Textfield
              model={`${model}.client`}
              name="client"
              id="client"
              htmlFor="client"
              label="Who was the client?"
              validators={{ required }}
              messages={{
                required: 'Client is required',
              }} />

            <Textfield
              model={`${model}.timeframe`}
              name="timeframe"
              id="timeframe"
              htmlFor="timeframe"
              label="What was the time frame?"
              description="For example, January 2016 — June 2016."
              validators={{ required }}
              messages={{
                required: 'Timeframe is required',
              }}
            />

            <Textarea
                model={`${model}.roles`}
                name="roles"
                id="roles"
                htmlFor="roles"
                label="What role did your business play?"
                controlProps={{ limit: 70 }}
                description="For example, ran whole project, engaged in discovery activities or responsible for delivery."
                validators={{ required }}
                messages={{
                    required: 'You must specify the your business\' role',
                }} />

            <Textarea
              model={`${model}.opportunity`}
              name="opportunity"
              id="opportunity"
              controlProps={{ limit: 200 }}
              label="Outline the problem or opportunity"
              description="Describe the project goal and any relevant background information."
              messages={{
                required: 'You must outline the opportunity'
              }}
              validators={{ required }}
            />
            <br/>
            <div className="calloutMistake">

                <b> Avoid common mistakes </b><br/>
              <AssessmentCriteria service_slug={service_slug}/>

            </div>
            <Textarea
              model={`${model}.approach`}
              name="approach"
              id="approach"
              controlProps={{ limit: 200 }}
              label="Describe your approach"
              description="How did your capabilities and methods contribute to achieving the project goals?"
              messages={{
                required: 'You must outline your approach'
              }}
              validators={{ required }}
            />

            <MultiInput
              id="outcome"
              model={`${model}.outcome`}
              name="outcome"
              htmlFor="outcome"
              label="What was the outcome?"
              controlProps={{ defaultRows: 2 }}
              description="List the key achievements of this project."
              messages={{ required: 'You must provide at least one outcome.' }}
              validators={{ required }}
            />

           <MultiInput
              id="project_links"
              model={`${model}.project_links`}
              name="project_links"
              htmlFor="project_links"
              label="Project links (optional)"
              controlProps={{ defaultRows: 2 }}
              description="Link to any supporting material for your case study. This can include a case study on your website, case study video or the live project. Links must begin with http"
              messages={{ validLinks: 'Links must begin with \'http\'' }}
              validators={{ validLinks }}
           />

            <div>
              <h2 className="au-display-lg">Referee</h2>
              <p styleName="caseStudy.referee-summary">Client referee information will only be viewed by evaluators. It will not be published anywhere on the Digital Marketplace.</p>
            </div>
            <div className="calloutMistake">
              <b> Avoid common mistakes </b>
              <ul className="mistake-list">
                <li>A referee's contact details must be supplied for all case studies. If this is not possible, you may need to supply a different case study.</li>
                <li>A referee must be from the client in the case study.</li>
              </ul>
            </div>
            <Textfield
              model={`${model}.referee_name`}
              name="refereeName"
              id="refereeName"
              htmlFor="refereeName"
              label="Referee's name"
              description="The full name of the best person to contact about your experience."
              validators={{ required }}
              messages={{ required: 'Please provide a referee name.'}}
          />

            <Textfield
                model={`${model}.referee_position`}
                name="refereePosition"
                id="refereePosition"
                htmlFor="refereePosition"
                label="Referee's position and employer"
                description="At the time of the project."
                validators={{ required }}
                messages={{ required: 'Please provide a referee position.'}}
            />

            <Textfield
                model={`${model}.referee_email`}
                name="refereeEmail"
                id="refereeEmail"
                htmlFor="refereeEmail"
                label="Referee's phone number"
                description="Please include the area code for landlines."
                validators={{ required, validPhoneNumber }}
                messages={{
                  required: 'Please provide a referee phone number.',
                  validPhoneNumber: 'Referee phone number must be a valid phone number'
                }}
            />

            <div>
              <StatefulError
                model={`${model}.referee_contact`}
                id="refereeContact"
                messages={{
                  required: 'Please acknowledge the referee can be contacted.'
                }}
              />
              <Control.checkbox
                model={`${model}.referee_contact`}
                id="refereeContact"
                name="refereeContact"
                validators={{ required }}
              />
              <label htmlFor="refereeContact">I confirm my referee gives permission to be contacted
                and have their information shared as part of the assessment led by the Digital Transformation Agency.
              </label>
            </div>


            {children}

            <input className="button" type="submit" value={buttonText} />
          </Form>
          {returnLink}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { casestudy = {} } = state;

  let service = ownProps.service;
  let formName = ownProps.formName;
  if (formName && !service) {
    service = get(state, `${formName}.service`);
  }

  if (casestudy.service && !service ) {
    service = casestudy.service;
  }

  let service_slug = '';
  if (find(domains, {'label': service})) {
      service_slug = find(domains, {'label': service})['key'];
  }

  return {
    returnLink: casestudy.returnLink,
    isAssessment: casestudy.is_assessment,
    ...formProps(state, formName || 'caseStudyForm'),
    service,
    service_slug,
    ...ownProps
  }
}

export {
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
