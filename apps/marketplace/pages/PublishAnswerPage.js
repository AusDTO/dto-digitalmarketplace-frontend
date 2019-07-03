import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { loadPublicBrief, publishAnswer } from 'marketplace/actions/briefActions'
import { required } from 'marketplace/components/validators'
import Textarea from 'shared/form/Textarea'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

const model = 'publishAQuestionForm'

class PublishAnswerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMessage: '',
      saved: false
    }
  }

  componentWillMount() {
    this.setState({
      loading: true
    })
    const briefId = this.props.match.params.briefId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId).then(response => {
        let errorMessage = null
        if (response.status !== 200) {
          errorMessage = response.errorMessage
        }
        this.setState({
          loading: false,
          errorMessage
        })
      })
    }
  }

  handleSubmit(values) {
    const { brief } = this.props

    const submitData = {
      question: values.question ? values.question : null,
      answer: values.answer ? values.answer : null
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
    const { brief } = this.props

    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (brief && brief.id) {
      return (
        <DocumentTitle title="Publish an answer - Digital Marketplace">
          <React.Fragment>
            {this.state.errorMessage && (
              <div className="row">
                <div className="col-sm-push-2 col-sm-8 col-xs-12">
                  <AUpageAlert as="error">{this.state.errorMessage}</AUpageAlert>
                </div>
              </div>
            )}
            {this.state.saved && (
              <div className="row">
                <div className="col-sm-push-2 col-sm-8 col-xs-12">
                  <AUpageAlert as="success">
                    <React.Fragment>
                      <AUheading level="4" size="md">
                        {`Thank you, your answer is submitted successfully for ${brief.title}`}.
                      </AUheading>
                      <p>
                        <a href={`${rootPath}/brief/${brief.id}/questions/published-answers`} className="au-btn">
                          Return to questions
                        </a>
                      </p>
                    </React.Fragment>
                  </AUpageAlert>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-sm-push-2 col-sm-8 col-xs-12">
                <article role="main">
                  <Form model={model} id="askAQuestion" onSubmit={data => this.handleSubmit(data)}>
                    <h1 className="au-display-xl">{`Publish a question and answer`}</h1>
                    <p>
                      You must make sure that suppliers have access to the same information about the work. This means
                      all suppliers will have an equal opportunity to win the contract.
                    </p>
                    <p>You must publish all questions and answers.</p>
                    <p>
                      {`All published questions and answers will be public. They'll appear at the bottom of your published requirements page.`}
                    </p>
                    <p>
                      Read more about{' '}
                      <a href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000575036#while-open">
                        how to manage supplier questions
                      </a>.
                    </p>
                    <h1 className="au-display-md">Supplier question</h1>
                    <p>You must:</p>
                    <ul>
                      <li>publish all questions that suppliers ask</li>
                      <li>publish 1 question at a time</li>
                      <li>
                        remove any reference to the supplier’s name or any confidential information about the supplier
                      </li>
                    </ul>
                    <Textarea
                      key={'question'}
                      model={`${model}.question`}
                      name={`question`}
                      id={`question`}
                      controlProps={{
                        limit: 100,
                        rows: '8'
                      }}
                      label={'Supplier Question'}
                      validators={{ required }}
                      messages={{
                        required: `question is required`
                      }}
                    />
                    <h1 className="au-display-md">Your answer</h1>
                    <p>You must:</p>
                    <ul>
                      <li>answer all supplier questions</li>
                      <li>give an individual response to each question even when questions are similar</li>
                      <li>publish 1 answer at a time</li>
                      <li>
                        answer all questions at least 1 working day before the deadline to give suppliers time to decide
                        if the work is right for them
                      </li>
                      <li>answer questions within 2 to 3 working days</li>
                      <li>answer questions more frequently when the deadline is approaching</li>
                    </ul>
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
                  </Form>
                </article>
              </div>
            </div>
          </React.Fragment>
        </DocumentTitle>
      )
    }

    return null
  }
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId)),
  clearModel: m => dispatch(actions.reset(m)),
  submit: (briefId, values) => dispatch(publishAnswer(briefId, values))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(PublishAnswerPage))
