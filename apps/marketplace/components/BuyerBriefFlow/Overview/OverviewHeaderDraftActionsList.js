import React from 'react'

import { hasPermission } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'

import styles from '../Overview.scss'

const OverviewHeaderDraftActionsList = props => {
  const { brief, handleDeleteClick, isPartOfTeam, isTeamLead, teams } = props

  return (
    <ul className={styles.menuList}>
      <li>
        {hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts') ||
        hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') ? (
          <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>Preview</a>
        ) : (
          <a href={`${rootPath}/request-access/create_drafts`}>Preview</a>
        )}
      </li>
      <li>
        {hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts') ||
        hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') ? (
          <a href="#delete" onClick={handleDeleteClick} className={styles.headerMenuDelete}>
            Delete draft
          </a>
        ) : (
          <a href={`${rootPath}/request-access/create_drafts`} className={styles.headerMenuDelete}>
            Delete draft
          </a>
        )}
      </li>
    </ul>
  )
}

export default OverviewHeaderDraftActionsList