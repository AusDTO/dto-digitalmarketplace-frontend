import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import styles from './Badges.css'; // eslint-disable-line no-unused-vars

const titleMap = {
  indigenous: 'Indigenous business',
  nfp_social_enterprise: 'Not-for-profit',
  recruitment: 'Recruiter',
  sme: 'SME',
  start_up: 'Start up',
  regional: 'Regional or non-metro based business',
  product: 'Product based business'
};

const Badges = ({ badges = {} }) => (
  <div styleName="styles.badges">
    {Object.keys(badges)
      // If type is not in our list or falsy, dont render an empty span.
      .filter(type => get(badges, type) && `${type}` in titleMap)
      .map((type, i) => (
      <span key={i} className={classNames(
        'badge--default',
        `badge__${type}`
      )} styleName={`styles.badge__${type}`}> {titleMap[type]}</span>
    ))}
  </div>
)

export default Badges;