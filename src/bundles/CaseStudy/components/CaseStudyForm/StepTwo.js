import React from 'react';
import { connect } from 'react-redux';
import { Form, Control } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import ErrorBox      from '../../../../shared/form/ErrorBox';
import StatefulError from '../../../../shared/form/StatefulError';
import Textfield     from '../../../../shared/form/Textfield';

import { navigateStep } from '../../../../shared/reduxModules/form_options';

import StepSidebar from './StepSidebar';

class StepTwo extends React.Component {

  componentDidMount() {
    this.props.dispatch(navigateStep(2));
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
      attachNode,
      sidebarOptions
    } = this.props;

    // List form elements on step two, we dont want to send these fields twice.
    const exlcudedKeys = ['acknowledge', 'name', 'role', 'phone', 'email'];

    return (
      <Layout>
        <header>
          <h1>Reference for {caseStudyForm.title}</h1>
          <p>Show the range of skills and experience you can provide by completing the form below.</p>
        </header>
        <StepSidebar items={sidebarOptions} />
        <article role="main" className="content-main">
          <ErrorBox focusOnMount={true} model={model} />
          <Form model={model}
            action={action}
            method="post"
            id="casestudy__create"
            ref={attachNode}
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
              label="Full name"
              description="Add the full name of the person who has agreed to be your reference."
              validators={{ required }}
              messages={{
                required: 'Full name is required',
              }}
            />

            <Textfield
              model={`${model}.role`}
              name="role"
              id="role"
              htmlFor="role"
              label="Role and place to work"
              description="For example,  Delivery Manager, Digital Transformation Agency."
              validators={{ required }}
              messages={{
                required: 'Role and place to work is required',
              }}
            />

            <Textfield
              model={`${model}.phone`}
              name="phone"
              id="phone"
              htmlFor="phone"
              label="Phone number"
              validators={{ required }}
              messages={{
                required: 'Phone number is required',
              }}
            />

            <Textfield
              model={`${model}.email`}
              name="email"
              id="email"
              htmlFor="email"
              label="Email"
              validators={{ required }}
              messages={{
                required: 'Email is required',
              }}
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

            <input type="submit" value={mode === 'add' ? 'Publish case study' : 'Update case study'} role="button" onClick={onClick} />
          </Form>
          {returnLink && <a href={returnLink}>Return without saving</a>}
        </article>
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