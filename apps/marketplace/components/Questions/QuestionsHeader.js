import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { rootPath } from 'marketplace/routes'
import styles from './Questions.scss'

class QuestionsHeader extends Component {
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
    const { brief } = this.props
    return (
      <div className={`${styles.header} row`}>
        <div className="col-sm-12">
          <small className={styles.organisation}>{this.props.organisation}</small>
          <div className="row">
            <div className="col-xs-12">{`ID ${brief.id} ${brief.title}`}</div>
            <div className="col-xs-12">
              <h1 className="au-display-xl">Questions</h1>
            </div>
          </div>
          <div className={`${styles.menuRow} row`}>
            <div className="col-xs-12 col-md-12">
              <p>
                You must publish answers to all relevant questions asked by sellers. These will be publicly visible on
                the opportunity.
              </p>
              <p>
                If the question you want to answer does not appear, you can{' '}
                <a href={`${rootPath}/brief/${brief.id}/publish-answer`}>add additional questions</a>.
              </p>
            </div>
          </div>
          <div className={`${styles.menuRow} row`}>
            <div className="col-xs-12 col-md-12">
              <nav className={styles.dashNav}>
                <ul className={styles.menu}>
                  <li>
                    <NavLink id="questions-link" to="/" activeClassName={styles.active} exact>
                      Seller questions <span className={styles.subText}>({this.props.questionCount.questions})</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="answers-link" to="/published-answers" activeClassName={styles.active}>
                      Published answers <span className={styles.subText}>({this.props.questionCount.answers})</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(QuestionsHeader)
