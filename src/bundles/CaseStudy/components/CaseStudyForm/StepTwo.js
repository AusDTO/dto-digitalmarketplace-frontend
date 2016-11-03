import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';

import { required, dependantRequired } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import StatefulError from '../../../../shared/form/StatefulError';
import Textfield     from '../../../../shared/form/Textfield';

import { navigateStep } from '../../../../shared/reduxModules/form_options';

import StepSidebar from './StepSidebar';

class StepTwo extends BaseForm {

  componentDidMount() {
    this.props.dispatch(navigateStep(2));
    if (this.props.mounted) {
      this.refs['header'].focus();
    }
  }

  render() {
    const { 
      action,
      csrf_token,
      model,
      returnLink,
      mode,
      caseStudyForm,
      onClick,
      sidebarOptions,
      form
    } = this.props;

    // List form elements on step two, we dont want to send these fields twice.
    const exlcudedKeys = ['acknowledge', 'name', 'role', 'phone', 'email', 'permission'];

    return (
      <Layout>
        <header>
          <h1 tabIndex="-1" ref="header" aria-describedby="header-description">Reference for {caseStudyForm.title || 'case study'}</h1>
          <p id="header-description">Show the range of skills and experience you can provide by completing the form below.</p>
        </header>
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <StepSidebar items={sidebarOptions} />
          </div>
          <article role="main" className="col-xs-12 col-sm-8">
            <ErrorBox focusOnMount={true} model={model} />
            <Form model={model}
              action={action}
              method="post"
              id="casestudy__create"
              component={SubmitForm}
              valid={form.valid}
              validators={{
                permission: {
                  required: (val) => dependantRequired(caseStudyForm, ['name', 'role', 'phone', 'email'])(val)
                }
              }}
            >
              {csrf_token && (
                <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
              )}
              
              {/* 
                Print all previous fields as hidden fields for full form submit. Excluding fields on this page. 
                When/if this form moves away from full page submit and interacts with an API, this block can be removed.
              */}
              {Object.keys(caseStudyForm)
                .filter(key => exlcudedKeys.indexOf(key) === -1)
                .map((key, i) => {
                  let field = caseStudyForm[key];
                  if (Array.isArray(field)) {
                    return field.map((f, j) => (
                      <input key={`${i}${j}`} type="hidden" name={`${key}[]`} value={f} />
                    ))
                  }
                  return (
                    <input key={i} type="hidden" name={key} value={field} />
                  )
                })
              }

              <Textfield
                model={`${model}.name`}
                name="name"
                id="name"
                htmlFor="name"
                label="Full name (optional)"
                description="Add the full name of the person who has agreed to be your reference."
              />

              <Textfield
                model={`${model}.role`}
                name="role"
                id="role"
                htmlFor="role"
                label="Role and place to work (optional)"
                description="For example,  Delivery Manager, Digital Transformation Agency."
              />

              <Textfield
                model={`${model}.phone`}
                name="phone"
                id="phone"
                htmlFor="phone"
                label="Phone number (optional)"
              />

              <Textfield
                model={`${model}.email`}
                name="email"
                id="email"
                htmlFor="email"
                label="Email (optional)"
              />

              <div className="field">
                <Control.checkbox
                  model={`${model}.permission`}
                  id="permission"
                  name="permission"
                />
                <label htmlFor="permission">I acknowledge my reference gives permission to be contacted and have their details shared in the Digital Marketplace.</label>
                <StatefulError
                  model={`${model}.permission`}
                  id="permission"
                  messages={{
                    required: 'You must acknowledge your reference has given permission.'
                  }}
                />
              </div>
              
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

              <input type="submit" value={mode === 'add' ? 'Publish case study' : 'Update case study'} role="button" onClick={onClick} />
            </Form>
            {returnLink && <a href={returnLink}>Return without saving</a>}
          </article>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps)(StepTwo);