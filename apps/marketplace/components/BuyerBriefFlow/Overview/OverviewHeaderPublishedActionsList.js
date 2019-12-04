import React from 'react'

import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'

import mainStyles from '../../../main.scss'
import styles from '../Overview.scss'

const OverviewHeaderPublishedActionsList = props => {
  const { brief, canCloseOpportunity, isPartOfTeam, isTeamLead, teams } = props

  return (
    <ul className={styles.menuList}>
      <li className={styles.hideMobile}>
        <div className={styles.headerMenuClosingTime}>
          Closing{' '}
          <strong>
            <ClosedDate countdown date={brief.dates.closing_time} />
          </strong>
        </div>
      </li>
      {canCloseOpportunity && hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={styles.hideMobile}>
          <a href={`${rootPath}/brief/${brief.id}/close`}>Close opportunity now</a>
        </li>
      )}
      {canCloseOpportunity && !hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={styles.hideMobile}>
          <a href={`${rootPath}/request-access/publish_opportunities`}>Close opportunity now</a>
        </li>
      )}
      {canCloseOpportunity && hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={styles.hideDesktop}>
          <a href={`${rootPath}/brief/${brief.id}/close`}>Close now</a>
        </li>
      )}
      {canCloseOpportunity && !hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={styles.hideDesktop}>
          <a href={`${rootPath}/request-access/publish_opportunities`}>Close now</a>
        </li>
      )}
      {brief.status === 'live' && hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={`${mainStyles.red} ${styles.hideMobile}`}>
          <a className={mainStyles.red} href={`${rootPath}/brief/${brief.id}/withdraw`}>
            Withdraw opportunity
          </a>
        </li>
      )}
      {brief.status === 'live' && !hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={`${mainStyles.red} ${styles.hideMobile}`}>
          <a className={mainStyles.red} href={`${rootPath}/request-access/publish_opportunities`}>
            Withdraw opportunity
          </a>
        </li>
      )}
      {brief.status === 'live' && hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={`${mainStyles.red} ${styles.hideDesktop}`}>
          <a className={mainStyles.red} href={`${rootPath}/brief/${brief.id}/withdraw`}>
            Withdraw
          </a>
        </li>
      )}
      {brief.status === 'live' && !hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities') && (
        <li className={`${mainStyles.red} ${styles.hideDesktop}`}>
          <a className={mainStyles.red} href={`${rootPath}/request-access/publish_opportunities`}>
            Withdraw
          </a>
        </li>
      )}
    </ul>
  )
}

export default OverviewHeaderPublishedActionsList
