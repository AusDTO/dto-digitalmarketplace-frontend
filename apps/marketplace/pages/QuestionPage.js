import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import QuestionsHeader from 'marketplace/components/Questions/QuestionsHeader'
import SellerQuestions from 'marketplace/components/Questions/SellerQuestions'
import PublishedAnswers from 'marketplace/components/Questions/PublishedAnswers'
import { hasPermission } from 'marketplace/components/helpers'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'

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
    const { isPartOfTeam, isTeamLead, teams } = this.props
    const { brief, questionCount } = this.state
    const briefId = this.props.match.params.briefId

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    if (brief.status && brief.status !== 'live') {
      return (
        <ErrorBoxComponent
          title="Pending questions cannot be viewed for this opportunity"
          errorMessage={
            <span>
              This could be because the opportunity is no longer live or has not yet been published. Please{' '}
              <a href={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>return to the overview page</a> to check
              or contact us if you have any issues.
            </span>
          }
          setFocus={setFocus}
          form={{}}
          invalidFields={[]}
        />
      )
    }

    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'answer_seller_questions')) {
      return <Redirect to={`${rootPath}/request-access/answer_seller_questions`} />
    }

    return (
      <BrowserRouter basename={`${rootPath}/brief/${briefId}/questions`}>
        <div>
          <QuestionsHeader brief={brief} questionCount={questionCount} />
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
  organisation: state.dashboard.buyerDashboardOrganisation,
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

export default withRouter(connect(mapStateToProps)(QuestionPage))
