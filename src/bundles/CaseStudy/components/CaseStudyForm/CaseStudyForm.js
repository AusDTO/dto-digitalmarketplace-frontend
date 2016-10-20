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
    <p>{description}</p>
    <Control.text
      model={model}
      name={name}
      id={id}
      type="text"
      validators={validators}
    />
    <Errors
      className="errors"
      model={model}
      show="touched"
      messages={messages}
    />
  </div>
)

class CaseStudyForm extends React.Component {

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
    return (
      <Layout>
        {/*FIXME: this form exists purely to steal its submit method.*/}
        <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
        <Form model="form.caseStudyForm" method="post" ref={this.attachNode.bind(this)}>
          <Textfield
            model="form.caseStudyForm.title"
            name="title"
            id="title"
            htmlFor="title"
            label="Give your case study a title"
            validators={{ required }}
            messages={{
              required: 'Title is required',
            }} />

          <Textfield
            model="form.caseStudyForm.client"
            name="client"
            id="client"
            htmlFor="client"
            label="Who was the client?"
            validators={{ required }}
            messages={{
              required: 'Client is required',
            }} />

          <Textfield
            model="form.caseStudyForm.timeframe"
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
            <p>Describe the project goal and any relevant background information.</p>
            <Control
              model=".opportunity"
              controlProps={{
                limit: 200,
                id: 'opportunity',
                name: 'opportunity'
              }}
              validators={{ required }}
              component={Textarea} />
            <Errors
              className="errors"
              model='form.caseStudyForm.opportunity'
              show="touched"
              messages={{
                required: 'You must outline the opportunity'
              }}
              />
          </div>

          <div className="field">
            <label htmlFor="approach">Describe your approach</label>
            <p>How did your capabilities and methods contribute to achieving the project goals?</p>
            <Control
              model=".approach"
              controlProps={{
                limit: 200,
                id: 'approach',
                name: 'approach'
              }}
              validators={{ required }}
              component={Textarea} />

            <Errors
              className="errors"
              model='form.caseStudyForm.approach'
              show="touched"
              messages={{
                required: 'You must outline your approach'
              }}
              />
          </div>

          <div className="field">
            <label htmlFor="outcome-0">What was the outcome?</label>
            <p>Describe the project goal and any relevant background information.</p>
            <Control
              model=".outcome"
              controlProps={{
                id: 'outcome',
                name: 'outcome'
              }}
              validators={{ minArrayLength: minArrayLength(1) }}
              component={MultiInput} />
            <Errors
              className="errors"
              model='form.caseStudyForm.outcome'
              show="touched"
              messages={{ minArrayLength: 'You must provide at least one outcome.' }}
              />
          </div>

           <div className="field">
            <label htmlFor="links-0">Project links</label>
            <p>Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project.</p>
            <Control
              model=".links"
              controlProps={{
                id: 'links',
                name: 'links'
              }}
              validators={{ minArrayLength: minArrayLength(1) }}
              component={MultiInput} />
            <Errors
              className="errors"
              model='form.caseStudyForm.links'
              show="touched"
              messages={{ minArrayLength: 'You must provide at least one project link.' }}
              />
          </div>

          <div className="field">
            <Control.checkbox
              model=".acknowledge"
              id="acknowledge"
              validators={{ required }}
            />
            <label htmlFor="acknowledge">I acknowledge this case study may be shared with registered buyers in the Digital Marketplace.</label>
            <Errors
              className="errors"
              model='form.caseStudyForm.acknowledge'
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
  const formValid = state.form.forms.caseStudyForm.$form.valid;
  return {
    formValid
  }
}

export {
  Textfield,
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
