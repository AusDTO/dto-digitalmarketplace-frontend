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

class SignupForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  render() {
    const { action, csrf_token, model, form, children, onSubmit } = this.props;
    return (
      <Layout>
        <header>
          <h1>There you are!</h1>
          <p>
            We’ve been looking for outstanding digital businesses to help deliver 21st century products and services to local, state and federal government through the Digital Marketplace.
          </p>
          <p>
            And better still, we’ve streamlined the process so you could be competing for new business within weeks — rather than months.
          </p>
        </header>
        <h2> Ready to get started?</h2>
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
              model={`${model}.email`}
              name="email"
              id="email"
              type="email"
              htmlFor="email"
              label="Email address"
              validators={{ required }}
              messages={{
                required: 'Email is required',
              }}
            />

            {children}

            <input type="submit" value='Create your seller account' role="button" />
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
