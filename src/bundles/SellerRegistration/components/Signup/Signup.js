import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import keys from 'lodash/keys';
import difference from 'lodash/difference';
import DocumentTitle from 'react-document-title';

import Icon     from '../../../../shared/Icon';
import NotFound from '../../../../shared/NotFound';
import LocalNav from '../../../../shared/LocalNav';

import { actions as stepActions, STATUS } from '../../redux/modules/steps';
import { getStateForms, dispatchFormState } from '../../redux/helpers';
import { actions } from '../../redux/modules/application';

// Step Components
import Start                from '../Start';
import YourInfoForm         from '../YourInfoForm';
import BusinessDetailsForm  from '../BusinessDetailsForm';
import BusinessInfoForm     from '../BusinessInfoForm';
import DisclosuresForm      from '../DisclosuresForm';
import AwardsForm           from '../AwardsForm';
import ToolsForm            from '../ToolsForm';
import DocumentsForm        from '../DocumentsForm';
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
    { id: 'business-details', label: 'Business basics', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
    { id: 'business-info', label: 'Business details', component: BusinessInfoForm, pattern: '/business-info', formKey: 'businessInfoForm' },
    { id: 'your-info', label: 'Contacts', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
    { id: 'disclosures', label: 'Disclosures', component: DisclosuresForm, pattern: '/disclosures' },
    { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
    { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/tools', formKey: 'toolsForm' },
    { id: 'awards', label: 'Recognition', component: AwardsForm, pattern: '/awards', formKey: 'awardsForm' },
    { id: 'recruiter', label: 'Recruiter', component: RecruiterForm, pattern: '/recruiter', formKey: 'recruiterForm' },
    { id: 'candidates', label: 'Candidates', component: CandidatesForm, pattern: '/candidates', formKey: 'candidatesForm' },
    { id: 'products', label: 'Products', component: ProductsForm, pattern: '/products', formKey: 'productForm' },
    { id: 'review', label: 'Preview profile', component: Review, pattern: '/review' },
    { id: 'update', label: 'Preview and submit', component: Review, pattern: '/update' },
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
      actions.stepNextPersist(this.nextStep.pattern, this.step);
    },
    onSubmitFailed: (e) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }
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
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    const { forms = {}, application = {}, dispatch, actions } = this.props;
    dispatchFormState(dispatch, forms, application);
    if (application.steps) {
      actions.setSteps(application.steps);
    }
  }

  render() {
    const { forms, location, steps = {}, actions, application } = this.props;

    let { recruiter = 'no'} = forms.recruiterForm;
    let filter = null
    if (recruiter === 'no') {
      filter = /\/candidates/
    }
    this.filteredSteps = this.steps.filter(s => !s.pattern.match(filter));

    let stepKeys = this.filteredSteps.map(s => s['id']);
    stepKeys = stepKeys.filter(s => s !== 'start' && s != 'submit');
    let doneKeys = keys(steps).filter(s => steps[s] === "complete" && s !== 'start' && s != 'submit');

    let stepsRemainingSet = new Set(difference(stepKeys, doneKeys));
    let stepsRemaining = this.filteredSteps.filter(s => stepsRemainingSet.has(s['id'])).map(s => s.label).join(', ');

    const applicationValid = stepsRemainingSet.size === 0;

    let { name = '', abn = '' } = forms.businessDetailsForm;
    let { representative = '', email = '' } = forms.yourInfoForm;

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
                      { (application.type == 'edit' && applicationErrors.map(ae => ae.step).indexOf(id) >= 0) ?
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
                  type: this.props.application.type,
                  confirmDiscard: this.props.application.confirmDiscard,
                  stepsRemaining,
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
                  recruiter,
                  supplier: this.props.application.supplier
                },
                this.elementProps
              );

              const element = React.createElement(component, props, children);
              return (
                <DocumentTitle title={`${label || 'Application'} - Digital Marketplace`}>
                  <article id="content" className={articleClassNames}>
                      {application.type === 'edit' && (
                        <AUpageAlert as="warning" style={{ marginBottom: '1.5em' }}>
                          <p>
                            You cannot update your profile <strong>between 20 and 30 May</strong> while we move 
                            Marketplace to BuyICT. You can update your profile on{' '}
                            <a href="https://www.buyict.gov.au" rel="external" target="_blank">
                              BuyICT
                            </a>{' '}
                            <strong>after 30 May</strong>.
                          </p>
                        </AUpageAlert>
                      )}
                      {application.type === 'new' && (
                        <AUpageAlert as="warning" style={{ marginBottom: '1.5em' }}>
                          <p>
                            Applications to join the Digital Marketplace will be closed{' '}
                            <strong>between 9 and 30 May</strong> while we move Digital Marketplace to BuyICT. You can 
                            reapply on{' '}
                            <a href="https://www.buyict.gov.au" rel="external" target="_blank">
                              BuyICT
                            </a>{' '}
                            <strong>after 30 May</strong>.
                          </p>
                        </AUpageAlert>
                      )}
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
  filterSteps: PropTypes.func,
  confirmDiscard: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  const { 
    application = {},
    application_errors = [],
    steps,
    options,
    confirmDiscard
  } = state;

  return {
    forms: getStateForms(state),
    application,
    applicationErrors: application_errors,
    confirmDiscard,
    steps,
    options,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions, ...stepActions }, dispatch),
  dispatch
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
