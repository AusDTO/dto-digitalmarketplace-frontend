import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';

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
import DomainSelector       from '../DomainSelector';
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
import RecruiterForm         from '../RecruiterForm';


class Signup extends React.Component {

  constructor(props) {
    super(props);

    // Allow submit to be controlled by feature flag.
    // Use same pattern, so the URL can be consistent
    // Just different messaging/actions.
    const { options = {}, filterSteps } = props;
    if (options.submit_registration) {
      this.steps = this.steps.concat({
        id: 'submit',
        label: 'Declaration',
        component: SubmitStepForm,
        formKey: 'submitStepForm',
        pattern: '/submit'
      });
    } else {
      this.steps = this.steps.concat({
        id: 'finish',
        label: 'Finish',
        component: Finish,
        pattern: '/submit'
      });
    }

    if (filterSteps) {
      this.steps = this.steps.filter(filterSteps);
    }
  }

  steps = [
    { id: 'start', label: 'Introduction', component: Start, pattern: '/start' },
    { id: 'profile', label: 'Business basics', component: BusinessDetailsForm, pattern: '/business-details', formKey: 'businessDetailsForm' },
    { id: 'business', label: 'Business details', component: BusinessInfoForm, pattern: '/business-info', formKey: 'businessInfoForm' },
    { id: 'info', label: 'Contacts', component: YourInfoForm, pattern: '/your-info', formKey: 'yourInfoForm' },
    { id: 'documents', label: 'Documents', component: DocumentsForm, pattern: '/documents', formKey: 'documentsForm' },
    { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/tools', formKey: 'toolsForm' },
    { id: 'awards', label: 'Recognition', component: AwardsForm, pattern: '/awards', formKey: 'awardsForm' },
    //{ id: 'recruiter', label: 'Recruiter', component: RecruiterForm, pattern: '/recruiter', formKey: 'recruiterForm' },
    { id: 'digital', label: 'Services', component: DomainSelector, pattern: '/domains', formKey: 'domainSelectorForm' },
    { id: 'casestudy', label: 'Case studies', component: DomainList, pattern: '/case-study', formKey: 'caseStudyForm' },
    { id: 'products', label: 'Products', component: ProductsForm, pattern: '/products', formKey: 'productForm' },
    { id: 'review', label: 'Preview profile', component: Review, pattern: '/review' },
    { id: 'disclosures', label: 'Disclosures', component: DisclosuresForm, pattern: '/disclosures' },
    { id: 'finish-profile', label: 'Finish', component: FinishProfile, pattern: '/profile-finish' },
  ]

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
      const { actions } = this.props;
      actions.stepPartial(this.step.id);
    }
  }

  get currentStepIndex() {
    const { location } = this.props;
    return findIndex(this.steps, (step) => {
      let regex = new RegExp(`^${step.pattern}`);  
      return location.pathname.match(regex);
    });
  }

  get step() {
    return this.steps[this.currentStepIndex];
  }

  get nextStep() {
    return this.steps[this.currentStepIndex + 1];
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
    const applicationValid = (this.steps.length - 1) <= Object.keys(steps).length;
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

    return (
      <div className="row">
        <Route path="/:route/:subroute?" render={({ match }) => {
          const { params = {} } = match;
          if (params.subroute) {
            return null;
          }

          return (
            <LocalNav className="col-xs-12 col-sm-3" navClassName="step-navigation" id="main-navigation">
              {this.steps.map(({ pattern, label, formKey, id }, i) => {
                const isActive = location.pathname === pattern;
                return (
                  <li key={i}>
                    <Link
                      to={pattern}
                      onClick={() => actions.navigateToStep(pattern)}
                      className={classNames({'is-active is-current': isActive})}
                    >
                      <Icon value={classNames({
                          'to-do'       : (!steps[id] || steps[id] === STATUS.partial) && !isActive,
                          'completed'   : steps[id] === STATUS.complete && !isActive,
                          'in-progress' : isActive,
                        })} size={34} aria-hidden="true"
                      />
                      <span>{label}</span>
                    </Link>
                  </li>
                )
              })}
            </LocalNav>
          )
        }} />



        <Switch>
          {this.steps.map(({pattern, exact, component, label}, i) => (
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
                  representative
                },
                this.elementProps
              );

              const element = React.createElement(component, props, children);
              return (
                <article className={articleClassNames}>
                  {element}
                </article>
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
  dispatch: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired,
  applicant: React.PropTypes.object,
  forms: React.PropTypes.object,
  filterSteps: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const { application = {}, steps, options } = state;
  return {
    forms: getStateForms(state),
    application,
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

const SignupWithRouter = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signup));

export default SignupWithRouter;
