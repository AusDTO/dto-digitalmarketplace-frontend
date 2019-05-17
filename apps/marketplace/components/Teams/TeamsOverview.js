import React from 'react'

import AUbutton from '@gov.au/buttons'
import { rootPath } from 'marketplace/routes'

import styles from './TeamsOverview.scss'

const TeamsOverview = () => (
  <div className={styles.teams}>
    <div className={styles.initial}>
      <p>Easily track and manage access to opportunities created within your organisation.</p>
      <AUbutton as="secondary" href={`${rootPath}/teams/create/about`}>
        Create a team
      </AUbutton>
      <a href="">How teams work</a>
    </div>
  </div>
)

export default TeamsOverview
