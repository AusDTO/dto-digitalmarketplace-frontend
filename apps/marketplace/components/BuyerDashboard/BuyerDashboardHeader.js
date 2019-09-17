import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'
import PageHeader from 'marketplace/components/PageHeader/PageHeader'
import PageNavigation from 'marketplace/components/PageNavigation/PageNavigation'
import styles from './BuyerDashboard.scss'

class BuyerDashboardHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createNewIsClosed: true
    }

    this.handleCreateNewToggle = this.handleCreateNewToggle.bind(this)
  }

  handleCreateNewToggle() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.createNewIsClosed = !curState.createNewIsClosed
      return newState
    })
  }

  render() {
    const { briefCounts, isPartOfTeam, isTeamLead, organisation, teams } = this.props
    return (
      <React.Fragment>
        <PageHeader
          organisation={organisation}
          title="Dashboard"
          actions={[
            <div key="create-opportunity" className={`${styles.createNew} buyer-dashboard-actions`}>
              <AUaccordion
                header="Create new request"
                closed={this.state.createNewIsClosed}
                onOpen={this.handleCreateNewToggle}
                onClose={this.handleCreateNewToggle}
              >
                {hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts') ? (
                  <ul>
                    <li>
                      <a href={`${rootPath}/buyer-specialist/create`}>Specialist</a>
                    </li>
                    <li>
                      <a href={`${rootPath}/outcome-choice`}>Outcome</a>
                    </li>
                    <li>
                      <a href="/2/buyer-training2/create">Training</a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <a href={`${rootPath}/request-access/create_drafts`}>Specialist</a>
                    </li>
                    <li>
                      <a href={`${rootPath}/request-access/create_drafts`}>Outcome</a>
                    </li>
                    <li>
                      <a href={`${rootPath}/request-access/create_drafts`}>Training</a>
                    </li>
                  </ul>
                )}
              </AUaccordion>
            </div>
          ]}
        />
        <PageNavigation
          links={[
            {
              exact: true,
              id: 'all-link',
              text: (
                <React.Fragment>
                  All{' '}
                  <span className={styles.subText}>
                    ({briefCounts.closed + briefCounts.draft + briefCounts.live + briefCounts.withdrawn})
                  </span>
                </React.Fragment>
              ),
              to: '/'
            },
            {
              exact: false,
              id: 'drafts-link',
              text: (
                <React.Fragment>
                  Drafts <span className={styles.subText}>({briefCounts.draft})</span>
                </React.Fragment>
              ),
              to: '/draft-briefs'
            },
            {
              exact: false,
              id: 'live-link',
              text: (
                <React.Fragment>
                  Live <span className={styles.subText}>({briefCounts.live})</span>
                </React.Fragment>
              ),
              to: '/live-briefs'
            },
            {
              exact: false,
              id: 'closed-link',
              text: (
                <React.Fragment>
                  Closed <span className={styles.subText}>({briefCounts.closed + briefCounts.withdrawn})</span>
                </React.Fragment>
              ),
              to: '/closed-briefs'
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

export default withRouter(connect(mapStateToProps)(BuyerDashboardHeader))
