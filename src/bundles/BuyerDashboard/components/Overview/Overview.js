import React from 'react'
import { connect } from 'react-redux'

import './Overview.css'

const Overview = ({meta = {}}) => (
  <h2>Overview!</h2>
)

const mapStateToProps = ({meta}, ownProps) => {
  return {
    ...ownProps,
    meta
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
