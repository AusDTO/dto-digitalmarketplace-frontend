import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import DocumentTitle from 'react-document-title';

import Icon     from '../../../../shared/Icon';
import NotFound from '../../../../shared/NotFound';
import LocalNav from '../../../../shared/LocalNav';

import { actions as stepActions, STATUS } from '../../redux/modules/steps';
import { getStateForms, dispatchFormState, isDailyRateMissing } from '../../redux/helpers';
import { actions, expiredLiabilityInsurance, expiredWorkersCompensation, missingDailyRates } from '../../redux/modules/application';
import isPast from 'date-fns/is_past';

// Step Components
import Start                from '../Start';
import YourInfoForm         from '../YourInfoForm';
import BusinessDetailsForm  from '../BusinessDetailsForm';
import BusinessInfoForm     from '../BusinessInfoForm';
import DomainSelector       from '../DomainSelector';
import PricingForm          from '../PricingForm';
import DisclosuresForm      from '../DisclosuresForm';
import AwardsForm           from '../AwardsForm';
import ToolsForm            from '../ToolsForm';
import DocumentsForm        from '../DocumentsForm';
import DomainList           from '../../../CaseStudy/components/DomainList';
import Review               from '../Review';
import SubmitStepForm       from '../Submit';
import Finish               from '../Finish';
import FinishProfile        from '../FinishProfile';
import ProductsForm         from '../ProductsForm';
import RecruiterForm        from '../RecruiterForm';
import CandidatesForm       from '../CandidatesForm';


class Signup extends React.Component {

  constructor(props) {
    super(props);

    // Allow submit to be controlled by feature flag.
    // Use same pattern, so the URL can be consistent
    // Just different messaging/actions.
    const { options = {}, filterSteps } = props;
    this.steps = this.steps.concat({
      id: 'submit',
      label: 'Declaration',
      component: SubmitStepForm,
      formKey: 'submitStepForm',
      pattern: '/submit'
    });

    if (filterSteps) {
      this.steps = this.steps.filter(filterSteps);
    }

    this.filteredSteps = this.steps.slice();
  }

  steps = [
    { id: 'start', label: 'Introduction', component: Start, pattern: '/start' },
    { id: 'profile', label: 'Business basics', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
    { id: 'business', label: 'Business details', component: BusinessInfoForm, pattern: '/business-info', formKey: 'businessInfoForm' },
    { id: 'info', label: 'Contacts', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
    { id: 'disclosures', label: 'Disclosures', component: DisclosuresForm, pattern: '/disclosures' },
    { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
    { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/tools', formKey: 'toolsForm' },
    { id: 'awards', label: 'Recognition', component: AwardsForm, pattern: '/awards', formKey: 'awardsForm' },
    { id: 'recruiter', label: 'Recruiter', component: RecruiterForm, pattern: '/recruiter', formKey: 'recruiterForm' },
    { id: 'digital', label: 'Services', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' },
    { id: 'pricing', label: 'Pricing', component: PricingForm, pattern: '/pricing', formKey: 'pricingForm' },
    { id: 'casestudy', label: 'Case studies', component: DomainList, pattern: '/case-study', formKey: 'caseStudyForm' },
    { id: 'candidates', label: 'Candidates', component: CandidatesForm, pattern: '/candidates', formKey: 'candidatesForm' },
    { id: 'products', label: 'Products', component: ProductsForm, pattern: '/products', formKey: 'productForm' },
    { id: 'review', label: 'Preview profile', component: Review, pattern: '/review' },
    { id: 'update', label: 'Preview and update', component: Review, pattern: '/update' },
    { id: 'finish-profile', label: 'Finish', component: FinishProfile, pattern: '/profile-finish' },
  ]

  filteredSteps = [];

  elementProps = {
    onClick: (e) => {
      e.preventDefault();
      const { actions } = this.props;

      if (this.step && this.step.id) {
        actions.stepComplete(this.step.id);
      }

      actions.stepNextPersist(this.nextStep.pattern, this.step);
    },
    onSubmit: (e) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }

      const { actions } = this.props;

      if (this.step && this.step.id) {
        actions.stepComplete(this.step.id);
      }

      if (!this.nextStep) {
        actions.submitApplication();
        return;
      }
      this.props.hasLiabilityDocExpired(false)
      this.props.hasWorkersDocExpired(false)
      this.props.hasMissingDailyRates(false)
      actions.stepNextPersist(this.nextStep.pattern, this.step);
    },
    onSubmitFailed: (e) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }
      this.props.hasLiabilityDocExpired(false)
      this.props.hasWorkersDocExpired(false)
      this.props.hasMissingDailyRates(false)
      const { actions } = this.props;
      actions.stepPartial(this.step.id);
    }
  }

  get currentStepIndex() {
    const { location } = this.props;
    return findIndex(this.filteredSteps, (step) => {
      let regex = new RegExp(`^${step.pattern}`);
      return location.pathname.match(regex);
    });
  }

  get step() {
    return this.filteredSteps[this.currentStepIndex];
  }

  get nextStep() {
    return this.filteredSteps[this.currentStepIndex + 1];
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    if (this.props.application.documents && this.props.application.documents.liability && isPast(this.props.application.documents.liability.expiry)) {
      this.props.hasLiabilityDocExpired(true)
    } else {
      this.props.hasLiabilityDocExpired(false)
    }

    if (this.props.application.documents && this.props.application.documents.workers && isPast(this.props.application.documents.workers.expiry)) {
      this.props.hasWorkersDocExpired(true)
    } else {
      this.props.hasWorkersDocExpired(false)
    }

    this.props.hasMissingDailyRates(isDailyRateMissing(this.props.application.pricing, this.props.application.services));
  }

  componentWillMount() {
    const { forms = {}, application = {}, dispatch, actions } = this.props;
    dispatchFormState(dispatch, forms, application);
    if (application.steps) {
      actions.setSteps(application.steps);
    }
  }

  render() {
    const { forms, location, steps = {}, actions } = this.props;

    let { recruiter = 'no'} = forms.recruiterForm;
    let filter = recruiter === 'yes' ? /\/pricing|\/case-study/ : (recruiter === 'no' ? /\/candidates/ : null )
    this.filteredSteps = this.steps.filter(s => !s.pattern.match(filter));

    let stepKeys = this.filteredSteps.map(s => s['id']);
    stepKeys = stepKeys.filter(s => s !== 'start' && s != 'submit');
    let doneKeys = keys(steps).filter(s => steps[s] === "complete" && s !== 'start' && s != 'submit');

    let stepsRemainingSet = new Set(difference(stepKeys, doneKeys));
    let stepsRemaining = this.filteredSteps.filter(s => stepsRemainingSet.has(s['id'])).map(s => s.label).join(', ');

    const applicationValid = stepsRemainingSet.size === 0;

    let { services = {} } = forms.domainSelectorForm;
    let { name = '', abn = '' } = forms.businessDetailsForm;
    let { representative = '', email = '' } = forms.yourInfoForm;

    services = Object
      .keys(services)
      .filter(s => services[s])
      .reduce((newServices, key) => {
        newServices[key] = services[key];
        return newServices;
      }, {});

    const hasDocumentsWarning = this.props.application.expiredLiabilityInsurance || this.props.application.expiredWorkersCompensation;
    const hasPricingWarning = this.props.application.missingDailyRates;
    const applicationErrors = this.props.applicationErrors ? this.props.applicationErrors : [];

    return (
      <div className="row">
        <Route path="/:route/:subroute?" render={({ match }) => {
          const { params = {} } = match;
          if (params.subroute) {
            return null;
          }

          return (
            <LocalNav className="col-xs-12 col-sm-3" navClassName="step-navigation" id="main-navigation">
              {this.filteredSteps.map(({ pattern, label, formKey, id }, i) => {
                const isActive = location.pathname === pattern;
                return (
                  <li key={i}>
                    <Link
                      to={pattern}
                      onClick={() => actions.navigateToStep(pattern)}
                      className={classNames({'is-active is-current': isActive})}
                    >
                      { (applicationErrors.map(ae => ae.step).indexOf(id) >= 0) ?
                        <Icon value="alert" size={34} aria-hidden="true"/>
                        :
                        <Icon value={classNames({
                            'to-do'       : (!steps[id] || steps[id] === STATUS.partial) && !isActive,
                            'completed'   : steps[id] === STATUS.complete && !isActive,
                            'in-progress' : isActive
                          })} size={34} aria-hidden="true"
                        />
                      }
                      <span>{label}</span>
                    </Link>
                  </li>
                )
              })}
            </LocalNav>
          )
        }} />



        <Switch>
          {this.filteredSteps.map(({pattern, exact, component, label}, i) => (
            <Route key={i} path={pattern} render={(routerProps) => {
              let isCaseStudyEditFlow = location.pathname.match(/case-study\/(edit|add)/);
              let isCaseStudyFlow = location.pathname.match(/case-study\/(edit|view|add)/);
              let isReviewFlow = location.pathname.match(/profile$/)
              const articleClassNames = classNames('col-xs-12', {
                'col-sm-8 col-sm-push-2': isCaseStudyEditFlow,
                'col-sm-8 col-sm-push-1': !isCaseStudyFlow && !isReviewFlow
              });
              const children = this.nextStep && <input type="hidden" name="next_step_slug" value={this.nextStep.pattern.slice(1)} />
              const props = Object.assign({},
                routerProps, {
                  applicationValid,
                  domains: this.props.application.domains,
                  stepsRemaining,
                  services,
                  nextRoute: this.nextStep && this.nextStep.pattern,
                  title: label,
                  buttonText: 'Save and continue',
                  actions: {
                    submitApplication: actions.submitApplication
                  },
                  name,
                  abn,
                  email,
                  representative,
                  recruiter
                },
                this.elementProps
              );

              const element = React.createElement(component, props, children);
              return (
                <DocumentTitle title={`${label || 'Application'} - Digital Marketplace`}>
                  <article id="content" className={articleClassNames}>
                    {element}
                  </article>
                </DocumentTitle>
              )
            }} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  applicant: PropTypes.object,
  applicationErrors: PropTypes.array,
  forms: PropTypes.object,
  filterSteps: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const { 
    application = {},
    application_errors = [],
    steps,
    options
  } = state;

  return {
    forms: getStateForms(state),
    application,
    applicationErrors: application_errors,
    steps,
    options,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions, ...stepActions }, dispatch),
  dispatch,
  hasLiabilityDocExpired: (bool) => {
    return dispatch(expiredLiabilityInsurance(bool));
  },
  hasWorkersDocExpired: (bool) => {
    return dispatch(expiredWorkersCompensation(bool));
  },
  hasMissingDailyRates: (bool) => {
    return dispatch(missingDailyRates(bool));
  }
});

export {
  Signup as SignupClass,
  mapStateToProps
}

const SignupWithRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup));

export default SignupWithRouter;
