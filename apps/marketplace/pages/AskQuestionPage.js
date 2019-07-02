import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Errors, Form, actions } from 'react-redux-form'
import { withRouter, Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import format from 'date-fns/format'
import { loadPublicBrief, submitSupplierQuestion } from 'marketplace/actions/briefActions'
import { required, requiredFile, validEmail, validPercentage } from 'marketplace/components/validators'
import Textarea from 'shared/form/Textarea'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

const model = 'askAQuestionForm'

const getOpportunityUrl = (brief) => {
  return brief.lot === 'rfx' || brief.lot === 'atm' || brief.lot === 'specialist' ? (
    `${rootPath}/digital-marketplace/opportunities/${brief.id}`
  ) : (
    `/digital-marketplace/opportunities/${brief.id}`
  )
}

class AskQuestionPage extends Component {
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
        if (response.status === 200) {
        }
        this.setState({
          loading: false
        })
      })
    }
  }

  handleSubmit(values) {
    const {
      brief,
      model,
      supplierCode
    } = this.props

    const submitData = {
      question: values.question ? values.question : null,
      supplierCode
    }

    this.setState({
      loading: true
    })
    this.props.submitSupplierQuestion(brief.id, submitData).then(response => {
      let errorMessage = null;
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
    const {
      brief
    } = this.props

    if (this.state.saved) {
      return <Redirect to={getOpportunityUrl(brief)} />
    }
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.props.brief && this.props.brief.id) {
      return (
        <div className="row">
          <DocumentTitle title="Ask a question - Digital Marketplace">
            <div className="col-sm-push-2 col-sm-8 col-xs-12">
              <article role="main">
                {this.state.errorMessage && (
                  <AUpageAlert as="error">
                    {this.state.errorMessage}
                  </AUpageAlert>
                )}
                <Form
                  model={model}
                  id="askAQuestion"
                  onSubmit={data => this.handleSubmit(data)}
                  validators={{
                    question: {required}
                  }}
                >
                  <h1 className="au-display-xl">Ask a question about '{brief.title}'</h1>
                  <p>
                    Submit your questions before {format(new Date(brief.dates.questions_close), 'dddd D MMMM YYYY')}{' '}
                    i.e. at least 2 days before the closing date. Answers will be published on the opportunity before it closes.
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
                    label={'Question'}
                    validators={{ required }}
                    messages={{
                      required: `question is required`
                    }}
                  />
                  <input
                    className="au-btn right-button-margin"
                    type="submit"
                    value="Submit question"
                    // onClick={e => {
                    //   submitClicked(e)
                    // }}
                  />
                </Form>
              </article>
            </div>
          </DocumentTitle>
        </div>
      )
    }

    return null
  }
}

const mapResetStateToProps = state => ({
  brief: state.brief.brief,
  supplierCode: state.app.supplierCode
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId)),
  clearModel: model => dispatch(actions.reset(model)),
  submitSupplierQuestion: (briefId, values) => dispatch(submitSupplierQuestion(briefId, values))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(AskQuestionPage))
