import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required, validLinks } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';
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
          <h1 tabIndex="-1" ref="header" aria-describedby="header-description">{mode === 'edit' ? 'Edit' : 'Add'} case study</h1>
          <p id="header-description">Show the range of skills and experience you can provide by completing the form below.</p>
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

            <h3>Business approach to {service}</h3>
            <p>Address each of the evaluation criteria for {service} when describing your business’ approach to the project. <a href="#eval-crit" target="_blank">Browse the evaluation criteria for {service}</a>. </p>

            <Textfield
              model={`${model}.roles`}
              name="roles"
              id="roles"
              htmlFor="roles"
              label="What role/s did your business provide?"
              validators={{ required }}
              messages={{
                required: 'You must specify the roles you provided',
              }} />

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
              id="projectLinks"
              model={`${model}.projectLinks`}
              name="projectLinks"
              htmlFor="projectLinks"
              label="Project links (optional)"
              controlProps={{ defaultRows: 2 }}
              description="Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project."
              messages={{ validLinks: 'All links provided must begin with \'http\'' }}
              validators={{ validLinks }}
            />

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
  return {
    returnLink: casestudy.returnLink,
    ...formProps(state, ownProps.formName || 'caseStudyForm'),
    ...ownProps
  }
}

export {
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
