import React from 'react'

import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

const BuyerHeaderActions = () => (
  <AUaccordion closed header="Menu" speed={0.2}>
    <ul>
      <li>
        <a href={`${rootPath}/buyer-dashboard`}>Dashboard</a>
      </li>
      <li>
        <a href={`${rootPath}/teams`}>Teams and people</a>
      </li>
      <li>
        <a href={`${rootPath}/download-reports`}>Download reports</a>
      </li>
      <li>
        <a href="/logout">Sign out</a>
      </li>
    </ul>
  </AUaccordion>
)

export default BuyerHeaderActions
