import React from 'react'
import { rootPath } from 'marketplace/routes'

const EmptyItemSelectMessage = () => (
  <li>
    User cannot be found. Check{' '}
    <a href={`${rootPath}/people`} rel="noopener noreferrer" target="_blank">
      current users
    </a>{' '}
    in your organisation.
  </li>
)

export default EmptyItemSelectMessage
