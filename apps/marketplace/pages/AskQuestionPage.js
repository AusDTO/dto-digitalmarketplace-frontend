import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, actions } from 'react-redux-form'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import { loadPublicBrief, submitSupplierQuestion } from 'marketplace/actions/briefActions'
import { required } from 'marketplace/components/validators'
import Textarea from 'shared/form/Textarea'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

const model = 'askAQuestionForm'

const getOpportunityUrl = brief =>
  brief.lot === 'rfx' || brief.lot === 'atm' || brief.lot === 'specialist'
    ? `${rootPath}/digital-marketplace/opportunities/${brief.id}`
    : `/digital-marketplace/opportunities/${brief.id}`

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
    const { brief, supplierCode } = this.props

    const submitData = {
      question: values.question ? values.question : null,
      supplierCode
    }

    this.setState({
      loading: true
    })
    this.props.submitSupplierQuestion(brief.id, submitData).then(response => {
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
        <DocumentTitle title="Ask a question - Digital Marketplace">
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
                        {`Thank you, your question is submitted successfully to ${brief.organisation}`}.
                      </AUheading>
                      <p>
                        <a href={getOpportunityUrl(brief)} className="au-btn">
                          Return to opportunity
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
                    <h1 className="au-display-xl">{`Ask a question about '${brief.title}'`}</h1>
                    <p>
                      Submit your questions before {format(new Date(brief.dates.questions_close), 'dddd D MMMM YYYY')}.{' '}
                      Answers will be published on the opportunity before it closes.
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
                    <input className="au-btn right-button-margin" type="submit" value="Submit question" />
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
  brief: state.brief.brief,
  supplierCode: state.app.supplierCode
})

const mapResetDispatchToProps = dispatch => ({
  loadInitialData: briefId => dispatch(loadPublicBrief(briefId)),
  clearModel: m => dispatch(actions.reset(m)),
  submitSupplierQuestion: (briefId, values) => dispatch(submitSupplierQuestion(briefId, values))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(AskQuestionPage))
