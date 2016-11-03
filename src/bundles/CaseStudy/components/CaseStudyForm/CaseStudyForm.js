import React from 'react';
import { connect } from 'react-redux';
import { actionTypes } from 'react-redux-form';
import { Match, Miss } from 'react-router';

import BaseForm from '../../../../shared/form/BaseForm';
import NotFound from '../../../../shared/NotFound';

import StepOne from './StepOne';
import StepTwo from './StepTwo';


class CaseStudyForm extends BaseForm {

  static propTypes = {
    action: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    caseStudyForm: React.PropTypes.object.isRequired,
    router: React.PropTypes.shape({
      transitionTo: React.PropTypes.func
    }).isRequired,
    maxSteps: React.PropTypes.number.isRequired,
    model: React.PropTypes.string.isRequired,

    formErrors: React.PropTypes.object,
    returnLink: React.PropTypes.string,
    mode: React.PropTypes.oneOf(['add', 'edit']),
    csrf_token: React.PropTypes.string,
    serverRender: React.PropTypes.bool
  }

  static defaultProps = {
    maxSteps: 1
  }

  handleSubmit(e) {
    /**
     * FIXME
     * This is a workaround to complete a normal form submit
     */
    const { form, step, maxSteps, dispatch, model, router } = this.props;
    if (form.valid) {
      if (step < maxSteps) {
        e.preventDefault();
        router.transitionTo('/reference');
        dispatch({ type: actionTypes.SET_SUBMIT_FAILED, model, submitFailed: false })
      } else {
        this._form.submit = this.refs.submittable.submit;
        this._form.submit();
      }
    }
  }

  render() {
    const sidebarOptions = [
      { path: '/', label: 'Add case study' },
      { path: '/reference', label: 'Add reference' }
    ];

    const props = {
      ...this.props,
      sidebarOptions,
      mounted: this.state.mounted,
      attachNode: this.attachNode.bind(this),
      onClick: this.handleSubmit.bind(this)
    };

    return (
        <div>
          {/*
            FIXME: this form exists purely to steal its submit method, limitation of RRF.
          */}
          <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
          <Match pattern='/' exactly render={(routerProps) => <StepOne {...routerProps} {...props} />} />
          <Match pattern='/reference' render={(routerProps) => <StepTwo {...routerProps} {...props} />} />
          <Miss component={NotFound} />
        </div>
    )
  }
}

const mapStateToProps = ({ forms, casestudy, form_options, caseStudyForm, options }, { router }) => {
  const form = forms.caseStudyForm.$form;
  return {
    form,
    caseStudyForm,
    router,
    maxSteps: 2,
    model: 'caseStudyForm',
    formErrors: form_options.errors,
    returnLink: casestudy.returnLink,
    ...form_options,
    ...options
  }
}

export {
  mapStateToProps,
  CaseStudyForm as Form
}

export default connect(mapStateToProps)(CaseStudyForm);
