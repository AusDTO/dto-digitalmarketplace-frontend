import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss, Link } from 'react-router';
import findIndex from 'lodash/findIndex';

import NotFound from '../../../../shared/NotFound';

// Step Components
import Start from '../../../SellerRegistration/components/Start';
import YourInfoForm from '../../../SellerRegistration/components/YourInfoForm';
import BusinessDetailsForm from '../../../SellerRegistration/components/BusinessDetailsForm';

class Signup extends React.Component {

  steps = [
    { label: 'Start', component: Start, pattern: '/start', exact: true },
    { label: 'Your Info', component: YourInfoForm, pattern: '/your-info', exact: true },
    { label: 'Business Details', component: BusinessDetailsForm, pattern: '/business-details', exact: true },
    { label: 'Case Study', component: NotFound, pattern: '/case-study', exact: true },
  ]

  elementProps = {
    onClick: (e) => {
      e.preventDefault();
      const { dispatch, router, location } = this.props;
      let idx = findIndex(this.steps, { pattern: location.pathname });
      dispatch({ type: 'step/next', transition: router.transitionTo, step: this.steps[idx + 1] })
    }
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
  return {
    startProps: {
      deed: 'http://',
      signup: 'http://'
    }
  };
};

export default connect(mapStateToProps)(Signup);