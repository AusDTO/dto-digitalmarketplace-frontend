import React from 'react';
import classNames from 'classnames';

import Icon from '../Icon';

const TYPE_WARNING = 'warning';
const TYPE_SUCCESS = 'success';
const TYPE_INFO = 'info';
const TYPE_ERROR = 'error';


const Alert = ({ title, type, children }) => {
  const className = classNames('form-validation', {
    'form-validation--type-warning': type === TYPE_WARNING,
    'form-validation--type-error': type === TYPE_ERROR,
    'form-validation--type-success': type === TYPE_SUCCESS,
    'form-validation--type-info': type === TYPE_INFO,
  });

  return (
    <div className={className} aria-describedby={`alert-box-${type}`} tabIndex="-1" role="alert">
      <div className="icon-box"><Icon value={type} /></div>
      <h2 id={`alert-box-${type}`}>{title}</h2>
      <div>{children}</div>
    </div>
  )
};

Alert.propTypes = {
  type: React.PropTypes.oneOf([TYPE_WARNING, TYPE_ERROR, TYPE_SUCCESS, TYPE_INFO]).isRequired,
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.any.isRequired
};

export default Alert;
