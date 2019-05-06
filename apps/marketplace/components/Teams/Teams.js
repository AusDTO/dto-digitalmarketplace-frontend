import React from 'react'

import AUbutton from '@gov.au/buttons'

import styles from './Teams.scss'

const Teams = () => (
  <div className={styles.teams}>
    <div className={styles.teamsInitialView}>
      <p>Easily track and manage access to opportunities created within your organisation.</p>
      <AUbutton as="secondary" href="#">
        Create a team
      </AUbutton>
      <a href="">How teams work</a>
    </div>
  </div>
)

export default Teams
