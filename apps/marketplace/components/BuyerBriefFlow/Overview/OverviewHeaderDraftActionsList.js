import React from 'react'
import PropTypes from 'prop-types'

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

OverviewHeaderDraftActionsList.defaultProps = {
  brief: {},
  handleDeleteClick: () => {},
  isPartOfTeam: null,
  isTeamLead: null,
  teams: []
}

OverviewHeaderDraftActionsList.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  isPartOfTeam: PropTypes.bool.isRequired,
  isTeamLead: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired
}

export default OverviewHeaderDraftActionsList
