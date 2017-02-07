import React from 'react';
import { connect } from 'react-redux';

import { linkClick } from '../redux/modules/application';

const ConnectedLink = ({to, children, linkClick, ...rest}) => (
  <a
    href={to}
    onClick={(e) => {
      e.preventDefault();
      linkClick(to);
    }} {...rest}>{children}</a>
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