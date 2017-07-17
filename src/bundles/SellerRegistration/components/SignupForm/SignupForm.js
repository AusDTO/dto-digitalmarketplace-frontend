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

import api        from '../../../../shared/reduxModules/api';

import './SignupForm.css'

class SignupForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
      errors: React.PropTypes.object
  }

  state = {
    signupSuccess: false
  }

  statusCheck(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  handleSubmit(model) {
    return api('/api/signup', {
      method: 'POST',
      body: JSON.stringify(model),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this.statusCheck)
    .then((response) => {
      this.setState({ signupSuccess: true })
      window.scrollTo(0, 0)
    }).catch((error) => {
      console.log("ERROR", error)
    })
  }

  render() {
    const { csrf_token, model, form, formErrors, children, signupForm, buyer_url, seller_url, onSubmit, onSubmitFailed } = this.props;
    const isBuyer = signupForm.user_type === 'buyer';
    const action = isBuyer ? buyer_url : seller_url;
    let signupSuccess = this.state.signupSuccess;
    return (
      <div>
        { signupSuccess ?
          <div>
            <article role="main">
              <header className="page-heading page-heading-without-breadcrumb"><h1>
                  Thanks for requesting access to the Digital Marketplace.
                </h1>
              </header>
              <p>An email has been sent to <strong>{signupForm.email_address}</strong> with next steps. </p>
              <p>If you don’t receive the email within the next 5 minutes or so, check to see if it’s been classified as
                spam or email us for assistance at <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au.</a>
              </p>
            </article>
          </div>
        :
          <Layout>
            <header>
              <h1>Let’s get started</h1>
            </header>
            <article role="main">
                {formErrors && formErrors.email_address && formErrors.email_address.government_email && (      <div ref="box" className="callout--warning" aria-describedby="validation-masthead-heading" tabIndex="-1" role="alert">
                  <h4 id="validation-masthead-heading">Email needs to be a government email address</h4>
                  Enter your government email address ending in <b>.gov.au.</b>&nbsp;
                  If your email is different, request your account from <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.</div>)}
              <ErrorBox focusOnMount={true} model={model}/>
              <Form model={model}
                action={action}
                method="post"
                id="signup"
                onSubmit={ (model) => this.handleSubmit(model) }
                onSubmitFailed={onSubmitFailed}
              >
                {csrf_token && (
                  <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
                )}

                <div styleName="user-type">
                  <RadioList
                      model={`${model}.user_type`}
                      name="user_type"
                      id="user_type"
                      label="Have you got digital expertise to sell to government? Or do you want to buy digital products and services on behalf of your government office? Choose the option that matches your situation."
                      options={[
                          {value: 'buyer' , label:(<span>Buyer<p> I want to buy on behalf of<br/>government.</p></span>)},
                          {value: 'seller', label:(<span>Seller<p> I want to sell digital products or<br/>services.</p></span>)}
                          ]}
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

                <Textfield
                  model={`${model}.email_address`}
                  name="email_address"
                  id="email_address"
                  type="email"
                  htmlFor="email_address"
                  label={isBuyer ? (<span>Email address ending in <b>.gov.au.</b></span>) : "Email address"}
                  description={isBuyer ? (
                      <span>If your email is different, request your account from <a href="mailto:marketplace@digital.gov.au">marketplace@digital.gov.au</a>.</span>
                  ) : (<br/>)}
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
                    By creating an account you confirm your acceptance of our <a href="/terms-of-use" target="_blank" rel="external">Terms of Use</a>.
                  </small>
                </p>
                <input type="submit" value='Create your account'/>

              </Form>
            </article>
          </Layout>
        }
      </div>
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
