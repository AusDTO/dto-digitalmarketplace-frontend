import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import styles from './Badges.css'; // eslint-disable-line no-unused-vars

export const titleMap = {
  consultant_only: 'Consultant',
  recruiter_both: 'Consultant',
  indigenous: 'Indigenous business',
  disability: 'Australian disability enterprise',
  nfp_social_enterprise: 'Not-for-profit',
  start_up: 'Start-up',
  sme: 'SME (self-reported)',
  product: 'Products',
  labourHire: 'ICT Labour Hire'
};

const Badges = ({ badges = {} }) => (
  <div styleName="styles.badges">
    {Object.keys(titleMap)
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