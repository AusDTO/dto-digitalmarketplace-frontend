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
import CaseStudyForm        from '../../../CaseStudy/components/CaseStudyForm';
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
    { label: 'Start', component: Start, pattern: '/start' },
    { label: 'Your Info', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
    { label: 'Business Details', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
    { label: 'Domains', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' },
    { label: 'Pricing', component: PricingForm, pattern: '/pricing', formKey: 'pricingForm' },
    { label: 'Case Study', component: CaseStudyForm, pattern: '/case-study', formKey: 'caseStudyForm' },
    { label: 'Review', component: Review, pattern: '/review' },
    { label: 'Submit', component: Submit, pattern: '/submit' },
  ]

  elementProps = {
    onClick: (e) => {
      e.preventDefault();
      const { dispatch, router } = this.props;

      dispatch(stepNext(router.transitionTo, this.nextStep.pattern))
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

      dispatch(stepNextPersist(router.transitionTo, this.nextStep.pattern));
    },
  }

  get nextStep () {
    const { location } = this.props;
    let idx = findIndex(this.steps, { pattern: location.pathname });
    let nextStep = this.steps[idx + 1];
    if (!nextStep) {
      // What happens here? Navigate to another page?
    }

    return nextStep;
  }

  componentWillMount() {
    const { forms = {}, application, dispatch } = this.props;
    dispatchFormState(dispatch, forms, application)
  }

  render() {
    const { validForms } = this.props;
    return (
      <div className="row">
        <aside className="col-xs-12 col-sm-4">
          <nav className="local-nav step-navigation">
            <ul>
              {this.steps.map(({ pattern, label, formKey }, i) => (
                <li key={i}>
                  <Link to={pattern}>{label}</Link>
                  {(formKey && validForms[formKey]) && (
                    <b>valid</b>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="col-xs-12 col-sm-8">
          {this.steps.map(({pattern, exact, component}, i) => {
            return (
              <Match key={i} pattern={pattern} exactly render={(routerProps) => {
                let children = this.nextStep && <input type="hidden" name="next_step_slug" value={this.nextStep.pattern.slice(1)} />
                return React.createElement(component, Object.assign({}, routerProps, this.elementProps), children);
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