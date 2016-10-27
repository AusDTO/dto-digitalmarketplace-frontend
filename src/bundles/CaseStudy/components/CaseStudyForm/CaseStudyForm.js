import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Control, actions } from 'react-redux-form';

import { required, validLinks } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import ErrorBox      from '../../../../shared/form/ErrorBox';
import StatefulError from '../../../../shared/form/StatefulError';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';


class CaseStudyForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    returnLink: React.PropTypes.string
  }

  /**
   * We are calling this on `Will` instead of `Did` for server rendering purposes.
   * If there are formErrors available, set the appropriate errors and show them.
   * @return {void}
   */
  componentWillMount() {
    const { dispatch, formErrors, model } = this.props;

    if (!formErrors) {
      return;
    }

    let errors = {};
    Object.keys(formErrors).forEach((key) => {
      errors[key] = {
        valid: false,
        errors: formErrors[key]
      }
    });

    dispatch(actions.setFieldsErrors(model, errors))
    dispatch(actions.setSubmitFailed(model))
  }

  attachNode(node) {
    this._form = ReactDOM.findDOMNode(node);
  }

  handleClick() {
    /**
     * FIXME
     * This is a workaround to complete a normal form submit
     */
    const { form } = this.props;
    if (form.valid) {
      this._form.submit = this.refs.submittable.submit;
      this._form.submit();
    }
  }

  render() {
    const { action, csrf_token, model, form, returnLink, mode } = this.props;
    return (
      <Layout>
        <header>
          <h1>{mode === 'edit' ? 'Edit' : 'Add'} a case study</h1>
          <p>Show the range of skills and experience you can provide by completing the form below.</p>
        </header>
        <article role="main" className="content-main">
          {form.valid === false && form.submitFailed && <ErrorBox focusOnMount={true} />}
          {/*FIXME: this form exists purely to steal its submit method.*/}
          <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
          <Form model={model}
            action={action}
            method="post"
            id="casestudy__create"
            ref={this.attachNode.bind(this)}
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
              label="Project links"
              controlProps={{ defaultRows: 2 }}
              description="Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project."
              messages={{ 
                required: 'You must provide at least one project link.', 
                validLinks: 'All links provided must begin with \'http\'' 
              }}
              validators={{ required, validLinks }}
            />

            <div className="field">
              <Control.checkbox
                model={`${model}.acknowledge`}
                id="acknowledge"
                name="acknowledge"
                validators={{ required }}
              />
              <label htmlFor="acknowledge">I acknowledge this case study may be shared with registered buyers in the Digital Marketplace.</label>
              <StatefulError
                model={`${model}.acknowledge`}
                id="acknowledge"
                messages={{
                  required: 'You must acknowledge this case study will be shared.'
                }}
              />
            </div>

            <input type="submit" value={mode === 'add' ? 'Publish case study' : 'Update case study'} role="button" onClick={this.handleClick.bind(this)} />
          </Form>
          {returnLink && <a href={returnLink}>Return without saving</a>}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const form = state.form.forms.caseStudy.$form;
  return {
    model: 'form.caseStudy',
    formErrors: state.form_options && state.form_options.errors,
    form,
    returnLink: state.casestudy && state.casestudy.returnLink,
    mode: state.form_options.mode || 'add',
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
