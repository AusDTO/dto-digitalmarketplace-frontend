import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { linkClick } from '../redux/modules/application';

const ConnectedLink = ({to, children, linkClick, ...rest}) => (
  <Link
    to={to}
    onClick={(e) => linkClick(to)}
    {...rest}>
    {children}
  </Link>
);

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = (dispatch) => {
  return {
    linkClick: (to) => {
      dispatch(linkClick(to))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedLink);