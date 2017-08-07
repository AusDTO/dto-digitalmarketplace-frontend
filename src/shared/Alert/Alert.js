import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Icon from '../Icon';

import './Alert.css';

const TYPE_WARNING = 'warning';
const TYPE_SUCCESS = 'success';
const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';


const Alert = ({ title, type, children }) => {
  const styleName = classNames({
    'icon-box-warning': type === TYPE_WARNING,
    'icon-box-error': type === TYPE_ERROR,
    'icon-box-success': type === TYPE_SUCCESS,
    'icon-box-info': type === TYPE_INFO,
  });

  return (
    <div styleName={`alert ${type}`} aria-describedby={`alert-box-${type}`} tabIndex="-1" role="alert">
      <div styleName={`icon-box ${styleName}`}><Icon value={type} /></div>
      {title && <h2 id={`alert-box-${type}`}>{title}</h2>}
      <div>{children}</div>
    </div>
  )
};

Alert.propTypes = {
  type: PropTypes.oneOf([TYPE_WARNING, TYPE_ERROR, TYPE_SUCCESS, TYPE_INFO]).isRequired,
  title: PropTypes.string,
  children: PropTypes.any.isRequired
};

export default Alert;
