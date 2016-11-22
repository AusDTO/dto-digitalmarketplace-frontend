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

class YourInfoForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired
  }

  render() {
    const { action, csrf_token, model, form, title, buttonText, children, onSubmit } = this.props;
    return (
      <Layout>
        <header>
          <h1>{title}</h1>
        </header>
        <article role="main">
          <ErrorBox focusOnMount={true} model={model}/>
          <Form model={model}
            action={action}
            method="post"
            id="yourinfo"
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
              label="Business Name"
              description="As you would like it displayed on the Marketplace"
              validators={{ required }}
              messages={{
                required: 'Business name is required',
              }} 
            />

            <Textfield
              model={`${model}.representative`}
              name="representative"
              id="representative"
              htmlFor="representative"
              label="Business Representative"
              description="The authorised person who signs contracts with clients"
              validators={{ required }}
              messages={{
                required: 'Business representative is required',
              }}
            />

            <Textfield
              model={`${model}.abn`}
              name="abn"
              id="abn"
              htmlFor="abn"
              label="ABN"
              validators={{ required }}
              messages={{
                required: 'ABN is required',
              }}
            />

            <Textfield
              model={`${model}.phone`}
              name="phone"
              id="phone"
              htmlFor="phone"
              label="Representative's phone number"
              validators={{ required }}
              messages={{
                required: 'Representative\'s phone number is required',
              }}
            />

            <Textfield
              model={`${model}.email`}
              name="email"
              id="email"
              htmlFor="email"
              label="Representative's email"
              validators={{ required }}
              messages={{
                required: 'Representative\'s email is required',
              }}
            />

            {children}

            <input type="submit" value={buttonText} role="button" />
          </Form>
        </article>
      </Layout>
    )
  }
}

YourInfoForm.defaultProps = {
  buttonText: 'Save & Continue',
  title: 'Your Information'
}

const mapStateToProps = (state) => {
  return {
    ...formProps(state, 'yourInfoForm')
  }
}

export {
  Textfield,
  mapStateToProps,
  YourInfoForm as Form
}

export default connect(mapStateToProps)(YourInfoForm);
