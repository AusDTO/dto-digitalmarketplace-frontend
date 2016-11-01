import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { navigateStep } from '../../../shared/reduxModules/form_options';

class StepLink extends React.Component {
  render() {
    const { step, children, to, className, role, dispatch } = this.props
    return (
      <Link to={to || `/step/${step}`}>{
        ({isActive, location, href, onClick, transition}) =>
          <a href={href} role={role} className={className} onClick={e => {
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
