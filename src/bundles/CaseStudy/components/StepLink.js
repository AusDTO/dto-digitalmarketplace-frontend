import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { navigateStep } from '../../../shared/reduxModules/form_options';

class StepLink extends React.Component {
  render() {
    const { step, children, to, role, dispatch, active, current } = this.props
    let className = [];
    if (active) {
      className = className.concat('is-active');
    }
    if (current) {
      className = className.concat('is-current');
    }
    return (
      <Link
        to={to || `/step/${step}`}
        onClick={() => dispatch(navigateStep(step))}
        role={role}
        className={className.join(' ')}>
        {children}
      </Link>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export default connect(
  mapStateToProps
)(StepLink);
