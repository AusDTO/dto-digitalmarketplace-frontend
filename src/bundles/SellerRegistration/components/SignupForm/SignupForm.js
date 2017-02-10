import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';
import RadioList     from '../../../../shared/form/RadioList';

import './SignupForm.css'

class SignupForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  render() {
    const { csrf_token, model, form, children, signupForm, buyer_url, seller_url, onSubmit } = this.props;
    const isBuyer = signupForm.user_type === 'buyer';
    const action = isBuyer ? buyer_url : seller_url;
    return (
      <Layout>
        <header>
          <h1>Create an account</h1>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form model={model}
            action={action}
            method="post"
            id="signup"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            <Textfield
              model={`${model}.name`}
              name="name"
              id="name"
              htmlFor="name"
              label="Full name"
              validators={{ required }}
              messages={{
                required: 'Name is required',
              }}
            />

            <Textfield
              model={`${model}.email_address`}
              name="email_address"
              id="email_address"
              type="email"
              htmlFor="email_address"
              label="Email address"
              validators={{ required }}
              messages={{
                required: 'Email is required',
              }}
            />

            <div styleName="user-type">
              <RadioList
                model={`${model}.user_type`}
                name="user_type"
                id="user_type"
                label="I want to"
                options={[{value:'buyer', label:'Buy for government'}, {value: 'seller', label:'Sell ICT services'}]}
                validators={{ required }}
                messages={{
                  required: 'You must select a user type',
                }}
              />
            </div>

            { isBuyer && (
              <div styleName="employment-status">
                <RadioList
                  model={`${model}.employment_status`}
                  name="employment_status"
                  id="employment_status"
                  label="To create a buyer account you need to be a government employee or be authorised by a government employee. Choose the option below that matches your situation."
                  options={[{
                    value:'employee', 
                    label:'I am an employee under the Commonwealth Public Service ACT (1999) or under equivalent state or territory legislation and need access to the Digital Marketplace to perform my role.'
                  }, 
                  {
                    value: 'contractor', 
                    label:'I am a contractor working in local, state or federal government.'
                  }]}
                  validators={{ required }}
                  messages={{
                    required: 'You must specify your employment status.',
                  }}
                />
              </div>
            )}

            {children}

            <input type="submit" value='Create your account' role="button" />
            <p>
              <small>
                All activity on the Digital Marketplace is subject to our <a href="/terms-of-use">Terms of Use</a>.
              </small>
            </p>             
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'signupForm')
  }
}

export {
  Textfield,
  mapStateToProps,
  SignupForm as Form
}

export default connect(mapStateToProps)(SignupForm);
