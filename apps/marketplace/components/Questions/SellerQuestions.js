import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import { AUcheckbox } from '@gov.au/control-input'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadQuestions, markQuestionAsAnswered } from 'marketplace/actions/questionActions'
import styles from './Questions.scss'

export class SellerQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      questionCount: null,
      questions: [],
      errorMessage: null
    }
  }

  componentDidMount() {
    this.props.loadData(this.props.briefId).then(response => {
      this.processLoad(response.data)
      this.setState({
        loading: false
      })
    })
  }

  onAnsweredClicked(field) {
    this.setState({
      loading: true
    })
    this.props
      .markQuestionAsAnswered(this.props.briefId, field.attributes.getNamedItem('data-questionid').value, field.checked)
      .then(response => {
        if (response.status === 200) {
          this.processLoad(response.data)
        } else {
          if (response.data.message) {
            this.setState({
              errorMessage: response.data.message
            })
          } else {
            this.setState({
              errorMessage: response.errorMessage
            })
          }
          window.scrollTo(0, 0)
        }
        this.setState({
          loading: false
        })
      })
  }

  processLoad(data) {
    this.setState({
      questions: data.questions,
      questionCount: data.questionCount,
      errorMessage: null
    })
    this.props.questionCountUpdated(data.questionCount)
    this.props.briefUpdated(data.brief)
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    if (this.state.questions.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <span />
            <p>You don&apos;t have any questions.</p>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        {this.state.errorMessage && (
          <div className="row">
            <div className="col-xs-12">
              <AUpageAlert as="error">{this.state.errorMessage}</AUpageAlert>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xs-12">
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={styles.colDate}>
                    Date
                  </th>
                  <th scope="col" className={styles.colName}>
                    Seller
                  </th>
                  <th scope="col" className={styles.colQuestion}>
                    Question
                  </th>
                  <th scope="col" className={styles.colAction}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.questions.map(item => (
                  <tr key={`item.${item.id}`}>
                    <td className={styles.colDate}>{format(new Date(item.created_at), 'HH:mm DD/MM/YYYY')}</td>
                    <td className={styles.colName}>{item.supplierName}</td>
                    <td className={styles.colQuestion}>{item.question}</td>
                    <td className={styles.colAction}>
                      <AUcheckbox
                        id={`cb-answered-${item.id}`}
                        data-questionid={item.id}
                        onChange={e => {
                          this.onAnsweredClicked(e.target)
                        }}
                        defaultChecked={item.answered}
                        label=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

SellerQuestions.defaultProps = {
  questionCountUpdated: () => {},
  briefUpdated: () => {}
}

SellerQuestions.propTypes = {
  briefId: PropTypes.string.isRequired,
  questionCountUpdated: PropTypes.func,
  briefUpdated: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadQuestions(briefId)),
  markQuestionAsAnswered: (briefId, questionId, answered) =>
    dispatch(markQuestionAsAnswered(briefId, questionId, answered))
})

export default connect(null, mapDispatchToProps)(SellerQuestions)
