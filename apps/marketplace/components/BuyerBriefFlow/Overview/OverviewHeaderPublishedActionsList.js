import React from 'react'
import PropTypes from 'prop-types'

import ClosedDate from 'shared/ClosedDate'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'

import mainStyles from '../../../main.scss'
import styles from '../Overview.scss'

const OverviewHeaderPublishedActionsList = props => {
  const { brief, canCloseOpportunity, isPartOfTeam, isTeamLead, teams, isNewClosingTime } = props

  const closeHref = hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities')
    ? `${rootPath}/brief/${brief.id}/close`
    : `${rootPath}/request-access/publish_opportunities`

  const withdrawHref = hasPermission(isPartOfTeam, isTeamLead, teams, 'publish_opportunities')
    ? `${rootPath}/brief/${brief.id}/withdraw`
    : `${rootPath}/request-access/publish_opportunities`

  return (
    <React.Fragment>
      <ul className={`${styles.menuList} ${mainStyles.hideMobile}`}>
        <li>
          <div className={styles.headerMenuClosingTime}>
            Closing{' '}
            <strong>
              <ClosedDate countdown date={brief.dates.closing_time} isNewClosingTime={isNewClosingTime} />
            </strong>
          </div>
        </li>
        {canCloseOpportunity && (
          <li>
            <a href={closeHref}>Close opportunity now</a>
          </li>
        )}
        <li className={`${mainStyles.red} ${styles.hideMobile}`}>
          <a className={mainStyles.red} href={withdrawHref}>
            Withdraw opportunity
          </a>
        </li>
      </ul>
      <ul className={`${styles.menuList} ${mainStyles.hideDesktop}`}>
        {canCloseOpportunity && (
          <li>
            <a href={closeHref}>Close now</a>
          </li>
        )}
        <li className={`${mainStyles.red} ${styles.hideDesktop}`}>
          <a className={mainStyles.red} href={withdrawHref}>
            Withdraw
          </a>
        </li>
      </ul>
    </React.Fragment>
  )
}

OverviewHeaderPublishedActionsList.defaultProps = {
  brief: {},
  canCloseOpportunity: false,
  isPartOfTeam: null,
  isTeamLead: null,
  teams: [],
  isNewClosingTime: false
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
  teams: PropTypes.array.isRequired,
  isNewClosingTime: PropTypes.bool
}

export default OverviewHeaderPublishedActionsList
