import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
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
                    <NavLink id="my-briefs-link" to="/" activeClassName={styles.active} exact>
                      My opportunities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="team-briefs-link" to="/team-briefs" activeClassName={styles.active}>
                      Team opportunities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="team-overview-link" to="/team-overview" activeClassName={styles.active}>
                      Team overview
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={`${styles.dashActions} ${styles.createNew} col-xs-12 col-md-4 buyer-dashboard-actions`}>
              <AUaccordion
                header="Create new request"
                closed={this.state.createNewIsClosed}
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
