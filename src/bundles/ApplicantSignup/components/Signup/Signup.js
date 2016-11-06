import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Link } from 'react-router';
import findIndex from 'lodash/findIndex';

import NotFound from '../../../../shared/NotFound';

import { stepNext, stepNextPersist, submitApplication } from '../../redux/modules/signup';

// Step Components
import Start from '../../../SellerRegistration/components/Start';
import YourInfoForm from '../../../SellerRegistration/components/YourInfoForm';
import BusinessDetailsForm from '../../../SellerRegistration/components/BusinessDetailsForm';
import CaseStudyForm from '../../../CaseStudy/components/CaseStudyForm';

class Signup extends React.Component {

  steps = [
    { label: 'Start', component: Start, pattern: '/start', exact: true },
    { label: 'Your Info', component: YourInfoForm, pattern: '/your-info', exact: true },
    { label: 'Business Details', component: BusinessDetailsForm, pattern: '/business-details', exact: true },
    { label: 'Case Study', component: CaseStudyForm, pattern: '/case-study', exact: true },
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
    }
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

  render() {
    return (
      <div className="row">
        <aside className="col-xs-12 col-sm-4">
          <nav className="local-nav step-navigation">
            <ul>
              {this.steps.map(({ pattern, label }, i) => (
                <li key={i}><Link to={pattern}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="col-xs-12 col-sm-8">
          {this.steps.map(({pattern, exact, component}, i) => {
            return (
              <Match key={i} pattern={pattern} exactly={exact} render={(routerProps) => {
                return React.createElement(component, Object.assign({}, routerProps, this.elementProps));
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
  location: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {};

};

export default connect(mapStateToProps)(Signup);