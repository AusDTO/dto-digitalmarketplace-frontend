import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import { publishAnswer } from 'marketplace/actions/briefActions'
import { loadQuestion } from 'marketplace/actions/questionActions'
import { required } from 'marketplace/components/validators'
import Textarea from 'shared/form/Textarea'
import { rootPath } from 'marketplace/routes'
import { ErrorBoxComponent } from 'shared/form/ErrorBox'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

const model = 'publishAQuestionForm'

class PublishAnswerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMessage: '',
      saved: false,
      brief: null,
      question: null
    }
  }

  componentWillMount() {
    this.setState({
      loading: true
    })
    const briefId = this.props.match.params.briefId
    const questionId = this.props.match.params.questionId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId, questionId).then(response => {
        let errorMessage = null
        let brief = null
        let question = null
        if (response.status !== 200) {
          errorMessage = response.errorMessage
        } else {
          brief = response.data.brief
          question = response.data.question
          if (question) {
            this.props.changeModel(`${model}.question`, question.data.question)
          }
        }
        this.setState({
          loading: false,
          errorMessage,
          brief,
          question
        })
      })
    }
  }

  handleSubmit(values) {
    const { brief, question } = this.state

    const submitData = {
      question: values.question ? values.question : null,
      answer: values.answer ? values.answer : null,
      questionId: question ? question.id : null
    }

    this.setState({
      loading: true
    })
    this.props.submit(brief.id, submitData).then(response => {
      let errorMessage = null
      if (response.status === 200) {
        this.props.clearModel(model)
        this.setState({
          saved: true
        })
      } else {
        errorMessage = response.errorMessage
        window.scrollTo(0, 0)
      }
      this.setState({
        loading: false,
        errorMessage
      })
    })
  }

  render() {
    const { brief, loading, errorMessage, saved } = this.state

    if (loading) {
      return <LoadingIndicatorFullPage />
    }

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

    if (brief && brief.id) {
      return (
        <DocumentTitle title="Publish an answer - Digital Marketplace">
          <React.Fragment>
            {errorMessage && (
              <div className="row">
                <div className="col-sm-push-2 col-sm-8 col-xs-12">
                  <AUpageAlert as="error">{errorMessage}</AUpageAlert>
                </div>
              </div>
            )}
            {saved ? (
              <div className="row">
                <div className="col-sm-push-2 col-sm-8 col-xs-12">
                  <AUpageAlert as="success">
                    <React.Fragment>
                      <AUheading level="4" size="md">
                        {`Thank you, your answer has been submitted successfully for ${brief.title}`}.
                      </AUheading>
                      <p>
                        <a href={`${rootPath}/brief/${brief.id}/questions`} className="au-btn">
                          Return to questions
                        </a>
                      </p>
                    </React.Fragment>
                  </AUpageAlert>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-sm-push-2 col-sm-8 col-xs-12">
                  <article role="main">
                    <Form model={model} id="askAQuestion" onSubmit={data => this.handleSubmit(data)}>
                      <h1 className="au-display-xl">{`Answer a seller question`}</h1>
                      <p>
                        You must publish answers to all relevant questions asked by sellers.{' '}
                        {brief.isOpenToAll
                          ? 'These will be publicly visible on the opportunity.'
                          : 'Only invited sellers and other buyers are able to view these answers on the opportunity page.'}
                      </p>
                      <p>
                        Questions about this opportunity must be answered before{' '}
                        <b>{format(new Date(brief.closedAt), 'DD/MM/YYYY')}</b>.
                      </p>
                      <Textarea
                        key={'question'}
                        model={`${model}.question`}
                        name={`question`}
                        id={`question`}
                        controlProps={{
                          limit: 100,
                          rows: '8'
                        }}
                        label={'Seller Question'}
                        validators={{ required }}
                        messages={{
                          required: `question is required`
                        }}
                      />
                      <Textarea
                        key={'answer'}
                        model={`${model}.answer`}
                        name={`answer`}
                        id={`answer`}
                        controlProps={{
                          limit: 100,
                          rows: '8'
                        }}
                        label={'Your answer'}
                        validators={{ required }}
                        messages={{
                          required: `answer is required`
                        }}
                      />
                      <input className="au-btn right-button-margin" type="submit" value="Publish answer" />
                      <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
                    </Form>
                  </article>
                </div>
              </div>
            )}
          </React.Fragment>
        </DocumentTitle>
      )
    }

    return null
  }
}

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: (briefId, questionId) => dispatch(loadQuestion(briefId, questionId)),
  clearModel: m => dispatch(actions.reset(m)),
  changeModel: (m, value) => dispatch(actions.change(m, value)),
  submit: (briefId, values) => dispatch(publishAnswer(briefId, values))
})

export default withRouter(
  connect(
    null,
    mapResetDispatchToProps
  )(PublishAnswerPage)
)
