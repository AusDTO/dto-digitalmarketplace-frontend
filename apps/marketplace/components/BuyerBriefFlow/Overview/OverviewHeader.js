import React from 'react'
import PropTypes from 'prop-types'

import AUheading from '@gov.au/headings/lib/js/react.js'

import OverviewHeaderDraftActionsList from './OverviewHeaderDraftActionsList'
import OverviewHeaderPublishedActionsList from './OverviewHeaderPublishedActionsList'
import OverviewHeaderDefaultActionsList from './OverviewHeaderDefaultActionsList'

import styles from '../Overview.scss'

const OverviewHeader = props => {
  const {
    brief,
    canCloseOpportunity,
    flowName,
    handleDeleteClick,
    isPartOfTeam,
    isTeamLead,
    teams,
    isNewClosingTime
  } = props

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
        {brief.status === 'draft' && (
          <OverviewHeaderDraftActionsList
            brief={brief}
            onDeleteClick={handleDeleteClick}
            isPartOfTeam={isPartOfTeam}
            isTeamLead={isTeamLead}
            teams={teams}
          />
        )}
        {brief.status === 'live' && (
          <OverviewHeaderPublishedActionsList
            brief={brief}
            canCloseOpportunity={canCloseOpportunity}
            isPartOfTeam={isPartOfTeam}
            isTeamLead={isTeamLead}
            teams={teams}
            isNewClosingTime={isNewClosingTime}
          />
        )}
        {['closed', 'withdrawn'].includes(brief.status) && <OverviewHeaderDefaultActionsList brief={brief} />}
      </div>
    </div>
  )
}

OverviewHeader.defaultProps = {
  brief: {},
  canCloseOpportunity: null,
  flowName: '',
  handleDeleteClick: () => {},
  isPartOfTeam: null,
  isTeamLead: null,
  teams: [],
  isNewClosingTime: false
}

OverviewHeader.propTypes = {
  brief: PropTypes.shape({
    internalReference: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  canCloseOpportunity: PropTypes.bool.isRequired,
  flowName: PropTypes.string.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  isPartOfTeam: PropTypes.bool.isRequired,
  isTeamLead: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired,
  isNewClosingTime: PropTypes.bool
}

export default OverviewHeader
