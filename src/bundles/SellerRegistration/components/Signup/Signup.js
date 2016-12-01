import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Link } from 'react-router';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';

import NotFound from '../../../../shared/NotFound';
import LocalNav from '../../../../shared/LocalNav';

import { stepComplete, setSteps, STATUS } from '../../redux/modules/steps';
import { getStateForms, dispatchFormState, findDirtyForms } from '../../redux/helpers';
import { stepNextPersist, submitApplication } from '../../redux/modules/application';

// Step Components
import Start                from '../Start';
import YourInfoForm         from '../YourInfoForm';
import BusinessDetailsForm  from '../BusinessDetailsForm';
import DomainSelector       from '../DomainSelector';
import Review               from '../Review';
import Submit               from '../Submit';
import DocumentsForm        from '../DocumentsForm';
import ReferencesForm        from '../ReferencesForm';
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
    { id: 'casestudy', label: 'Case Study', component: DomainList, pattern: '/case-study', formKey: 'caseStudyForm' },
    { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
    { id: 'references', label: 'References', component: ReferencesForm, pattern: '/references', formKey: 'referencesForm' },
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
    const { dirtyForms = {}, forms, router, steps = {}, location } = this.props;
    const applicationValid = this.steps.length === Object.keys(steps).length;
    const { services = {} } = forms.domainSelectorForm;

    let isSubFlow = location.pathname.match(/case-study\/(edit|view|add)/);
    const articleClassNames = classNames('col-xs-12 col-sm-8', {
      'col-sm-push-2': isSubFlow,
      'col-sm-push-1': !isSubFlow
    });

    return (
      <div className="row">
        <Match pattern="/:route/:subroute?" render={({ params }) => {
          if (params.subroute !== 'undefined') {
            return null;
          }

          return (
            <LocalNav className="col-xs-12 col-sm-3" navClassName="step-navigation" id="main-navigation">
              {this.steps.map(({ pattern, label, formKey, id }, i) => {
                return (
                  <li key={i}>
                    <Link to={pattern}>{
                      ({ isActive, href, onClick }) => (
                        <a href={href} className={classNames({'is-active is-current': isActive})} onClick={onClick}>
                          <i
                            className={classNames({
                              'fa': !dirtyForms[formKey],
                              'fa-circle-thin incomplete': !steps[id] && !isActive && !dirtyForms[formKey],
                              'fa-circle': isActive && steps[id] !== STATUS.complete && !dirtyForms[formKey],
                              'fa-check-circle complete': steps[id] === STATUS.complete && !dirtyForms[formKey],
                              'dirty': dirtyForms[formKey]
                            })}
                            aria-hidden="true"
                          />
                          &nbsp;{label}
                        </a>
                    )}</Link>
                  </li>
                )
              })}
            </LocalNav>
          )
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
    dirtyForms: findDirtyForms(state),
    steps,
    ...ownProps
  };
};

export {
  Signup as SignupClass,
  mapStateToProps
}

export default connect(mapStateToProps)(Signup);