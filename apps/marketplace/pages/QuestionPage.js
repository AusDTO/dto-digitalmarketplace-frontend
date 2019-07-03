import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter } from 'react-router-dom'
import QuestionsHeader from 'marketplace/components/Questions/QuestionsHeader'
import SellerQuestions from 'marketplace/components/Questions/SellerQuestions'
import PublishedAnswers from 'marketplace/components/Questions/PublishedAnswers'
import { rootPath } from 'marketplace/routes'

export class QuestionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brief: {
        title: '',
        internalReference: '',
        id: ''
      },
      questionCount: {
        questions: 0,
        answers: 0
      }
    }
  }

  questionCountUpdated(questionCount) {
    this.setState({
      questionCount
    })
  }

  briefUpdated(brief) {
    this.setState({
      brief
    })
  }

  render() {
    const props = this.props
    const briefId = props.match.params.briefId
    return (
      <BrowserRouter basename={`${rootPath}/brief/${briefId}/questions`}>
        <div>
          <QuestionsHeader brief={this.state.brief} questionCount={this.state.questionCount} />
          <article role="main">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <SellerQuestions
                    briefId={briefId}
                    briefUpdated={b => this.briefUpdated(b)}
                    questionCountUpdated={bc => this.questionCountUpdated(bc)}
                  />
                )}
              />
              <Route
                path="/published-answers"
                render={() => (
                  <PublishedAnswers
                    briefId={briefId}
                    briefUpdated={b => this.briefUpdated(b)}
                    questionCountUpdated={bc => this.questionCountUpdated(bc)}
                  />
                )}
              />
            </Switch>
          </article>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  organisation: state.dashboard.buyerDashboardOrganisation
})

export default withRouter(connect(mapStateToProps)(QuestionPage))
