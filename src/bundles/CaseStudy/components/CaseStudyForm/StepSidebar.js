import React from 'react';
import { connect } from 'react-redux';
import StepLink from '../StepLink';

const StepSidebar = ({ items, step, location, action, dispatch }) => (
  <aside>
    <nav className="local-nav step-navigation">
      <ul>
        {items.map(({ path, label }, i) => (
          <li key={i}>
            <StepLink to={path} active={i + 1 === step} current={i + 1 === step}>
              {label}
              {(i + 1) < step && (
                <i className="fa fa-check green" aria-hidden="true"></i>
              )}
            </StepLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export const mapStateToProps = ({ form_options, router }, { items = [] }) => {
  return {
    items,
    ...form_options,
    ...router
  }
}

export default connect(mapStateToProps)(StepSidebar);