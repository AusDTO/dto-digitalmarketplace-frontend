import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Link } from 'react-router';
import findIndex from 'lodash/findIndex';

import NotFound from '../../../../shared/NotFound';

import { getStateForms, dispatchFormState, validForms } from '../../redux/helpers';
import { stepNext, stepNextPersist, submitApplication } from '../../redux/modules/signup';

// Step Components
import Start                from '../../../SellerRegistration/components/Start';
import YourInfoForm         from '../../../SellerRegistration/components/YourInfoForm';
import BusinessDetailsForm  from '../../../SellerRegistration/components/BusinessDetailsForm';
import DomainSelector       from '../../../SellerRegistration/components/DomainSelector';
import PricingForm          from '../../../SellerRegistration/components/PricingForm';
import DomainList           from '../../../CaseStudy/components/DomainList';
import Review               from '../../../SellerRegistration/components/Review';
import Submit               from '../../../SellerRegistration/components/Submit';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    if (props.filterSteps) {
      this.steps = this.steps.filter(props.filterSteps);
    }
  }

  steps = [
    { label: 'Become a seller', component: Start, pattern: '/start' },
    { label: 'Business representative', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
    { label: 'Create your profile', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
    { label: 'Digital Services', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' },
    { label: 'Pricing', component: PricingForm, pattern: '/pricing', formKey: 'pricingForm' },
    { label: 'Case Study', component: DomainList, pattern: '/case-study', formKey: 'caseStudyForm' },
    { label: 'Review your profile', component: Review, pattern: '/review' },
    { label: 'Submit', component: Submit, pattern: '/submit' },
  ]

  elementProps = {
    onClick: (e) => {
      e.preventDefault();
      const { dispatch, router } = this.props;

      dispatch(stepNext(router.transitionTo, this.nextStep.pattern, this.step))
    },
    onSubmit: (e) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }

      const { dispatch, router } = this.props;

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
    const { forms = {}, application, dispatch } = this.props;
    dispatchFormState(dispatch, forms, application)
  }

  render() {
    const { validForms = {}, forms, router } = this.props;
    const currentStepIdx = this.currentStepIndex;
    const formSteps = this.steps.map(step => step.formKey).filter(s => s);
    const applicationValid = formSteps.length === Object.keys(validForms).length;
    const { services = {} } = forms.domainSelectorForm;

    return (
      <div className="row">
        <Match pattern="/:route/:subroute?" render={({ params }) => {
          if (params.subroute === 'undefined') {
            return (
              <aside className="col-xs-12 col-sm-4">
                <nav className="local-nav step-navigation">
                  <ul>
                    {this.steps.map(({ pattern, label, formKey }, i) => {
                      let isValid = formKey && validForms[formKey];
                      // If a step doesnt have a formKey and we've passed it, tick it!
                      if (!formKey && currentStepIdx > i) {
                        isValid = true;
                      }
                      return (
                        <li key={i}>
                          <Link activeClassName="is-active is-current" to={pattern}>{isValid && '\u2713 '}{label}</Link>
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
        <article className="col-xs-12 col-sm-8">
          {this.steps.map(({pattern, exact, component, label}, i) => {
            return (
              <Match key={i} pattern={pattern} render={(routerProps) => {
                const children = this.nextStep && <input type="hidden" name="next_step_slug" value={this.nextStep.pattern.slice(1)} />
                const props = Object.assign({},
                  routerProps,
                  {
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
            )
          })}
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
  const { application = {} } = state;
  return {
    forms: getStateForms(state),
    application,
    validForms: validForms(state),
    ...ownProps
  };
};

export {
  Signup as SignupClass,
  mapStateToProps
}

export default connect(mapStateToProps)(Signup);