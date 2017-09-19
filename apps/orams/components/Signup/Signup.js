import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import keys from 'lodash/keys';
import difference from 'lodash/difference';

import Icon     from 'shared/Icon';
import NotFound from 'shared/NotFound';
import LocalNav from 'shared/LocalNav';

import { actions as stepActions, STATUS } from 'orams/actions/stepsActions';
import { getStateForms, dispatchFormState } from 'orams/actions/helpers';
import { actions } from 'orams/actions/sellerRegistrationActions';

// Step Components
import BusinessDetailsForm  from '../BusinessDetailsForm';
import BusinessInfoForm     from '../BusinessInfoForm';
import YourInfoForm         from '../YourInfoForm';
import ToolsForm            from '../ToolsForm';
import AwardsForm           from '../AwardsForm';
import SubmitStepForm       from '../Submit';
import FinishProfile        from '../FinishProfile';


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
    { id: 'profile', label: 'Business basics', component: BusinessDetailsForm, pattern: '/orams/business-details', formKey: 'businessDetailsForm' },
    { id: 'business', label: 'Business details', component: BusinessInfoForm, pattern: '/orams/business-info', formKey: 'businessInfoForm' },
    { id: 'info', label: 'Contacts', component: YourInfoForm, pattern: '/orams/your-info', formKey: 'yourInfoForm' },
    { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/orams/tools', formKey: 'toolsForm' },
    { id: 'awards', label: 'Recognition', component: AwardsForm, pattern: '/orams/awards', formKey: 'awardsForm' },
    { id: 'finish-profile', label: 'Finish', component: FinishProfile, pattern: '/orams/profile-finish' }
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

  componentWillMount() {
    const { forms = {}, application = {}, dispatch, actions } = this.props;
    dispatchFormState(dispatch, forms, application);
    if (application.steps) {
      actions.setSteps(application.steps);
    }
  }

  render() {
    const { forms, location, steps = {}, actions } = this.props;
    
    let { recruiter = 'no'} = 'no';
    let filter = recruiter === 'yes' ? /\/case-study/ : (recruiter === 'no' ? /\/candidates/ : null )
    this.filteredSteps = this.steps.filter(s => !s.pattern.match(filter));

    let stepKeys = this.filteredSteps.map(s => s['id']);
    stepKeys = stepKeys.filter(s => s !== 'start' && s != 'submit');
    let doneKeys = keys(steps).filter(s => steps[s] === "complete" && s !== 'start' && s != 'submit');

    let stepsRemainingSet = new Set(difference(stepKeys, doneKeys));
    let stepsRemaining = this.filteredSteps.filter(s => stepsRemainingSet.has(s['id'])).map(s => s.label).join(', ');

    const applicationValid = stepsRemainingSet.size === 0;

    let { name = '', abn = '' } = forms.businessDetailsForm;
    let { representative = '', email = '' } = forms.yourInfoForm;


    return (
      <div className="row">
        <Route path="/:route/:subroute?" render={({ match }) => {
          const { params = {} } = match;
          {/*if (params.subroute) {
            return null;
          }*/}

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
          {/*{this.filteredSteps.map(({pattern, exact, component, label}, i) => (
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
          ))}*/}
          <article className='col-xs-12 col-sm-8 col-sm-push-1'>
            <Route component={BusinessDetailsForm} />
          </article>
          {/*<Route component={NotFound} />*/}
        </Switch>
      </div>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  applicant: PropTypes.object,
  forms: PropTypes.object,
  filterSteps: PropTypes.func
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

const SignupWithRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup));

export default SignupWithRouter;
