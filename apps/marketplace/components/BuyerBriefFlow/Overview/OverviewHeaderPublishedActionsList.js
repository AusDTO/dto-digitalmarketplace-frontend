import React from 'react'
import PropTypes from 'prop-types'

import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'

import styles from '../Overview.scss'
import mainStyles from '../../../main.scss'

const OverviewHeaderPublishedActionsList = props => {
  const { brief, canCloseOpportunity, isPartOfTeam, isTeamLead, teams } = props

  const closeHref = hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities')
    ? `${rootPath}/brief/${brief.id}/close`
    : `${rootPath}/request-access/publish_opportunities`

  return (
    <React.Fragment>
      <ul className={`${styles.menuList} ${mainStyles.hideMobile}`}>
        <li>
          <div className={styles.headerMenuClosingTime}>
            Closing{' '}
            <strong>
              <ClosedDate countdown date={brief.dates.closing_time} />
            </strong>
          </div>
        </li>
        <li>
          <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
        </li>
        {canCloseOpportunity && (
          <li>
            <a href={closeHref}>Close opportunity now</a>
          </li>
        )}
      </ul>
      <ul className={`${styles.menuList} ${mainStyles.hideDesktop}`}>
        <li>
          <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</a>
        </li>
        {canCloseOpportunity && (
          <li>
            <a href={closeHref}>Close now</a>
          </li>
        )}
      </ul>
    </React.Fragment>
  )
}

OverviewHeaderPublishedActionsList.defaultProps = {
  brief: {},
  canCloseOpportunity: false,
  isPartOfTeam: null,
  isTeamLead: null,
  teams: []
}

OverviewHeaderPublishedActionsList.propTypes = {
  brief: PropTypes.shape({
    dates: PropTypes.shape({
      closing_time: PropTypes.string.isRequired
    }),
    id: PropTypes.number.isRequired
  }).isRequired,
  canCloseOpportunity: PropTypes.bool.isRequired,
  isPartOfTeam: PropTypes.bool.isRequired,
  isTeamLead: PropTypes.bool.isRequired,
  teams: PropTypes.array.isRequired
}

export default OverviewHeaderPublishedActionsList
