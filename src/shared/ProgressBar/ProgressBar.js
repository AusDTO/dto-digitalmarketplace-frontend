import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

const ProgressBar = ({ value, max }) => {
  const className = classNames('progress-bar__progress', {
    'progress-bar--max': max <= value
  });
  
  let progress = value / max * 100;
  if (progress > 100) {
    progress = 100;
  }

  return (
    <div className="progress-bar">
      <div className={className} style={{ width: `${progress}%`}}></div>
    </div>
  )
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default ProgressBar;