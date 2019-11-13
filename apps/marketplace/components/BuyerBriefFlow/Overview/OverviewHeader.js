import React from 'react'

import AUheading from '@gov.au/headings/lib/js/react.js'
import ClosedDate from 'shared/ClosedDate'

import { hasPermission } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'

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
        {isPublished && !isClosed && (
          <div className={styles.headerMenuClosingTime}>
            Closing{' '}
            <strong>
              <ClosedDate countdown date={brief.dates.closing_time} />
            </strong>
          </div>
        )}
        <ul className={styles.menuList}>
          {isPublished && (
            <li>
              <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
            </li>
          )}
          {!isPublished && (
            <div>
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
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default OverviewHeader
