import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { min } from '../../../../validators';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import SubmitForm    from '../../../../shared/form/SubmitForm';
import ErrorBox      from '../../../../shared/form/ErrorBox';
import Textfield     from '../../../../shared/form/Textfield';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

class EnterPasswordForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  render() {
    const { action, csrf_token, model, form, onSubmit, enterPasswordForm } = this.props;
    return (
      <Layout>
        <header>
          <h1>Create a password</h1>
          <p>To finish creating your account you need to create a password.</p>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form model={model}
            action={action}
            method="post"
            id="enterpassword"
            component={SubmitForm}
            valid={form.valid}
            onCustomSubmit={onSubmit}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}

            <div className="field">
              <div className="question-heading">Email</div>
              <p>{enterPasswordForm.email}</p>
            </div>

            <Textfield
              model={`${model}.password`}
              name="password"
              id="password"
              htmlFor="password"
              label="Password"
              description="At least 10 characters"
              validators={{ min : min(10) }}
              messages={{
                min: 'Your password must be at least 10 characters',
              }}
              type="password"
            />

            <div>
              All activity on the Digital Marketplace is subject to our <a href="/terms-of-use">Terms of Use</a>.
            </div>

            <input type="submit" value='Join the Marketplace' role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'enterPasswordForm')
  }
}

export {
  Textfield,
  mapStateToProps,
  EnterPasswordForm as Form
}

export default connect(mapStateToProps)(EnterPasswordForm);
