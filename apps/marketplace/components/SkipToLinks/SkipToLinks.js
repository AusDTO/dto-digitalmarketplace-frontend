import React from 'react'

import AUskipLink from '@gov.au/skip-link/lib/js/react.js'

const SkipToLinks = () => (
  <div>
    <AUskipLink
      links={[
        {
          link: '#content',
          text: 'Skip to content'
        },
        {
          link: '#main-navigation',
          text: 'Skip to navigation'
        }
      ]}
    />
  </div>
)

export default SkipToLinks
