import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required, validEmail } from '../../../../validators';

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
          <h1>Let’s get started</h1>
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

            To create an account first tell us how you want to use the Digital Marketplace.

            <div styleName="user-type">
              <RadioList
                  model={`${model}.user_type`}
                  name="user_type"
                  id="user_type"
                  label="I want to..."
                  options={[{value:'buyer', label:(<span><b>Buyer</b><br/> I want to buy on behalf <br/>of government.<br/></span>)},
                      {value: 'seller', label:(<span><b>Seller</b><br/> I want to sell digital products or services.</span>)}]}
                  validators={{ required }}
                  messages={{
                      required: 'You must select a user type',
                  }}
              />
            </div>

            Now enter your name and your work email address.

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
              { isBuyer && (
                  <p>Enter your government email address ending in <b>.gov.au.</b>&nbsp;
                If your email is different, request your account from <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.</p>
              )}
            <Textfield
              model={`${model}.email_address`}
              name="email_address"
              id="email_address"
              type="email"
              htmlFor="email_address"
              label="Email address"
              validators={{ required, validEmail }}
              messages={{
                required: 'Email is required',
                  validEmail: 'Email address must be valid'
              }}
            />



            { isBuyer && (
              <div styleName="employment-status">
                <RadioList
                  model={`${model}.employment_status`}
                  name="employment_status"
                  id="employment_status"
                  label="To create a buyer account you need to be a government employee or be authorised by a government employee. Choose the option below that matches your situation."
                  options={[{
                    value:'employee', 
                    label:'I am an employee under the Commonwealth Public Service Act (1999) or under equivalent state or territory legislation and need access to the Digital Marketplace to perform my role.'
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
            <p>
              <small>
                By creating an account you confirm your acceptance of our <a href="/terms-of-use">Terms of Use</a>.
              </small>
            </p>
            <input type="submit" value='Create your account' role="button" />

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
