import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'

import OverviewHeaderDraftActionsList from './OverviewHeaderDraftActionsList'
import OverviewHeaderPublishedActionsList from './OverviewHeaderPublishedActionsList'
import OverviewHeaderClosedActionsList from './OverviewHeaderClosedActionsList'

import styles from '../Overview.scss'

const OverviewHeader = props => {
  const { brief, flowName, handleDeleteClick, isClosed, isPublished, isPartOfTeam, isTeamLead, teams } = props

  return (
    <div className={styles.header}>
      <small className={styles.tagLine}>{brief.title || `New ${flowName} request`}</small>
      {brief.internalReference && (
        <small className={`${styles.internalReference} ${styles.tagLine}`}>{brief.internalReference}</small>
      )}
      <AUheading className={styles.overviewHeading} size="xl" level="1">
        Overview
      </AUheading>
      <div className={styles.headerMenu}>
        {!isPublished && (
          <OverviewHeaderDraftActionsList
            brief={brief}
            handleDeleteClick={handleDeleteClick}
            isPartOfTeam={isPartOfTeam}
            isTeamLead={isTeamLead}
            teams={teams}
          />
        )}
        {isPublished && !isClosed && <OverviewHeaderPublishedActionsList brief={brief} />}
        {isPublished && isClosed && <OverviewHeaderClosedActionsList brief={brief} />}
      </div>
    </div>
  )
}

export default OverviewHeader
