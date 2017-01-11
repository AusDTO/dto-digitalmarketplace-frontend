import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { linkClick } from '../redux/modules/application';

const ConnectedLink = ({to, children, linkClick, ...rest}) => (
  <Link to={to}>
    {({href, onClick}) => 
      <a onClick={(e) => {
        onClick(e);
        linkClick(to);
      }} href={href} {...rest}>{children}</a>
    }
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