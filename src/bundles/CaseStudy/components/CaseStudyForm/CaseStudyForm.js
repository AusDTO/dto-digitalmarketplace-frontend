import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import get from 'lodash/get';

import { required, validLinks } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';
import StatefulError from '../../../../shared/form/StatefulError';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

class CaseStudyForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    model: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]).isRequired,

    formErrors: React.PropTypes.object,
    returnLink: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    mode: React.PropTypes.oneOf(['add', 'edit']),
    csrf_token: React.PropTypes.string,
    serverRender: React.PropTypes.bool
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
      children,
      onSubmit,
    } = this.props;

    if (!buttonText) {
      buttonText = mode === 'edit' ? 'Save Changes' : 'Publish Case Study';
    }

    return (
      <Layout>
        <header>
          <div className="callout--calendar-event">
            <h1 tabIndex="-1" ref="header" aria-describedby="header-description">{mode === 'edit' ? 'Edit' : 'Add'} case study</h1>
            <p id="header-description">
              To be successfully evaluated, your case study must meet the {service} <a href="/evaluation-criteria" target="_blank" rel="external">assessment criteria</a></p>
          </div>    
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model} />
          <Form model={model}
            action={action}
            method="post"
            id="casestudy__create"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
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
              description="For example,  January 2016 — June 2016"
              validators={{ required }}
              messages={{
                required: 'Timeframe is required',
              }}
            />

            <Textfield
                model={`${model}.roles`}
                name="roles"
                id="roles"
                htmlFor="roles"
                label="What role did your business play?"
                description="For example, ran whole project, engaged in discovery activities or responsible for delivery."
                validators={{ required }}
                messages={{
                    required: 'You must specify the roles you provided',
                }} />

            <Textarea
              model={`${model}.opportunity`}
              name="opportunity"
              id="opportunity"
              controlProps={{ limit: 200 }}
              label="Outline the challenge or opportunity"
              description="Describe the project goal and any relevant background information."
              messages={{
                required: 'You must outline the opportunity'
              }}
              validators={{ required }}
            />

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
              description="Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project."
              messages={{ validLinks: 'All links provided must begin with \'http\'' }}
              validators={{ validLinks }}
            />

            <h3>Referee</h3>
            <p>Client referee information will only be viewed by assessors.  It will not be published anywhere on the Digital Marketplace.</p>

            <Textfield
              model={`${model}.referee_name`}
              name="refereeName"
              id="refereeName"
              htmlFor="refereeName"
              label="Referee's name"
              description="The full name of the best person to contact about your experience"
              validators={{ required }}
              messages={{ required: 'Please provide a referee name.'}}
          />
            
            <Textfield
                model={`${model}.referee_position`}
                name="refereePosition"
                id="refereePosition"
                htmlFor="refereePosition"
                label="Referee's position"
                description="At the time of the project"
                validators={{ required }}
                messages={{ required: 'Please provide a referee position.'}}
            />

            <Textfield
                model={`${model}.referee_email`}
                name="refereeEmail"
                id="refereeEmail"
                htmlFor="refereeEmail"
                label="Referee's phone number"
                validators={{ required }}
                messages={{ required: 'Please provide a referee phone number.'}}
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
              <label htmlFor="refereeContact">I confirm my reference gives permission to be contacted and have their information shared as part of the assessment overseen by the Digital Transformation Agency.
              </label>
            </div>


            {children}

            <input type="submit" value={buttonText} role="button" />
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

  return {
    returnLink: casestudy.returnLink,
    ...formProps(state, formName || 'caseStudyForm'),
    service,
    ...ownProps
  }
}

export {
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
