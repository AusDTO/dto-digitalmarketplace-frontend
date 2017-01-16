import React from 'react';

import styles from './SimpleAccordion.css'; // eslint-disable-line no-unused-vars

export default ({ title, children }) => (
  <details styleName="styles.details">
    <summary>{title}</summary>
    <div>{children}</div>
  </details>
)