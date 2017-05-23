import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-redux-form';

import Layout        from '../../../../shared/Layout';
import BaseForm      from '../../../../shared/form/BaseForm';
import Textarea     from '../../../../shared/form/Textarea';
import formProps     from '../../../../shared/reduxModules/formPropsSelector';

import './RevertNotification.css'

class RevertNotificationForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    action: React.PropTypes.string,
    model: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]).isRequired,
    id: React.PropTypes.number,
    onSubmit: React.PropTypes.func.isRequired,
    altSubmit: React.PropTypes.func
  };

  render() {
    const {
      action,
      csrf_token,
      model,
      revertEmailForm,
      onSubmitFailed,
      onSubmit,
      altSubmit,
      id
    } = this.props;

    return (
      <Layout>
        <header>
          <h2>Application reversion email message</h2>
        </header>
        <article role="main">

          <Form
            model={model}
            action={action}
            method="post"
            id="revertNotification"
            onSubmitFailed={onSubmitFailed}
          >

            <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token}/>

            <Textarea
              model={`${model}.message`}
              name="message"
              id="message"
              htmlFor="message"
              label="Email Message"
            />
            <div styleName="form-button-wrapper">
              <button style={{ width: '100px' }} onClick={() => {
                onSubmit(id, revertEmailForm.message);
                altSubmit(id);
              }}>Send
              </button>
            </div>
          </Form>
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...formProps(state, 'revertEmailForm'),
    ...ownProps,
    csrf_token: state.form_options.csrf_token,
  }
};

export {
  Textarea,
  mapStateToProps,
  RevertNotificationForm as Form
}

export default connect(mapStateToProps)(RevertNotificationForm);
