import React from 'react'

import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import { canCloseOpportunity, hasPermission } from 'marketplace/components/helpers'

import styles from '../Overview.scss'

const OverviewHeaderPublishedActionsList = props => {
  const { brief, briefResponses, isPartOfTeam, isTeamLead, teams } = props
  const showCloseLink = canCloseOpportunity(brief, briefResponses)

  return (
    <ul className={styles.menuList}>
      <li>
        <div className={styles.headerMenuClosingTime}>
          Closing{' '}
          <strong>
            <ClosedDate countdown date={brief.dates.closing_time} />
          </strong>
        </div>
      </li>
      {showCloseLink && hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li>
          <a href={`${rootPath}/brief/${brief.id}/close`}>Close opportunity now</a>
        </li>
      )}
      {showCloseLink && !hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li>
          <a href={`${rootPath}/request-access/publish_opportunities`}>Close opportunity now</a>
        </li>
      )}
    </ul>
  )
}

export default OverviewHeaderPublishedActionsList
