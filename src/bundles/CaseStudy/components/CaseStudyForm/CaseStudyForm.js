import React from 'react'
import { connect } from 'react-redux'
import { Form, Control, Errors } from 'react-redux-form';

import Layout from '../../../../shared/Layout'
import Textarea from '../../../../shared/Textarea'

const required = (val) => {
  return val && val.length
};
//const maxLength = (len) => (val) => val && val.length <= len;
//const isNumber = (val) => !isNaN(Number(val));

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

const CaseStudyForm = (props) => {
  return (
    <Layout>
    <Form model="form.caseStudyForm" onSubmit={v => console.log(v)}>
      <Textfield
        model="form.caseStudyForm.title"
        name="title"
        id="title"
        htmlFor="title"
        label="Give your case study a title"
        validators={{ required }}
        messages={{
          required: 'Required',
        }} />

      <Textfield
        model="form.caseStudyForm.client"
        name="client"
        id="client"
        htmlFor="client"
        label="Who was the client?"
        validators={{ required }}
        messages={{
          required: 'Required',
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
          required: 'Required',
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
          component={Textarea} />
      </div>

      <div className="field">
        <Control.checkbox
          model=".acknowledge"
          id="acknowledge"
        />
        <label htmlFor="acknowledge">I acknowledge this case study may be shared with registered buyers in the Digital Marketplace.</label>
      </div>

      <p>
        <button type="submit">
          Submit
        </button>

        <Control.reset model="form.caseStudyForm" type="reset">
          Reset
        </Control.reset>
      </p>
    </Form>
    </Layout>
  )
}

export default connect()(CaseStudyForm)
