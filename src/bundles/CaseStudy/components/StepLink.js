import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
      <Link to={to || `/step/${step}`}>{
        ({isActive, location, href, onClick, transition}) =>
          <a href={href} role={role} className={className.join(' ')} onClick={e => {
            dispatch(navigateStep(step));
            onClick(e)
          }}>{children}</a>
      }</Link>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export default connect(
  mapStateToProps
)(StepLink);
