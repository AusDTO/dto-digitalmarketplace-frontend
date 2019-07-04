import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerDashboard.scss'

class BuyerDashboardHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createNewIsOpen: false
    }

    this.handleCreateNewToggle = this.handleCreateNewToggle.bind(this)
  }

  handleCreateNewToggle() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.createNewIsOpen = !curState.createNewIsOpen
      return newState
    })
  }

  render() {
    return (
      <div className={`${styles.header} row`}>
        <div className="col-sm-12">
          <small className={styles.organisation}>{this.props.organisation}</small>
          <div className="row">
            <div className="col-xs-12">
              <h1 className="au-display-xl">Dashboard</h1>
            </div>
          </div>
          <div className={`${styles.menuRow} row`}>
            <div className="col-xs-12 col-md-8">
              <nav className={styles.dashNav}>
                <ul className={styles.menu}>
                  <li>
                    <NavLink id="all-link" to="/" activeClassName={styles.active} exact>
                      All{' '}
                      <span className={styles.subText}>
                        ({this.props.briefCounts.closed +
                          this.props.briefCounts.draft +
                          this.props.briefCounts.live +
                          this.props.briefCounts.withdrawn})
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="drafts-link" to="/draft-briefs" activeClassName={styles.active}>
                      Drafts <span className={styles.subText}>({this.props.briefCounts.draft})</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="Live-link" to="/live-briefs" activeClassName={styles.active}>
                      Live <span className={styles.subText}>({this.props.briefCounts.live})</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="Closed-link" to="/closed-briefs" activeClassName={styles.active}>
                      Closed{' '}
                      <span className={styles.subText}>
                        ({this.props.briefCounts.closed + this.props.briefCounts.withdrawn})
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={`${styles.dashActions} ${styles.createNew} col-xs-12 col-md-4 buyer-dashboard-actions`}>
              <AUaccordion
                header="Create new request"
                open={this.state.createNewIsOpen}
                onOpen={this.handleCreateNewToggle}
                onClose={this.handleCreateNewToggle}
              >
                <ul>
                  <li>
                    <a href="/2/buyer-specialist/create">Specialist</a>
                  </li>
                  <li>
                    <a href={`${rootPath}/outcome-choice`}>Outcome</a>
                  </li>
                  <li>
                    <a href="/buyers/frameworks/digital-marketplace/requirements/training">Training</a>
                  </li>
                </ul>
              </AUaccordion>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(BuyerDashboardHeader)
