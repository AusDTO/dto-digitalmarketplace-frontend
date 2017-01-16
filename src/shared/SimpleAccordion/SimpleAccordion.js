import React from 'react';

import sheet from './SimpleAccordion.css';

export default ({ title, children }) => (
  <details styleName="sheet.details">
    <summary>{title}</summary>
    <div>{children}</div>
  </details>
)