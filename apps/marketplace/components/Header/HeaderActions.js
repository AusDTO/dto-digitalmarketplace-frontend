import React from 'react'

import AUaccordion from '@gov.au/accordion/lib/js/react.js'

const HeaderActions = () => (
  <div className="au-marketplace-header-actions">
    <AUaccordion header="Menu" speed={0.2}>
      <ul>
        <li>
          <a href="">Teams and people</a>
        </li>
        <li>
          <a href="/logout">Sign out</a>
        </li>
      </ul>
    </AUaccordion>
  </div>
)

export default HeaderActions
