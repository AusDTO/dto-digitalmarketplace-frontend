import React from 'react'

import AUskipLink from '@gov.au/skip-link/lib/js/react.js'

import styles from './SkipToLinks.scss'

const SkipToLinks = () => (
  <div className={styles.skipTo}>
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
