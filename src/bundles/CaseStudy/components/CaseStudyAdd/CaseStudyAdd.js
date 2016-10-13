import React from 'react'
import { Field, reduxForm } from 'redux-form'

const submit = () => {}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const CaseStudyAdd = ({ error, handleSubmit, pristine, reset, submitting }) => {
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="password" type="password" component={renderField} label="Password"/>
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>Log In</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'caseStudyAdd'
})(CaseStudyAdd)
//export default connect(mapStateToProps)(CaseStudyAdd)
