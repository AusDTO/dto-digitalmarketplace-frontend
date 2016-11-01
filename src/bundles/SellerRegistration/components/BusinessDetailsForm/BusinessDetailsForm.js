import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Control, actions } from 'react-redux-form';

import { required, validLinks } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import ErrorBox      from '../../../../shared/form/ErrorBox';
import RadioList from '../../../../shared/form/RadioList';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';


class BusinessDetailsForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    returnLink: React.PropTypes.string
  }

  /**
   * We are calling this on `Will` instead of `Did` for server rendering purposes.
   * If there are formErrors available, set the appropriate errors and show them.
   * @return {void}
   */
  componentWillMount() {
    const { dispatch, formErrors, model } = this.props;

    if (!formErrors) {
      return;
    }

    let errors = {};
    Object.keys(formErrors).forEach((key) => {
      errors[key] = {
        valid: false,
        errors: formErrors[key]
      }
    });

    dispatch(actions.setFieldsErrors(model, errors))
    dispatch(actions.setSubmitFailed(model))
  }

  attachNode(node) {
    this._form = ReactDOM.findDOMNode(node);
  }

  handleClick() {
    /**
     * FIXME
     * This is a workaround to complete a normal form submit
     */
    const { form } = this.props;
    if (form.valid) {
      this._form.submit = this.refs.submittable.submit;
      this._form.submit();
    }
  }

  render() {
    const { action, csrf_token, model, form, returnLink, mode } = this.props;
    return (
      <Layout>
        <div className="grid-row">
          <div className="column-one-whole">

            <header className="page-heading page-heading-with-context page-heading-without-breadcrumb"><p className="context">
              {mode === 'edit' ? 'Edit' : 'Add'} seller information
            </p><h1>
              # seller.name
            </h1>
            </header>

          </div>
        </div>
        <article role="main" className="content-main">
          {form.valid === false && form.submitFailed && <ErrorBox focusOnMount={true} />}
          {/*FIXME: this form exists purely to steal its submit method.*/}
          <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
          <Form model={model}
            action={action}
            method="post"
            id="BusinessDetails__create"
            ref={this.attachNode.bind(this)}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}


            <Textarea
              model={`${model}.summary`}
              name="summary"
              id="summary"
              controlProps={{ limit: 200 }}
              label="Seller summary"
              description=""
              messages={{
                required: 'You must provide a seller summary'
              }}
              validators={{ required }}
            />

            <RadioList
                model={`${model}.trading_status`}
                name="trading_status"
                id="trading_status"
                label="Your trading status"
                options={[
                  {"value": "Company","label": "Company"},
                  {"value": "Trustee","label": "Trustee"},
                  {"value": "Partnership","label": "Partnership"},
                  {"value": "Sole Trader","label": "Sole Trader"},
                  {"value": "An Association","label": "An Association"},
                  {"value": "Government","label": "Government"}
                ]}
                description=""
                messages={{
                  required: 'You must provide your trading status'
                }}
                validators={{ required }}
            />

            <RadioList
                model={`${model}.business_age`}
                name="business_age"
                id="business_age"
                label="How long have you been in business for?"
                options={[
                  {"value": "Less than 12 months","label": "Less than 12 months"},
                  {"value": "1 - 2 years","label": "1 - 2 years"},
                  {"value": "2 - 4 years","label": "2 - 4 years"},
                  {"value": "4 - 6 years","label": "4 - 6 years"},
                  {"value": "6 - 8 years","label": "6 - 8 years"},
                  {"value": "Longer than 8 years","label": "Longer than 8 years"},

                ]}
                description=""
                messages={{
                  required: 'You must provide your trading status'
                }}
                validators={{ required }}
            />

            <input type="submit" value={mode === 'add' ? 'Next' : 'Save and return'} role="button" onClick={this.handleClick.bind(this)} />
          </Form>
          {returnLink && <a href={returnLink}>Return without saving</a>}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const form = state.form.forms.businessDetails.$form;
  return {
    model: 'form.businessDetails',
    formErrors: state.form_options && state.form_options.errors,
    form,
    returnLink: state.businessdetails && state.businessdetails.returnLink,
    mode: state.form_options.mode || 'add',
    ...state.form_options
  }
}

export {
  Textfield,
  mapStateToProps,
  BusinessDetailsForm as Form
}

export default connect(mapStateToProps)(BusinessDetailsForm);
