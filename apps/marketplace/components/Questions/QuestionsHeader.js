import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import PageHeader from 'marketplace/components/PageHeader/PageHeader'
import PageNavigation from 'marketplace/components/PageNavigation/PageNavigation'
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
      <React.Fragment>
        <PageHeader organisation={`ID ${brief.id} ${brief.title}`} title="Questions" actions={[]} />
        <div className={`${styles.header} row`}>
          <div className="col-xs-12 col-md-12">
            <p>
              You must publish answers to all relevant questions asked by sellers before{' '}
              <b>{format(new Date(brief.closedAt), 'DD/MM/YYYY')}</b>.{' '}
              {brief.isOpenToAll
                ? 'These will be publicly visible on the opportunity.'
                : 'Only invited sellers and other buyers are able to view these answers on the opportunity page.'}
            </p>
            <p>
              If the question you want to answer does not appear, you can{' '}
              <a href={`${rootPath}/brief/${brief.id}/publish-answer`}>add additional questions</a>.
            </p>
          </div>
        </div>
        <PageNavigation
          links={[
            {
              exact: true,
              id: 'questions-link',
              text: (
                <React.Fragment>
                  Seller questions <span className={styles.subText}>({this.props.questionCount.questions})</span>
                </React.Fragment>
              ),
              to: '/'
            },
            {
              exact: true,
              id: 'answers-link',
              text: (
                <React.Fragment>
                  Published answers <span className={styles.subText}>({this.props.questionCount.answers})</span>
                </React.Fragment>
              ),
              to: '/published-answers'
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(QuestionsHeader)
