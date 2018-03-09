import React from 'react'
import LinkList from '@gov.au/link-list/lib/js/react.js'
import { Switch, Route } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'
import BuyerDashboardMyBriefs from './BuyerDashboardMyBriefs'
import BuyerDashboardTeamBriefs from './BuyerDashboardTeamBriefs'
import BuyerDashboardTeamOverview from './BuyerDashboardTeamOverview'
import styles from './BuyerDashboard.scss'

const BuyerDashboard = props =>
  <div className={styles.container}>
    <div className={`${styles.header} row`}>
      <div className="col-md-12 col-sm-12">
        <h1 className="uikit-display-5">Opportunities</h1>
        <div className="row">
          <div className={`${styles.alignRight} col-xs-12`}>
            <LinkList
              inline
              items={[
                {
                  link: `${rootPath}/buyer-dashboard`,
                  text: 'My Briefs',
                  onClick: e => {
                    e.preventDefault()
                    props.history.push(`${rootPath}/buyer-dashboard`)
                  }
                },
                {
                  link: `${rootPath}/buyer-dashboard/team-briefs`,
                  text: 'Team Briefs',
                  onClick: e => {
                    e.preventDefault()
                    props.history.push(`${rootPath}/buyer-dashboard/team-briefs`)
                  }
                },
                {
                  link: `${rootPath}/buyer-dashboard/team-overview`,
                  text: 'Team overview',
                  onClick: e => {
                    e.preventDefault()
                    props.history.push(`${rootPath}/buyer-dashboard/team-overview`)
                  }
                }
              ]}
            />
            <a className={`${styles.firstButton} uikit-btn`} href="#url">
              Create new brief
            </a>
          </div>
        </div>
      </div>
    </div>
    <article role="main">
      <Switch>
        <Route exact path={props.match.url} render={() => <BuyerDashboardMyBriefs {...props} />} />
        <Route exact path={`${props.match.url}/team-briefs`} render={() => <BuyerDashboardTeamBriefs {...props} />} />
        <Route
          exact
          path={`${props.match.url}/team-overview`}
          render={() => <BuyerDashboardTeamOverview {...props} />}
        />
      </Switch>
    </article>
  </div>

export default BuyerDashboard
