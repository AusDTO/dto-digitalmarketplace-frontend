import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Link } from 'react-router';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';

import NotFound from '../../../../shared/NotFound';

import { stepComplete, setSteps, STATUS } from '../../redux/modules/steps';
import { getStateForms, dispatchFormState, validForms } from '../../redux/helpers';
import { stepNextPersist, submitApplication } from '../../redux/modules/application';

// Step Components
import Start                from '../Start';
import YourInfoForm         from '../YourInfoForm';
import BusinessDetailsForm  from '../BusinessDetailsForm';
import DomainSelector       from '../DomainSelector';
import PricingForm          from '../PricingForm';
import Review               from '../Review';
import Submit               from '../Submit';
import DocumentsForm        from '../DocumentsForm';
import DomainList           from '../../../CaseStudy/components/DomainList';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    if (props.filterSteps) {
      this.steps = this.steps.filter(props.filterSteps);
    }
  }

  steps = [
    { id: 'start', label: 'Become a seller', component: Start, pattern: '/start' },
    { id: 'info', label: 'Business representative', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
    { id: 'profile', label: 'Create your profile', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
    { id: 'digital', label: 'Digital Services', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' },
    { id: 'pricing', label: 'Pricing', component: PricingForm, pattern: '/pricing', formKey: 'pricingForm' },
    { id: 'casestudy', label: 'Case Study', component: DomainList, pattern: '/case-study', formKey: 'caseStudyForm' },
    { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
    { id: 'review', label: 'Review your profile', component: Review, pattern: '/review' },
    { id: 'submit', label: 'Submit', component: Submit, pattern: '/submit' },
  ]

  elementProps = {
    onClick: (e) => {
      e.preventDefault();
      const { dispatch, router } = this.props;

      if (this.step && this.step.id) {
        dispatch(stepComplete(this.step.id));
      }

      dispatch(stepNextPersist(router.transitionTo, this.nextStep.pattern, this.step));
    },
    onSubmit: (e) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }

      const { dispatch, router } = this.props;

      if (this.step && this.step.id) {
        dispatch(stepComplete(this.step.id));
      }

      if (!this.nextStep) {
        dispatch(submitApplication());
        return;
      }

      dispatch(stepNextPersist(router.transitionTo, this.nextStep.pattern, this.step));
    },
  }

  get currentStepIndex() {
    const { location } = this.props;
    return findIndex(this.steps, { pattern: location.pathname });
  }

  get step() {
    return this.steps[this.currentStepIndex];
  }

  get nextStep() {
    return this.steps[this.currentStepIndex + 1];
  }

  componentWillMount() {
    const { forms = {}, application = {}, dispatch } = this.props;
    dispatchFormState(dispatch, forms, application);
    if (application.steps) {
      dispatch(setSteps(application.steps))
    }
  }

  render() {
    const { validForms = {}, forms, router, steps = {}, location } = this.props;
    const formSteps = this.steps.map(step => step.formKey).filter(s => s);
    const applicationValid = formSteps.length === Object.keys(validForms).length;
    const { services = {} } = forms.domainSelectorForm;

    let isSubFlow = location.pathname.match(/case-study\/(edit|view|add)/);
    const articleClassNames = classNames('col-xs-12 col-sm-8', {
      'col-sm-push-2': isSubFlow,
      'col-sm-push-1': !isSubFlow
    });

    return (
      <div className="row">
        <Match pattern="/:route/:subroute?" render={({ params }) => {
          if (params.subroute === 'undefined') {
            return (
              <aside className="col-xs-12 col-sm-3">
                <nav className="local-nav step-navigation">
                  <ul>
                    {this.steps.map(({ pattern, label, formKey, id }, i) => {
                      return (
                        <li key={i}>
                          <Link to={pattern}>{
                            ({ isActive, href, onClick }) => (
                              <a href={href} className={classNames({'is-active is-current': isActive})} onClick={onClick}>
                                <i
                                  className={classNames('fa', {
                                    'fa-circle-thin incomplete': !steps[id] && !isActive,
                                    'fa-circle': isActive && steps[id] !== STATUS.complete,
                                    'fa-check-circle complete': steps[id] === STATUS.complete
                                  })}
                                  aria-hidden="true"
                                />
                                &nbsp;{label}
                              </a>
                          )}</Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </aside>
            )
          }
          return null;
        }} />
        <article className={articleClassNames}>
          {this.steps.map(({pattern, exact, component, label}, i) => (
            <Match key={i} pattern={pattern} render={(routerProps) => {
              const children = this.nextStep && <input type="hidden" name="next_step_slug" value={this.nextStep.pattern.slice(1)} />
              const props = Object.assign({},
                routerProps, {
                  applicationValid,
                  services,
                  router,
                  nextRoute: this.nextStep && this.nextStep.pattern,
                  title: label,
                  buttonText: 'Save & Continue',
                  actions: {
                    submitApplication
                  }
                },
                this.elementProps
              );

              return React.createElement(component, props, children);
            }} />
          ))}
          <Miss  component={NotFound} />
        </article>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  applicant: React.PropTypes.object,
  forms: React.PropTypes.object,
  filterSteps: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const { application = {}, steps } = state;
  return {
    forms: getStateForms(state),
    application,
    validForms: validForms(state),
    steps,
    ...ownProps
  };
};

export {
  Signup as SignupClass,
  mapStateToProps
}

export default connect(mapStateToProps)(Signup);