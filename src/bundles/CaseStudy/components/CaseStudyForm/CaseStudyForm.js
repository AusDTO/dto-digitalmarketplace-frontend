import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Control, Errors, actions } from 'react-redux-form';

import { required, minArrayLength } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import MultiInput from '../../../../shared/form/MultiInput';
import Textarea   from '../../../../shared/form/Textarea';
import Textfield  from '../../../../shared/form/Textfield';

class CaseStudyForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    formValid: React.PropTypes.bool.isRequired
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
    const { formValid } = this.props;
    if (formValid) {
      this._form.submit = this.refs.submittable.submit;
      this._form.submit();  
    }
  }

  render() {
    const { action, csrf_token } = this.props;
    return (
      <Layout>
        {/*FIXME: this form exists purely to steal its submit method.*/}
        <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
        <Form model="form.caseStudy"
          action={action}
          method="post"
          id="casestudy__create"
          ref={this.attachNode.bind(this)}
        >
          {csrf_token && (
            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
          )}

          <Textfield
            model="form.caseStudy.title"
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
            model="form.caseStudy.client"
            name="client"
            id="client"
            htmlFor="client"
            label="Who was the client?"
            validators={{ required }}
            messages={{
              required: 'Client is required',
            }} />

          <Textfield
            model="form.caseStudy.timeframe"
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
            model="form.caseStudy.opportunity"
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
            model="form.caseStudy.approach"
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
            model="form.caseStudy.outcome"
            name="outcome"
            htmlFor="outcome-0"
            label="What was the outcome?"
            description="List the key benefits of this project."
            messages={{ minArrayLength: 'You must provide at least one outcome.' }}
            validators={{ minArrayLength: minArrayLength(1) }}
          />

          <MultiInput
            id="projectLinks"
            model="form.caseStudy.projectLinks"
            name="projectLinks"
            htmlFor="projectLinks-0"
            label="Project links"
            description="Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project."
            messages={{ minArrayLength: 'You must provide at least one project link.' }}
            validators={{ minArrayLength: minArrayLength(1) }}
          />

          <div className="field">
            <Control.checkbox
              model=".acknowledge"
              id="acknowledge"
              name="acknowledge"
              validators={{ required }}
            />
            <label htmlFor="acknowledge">I acknowledge this case study may be shared with registered buyers in the Digital Marketplace.</label>
            <Errors
              className="errors validation-message"
              model='form.caseStudy.acknowledge'
              show="touched"
              messages={{
                required: 'You must acknowledge this case study will be shared.'
              }}
            />
          </div>

          <input type="submit" value="Submit" role="button" onClick={this.handleClick.bind(this)} />
        </Form>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const formValid = state.form.forms.caseStudy.$form.valid;
  return {
    model: 'form.caseStudy',
    formValid,
    formErrors: state.form_options && state.form_options.errors,
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
