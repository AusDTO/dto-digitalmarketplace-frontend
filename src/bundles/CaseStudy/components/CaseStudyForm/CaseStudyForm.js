import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Control, Errors } from 'react-redux-form';

import { required, minArrayLength } from '../../../../validators';

import Layout from '../../../../shared/Layout';
import Textarea from '../../../../shared/Textarea';
import MultiInput from '../../../../shared/MultiInput';

const Textfield = ({ name, id, htmlFor, label, model, validators, messages, description }) => (
  <div className="field">
    <label htmlFor={htmlFor} className="question-heading">{label}</label>
    {description && (
      <p className="hint">{description}</p>
    )}
    <Errors className="errors validation-message" model={model} show="touched" messages={messages} />
    <Control.text
      model={model}
      name={name}
      id={id}
      type="text"
      validators={validators}
    />
  </div>
)

class CaseStudyForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    formValid: React.PropTypes.bool.isRequired
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
        <Form model="form.caseStudy" action={action} method="post" ref={this.attachNode.bind(this)}>
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
            }} />

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

          <div className="field">
            <label htmlFor="opportunity">Outline the problem or opportunity</label>
            <p className="hint">Describe the project goal and any relevant background information.</p>
            <Errors
              className="errors validation-message"
              model='form.caseStudy.opportunity'
              show="touched"
              messages={{
                required: 'You must outline the opportunity'
              }}
            />
            <Control
              model=".opportunity"
              controlProps={{
                limit: 200,
                id: 'opportunity',
                name: 'opportunity'
              }}
              validators={{ required }}
              component={Textarea}
            />
          </div>

          <div className="field">
            <label htmlFor="approach">Describe your approach</label>
            <p className="hint">How did your capabilities and methods contribute to achieving the project goals?</p>
             <Errors
              className="errors validation-message"
              model='form.caseStudy.approach'
              show="touched"
              messages={{
                required: 'You must outline your approach'
              }}
            />
            <Control
              model=".approach"
              controlProps={{
                limit: 200,
                id: 'approach',
                name: 'approach'
              }}
              validators={{ required }}
              component={Textarea}
            />
          </div>

          <div className="field">
            <label htmlFor="outcome-0">What was the outcome?</label>
            <p className="hint">List the key benefits of this project.</p>
            <Errors
              className="errors validation-message"
              model='form.caseStudy.outcome'
              show="touched"
              messages={{ minArrayLength: 'You must provide at least one outcome.' }}
            />
            <Control
              model=".outcome"
              controlProps={{
                id: 'outcome',
                name: 'outcome'
              }}
              mapProps={{
                rows: (props) => props.viewValue,
                onChange: (props) => props.onChange,
                onBlur: (props) => props.onBlur,
                onFocus: (props) => props.onFocus,
              }}
              validators={{ minArrayLength: minArrayLength(1) }}
              component={MultiInput}
            />
          </div>

           <div className="field">
            <label htmlFor="projectLinks-0">Project links</label>
            <p className="hint">Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project.</p>
            <Errors
              className="errors validation-message"
              model='form.caseStudy.projectLinks'
              show="touched"
              messages={{ minArrayLength: 'You must provide at least one project link.' }}
            />
            <Control
              model=".projectLinks"
              controlProps={{
                id: 'projectLinks',
                name: 'projectLinks'
              }}
              mapProps={{
                rows: (props) => props.viewValue,
                onChange: (props) => props.onChange,
                onBlur: (props) => props.onBlur,
                onFocus: (props) => props.onFocus,
              }}
              validators={{ minArrayLength: minArrayLength(1) }}
              component={MultiInput}
            />
          </div>

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
    formValid,
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
