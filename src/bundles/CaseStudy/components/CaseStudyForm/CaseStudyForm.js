import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Match, Miss } from 'react-router';

import StepOne from './StepOne';
import StepTwo from './StepTwo';

import { navigateStep } from '../../../../shared/reduxModules/form_options';


class CaseStudyForm extends React.Component {

  static propTypes = {
    action: React.PropTypes.string,
    csrf_token: React.PropTypes.string,
    form: React.PropTypes.object.isRequired,
    returnLink: React.PropTypes.string
  }

  static contextTypes = {
    router: React.PropTypes.shape({
      transitionTo: React.PropTypes.func.isRequired
    })
  }

  state = {
    localSubmitFailed: false
  }

  /**
   * We are calling this on `Will` instead of `Did` for server rendering purposes.
   * If there are formErrors available, set the appropriate errors and show them.
   * @return {void}
   */
  componentWillMount() {
    const { dispatch, formErrors, model, serverRender } = this.props;

    if (!formErrors) {
      return;
    }

    if (serverRender) {
      let errors = {};
      Object.keys(formErrors).forEach((key) => {
        errors[key] = {
          valid: false,
          errors: formErrors[key]
        }
      });
      dispatch(actions.setFieldsErrors(model, errors));
    }
  }

  componentDidMount() {
    const { dispatch, formErrors, model } = this.props;

    if (!formErrors) {
      return;
    }

    dispatch(actions.setSubmitFailed(model));
    dispatch(actions.setFieldsValidity(model, {}, { errors: true }));
  }

  attachNode(node) {
    this._form = ReactDOM.findDOMNode(node);
  }

  handleClick(e) {
    /**
     * FIXME
     * This is a workaround to complete a normal form submit
     */
    const { form, step, maxSteps, dispatch } = this.props;
    if (form.valid) {
      if (step < maxSteps) {
        e.preventDefault();

        const { router } = this.context;
        const nextStep = step + 1;

        dispatch(navigateStep(nextStep));
        router.transitionTo('/reference');

        this.setState({
          localSubmitFailed: false
        });
      } else {
        this._form.submit = this.refs.submittable.submit;
        this._form.submit();
      }
    } else {
      this.setState({
        localSubmitFailed: true
      });
    }
  }

  render() {
    const sidebarOptions = [
      { path: '/', label: 'Add case study' },
      { path: '/reference', label: 'Add reference' }
    ]
    const props = {
      ...this.props,
      sidebarOptions,
      attachNode: this.attachNode.bind(this),
      onClick: this.handleClick.bind(this)
    }

    return (
        <div>
          {/*FIXME: this form exists purely to steal its submit method.*/}
          <form ref="submittable" tabIndex="-1" style={{ display: "none" }} />
          <Match pattern="/" exactly render={(routerProps) => <StepOne {...routerProps} {...props} />} />
          <Miss render={(routerProps) => <StepOne {...routerProps} {...props} />} />
          <Match pattern="/reference" exactly render={(routerProps) => <StepTwo {...routerProps} {...props} />} /> 
        </div>
    )
  }
}

CaseStudyForm.defaultProps = {
  maxSteps: 1
}

const mapStateToProps = ({ forms, casestudy, form_options, caseStudyForm, options }) => {
  const form = forms.caseStudyForm.$form;
  return {
    form,
    caseStudyForm,
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
