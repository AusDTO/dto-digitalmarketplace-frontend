import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { rootPath } from 'marketplace/routes'
import { loadQuestions } from 'marketplace/actions/questionActions'
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
        <div className={`row ${styles.noQuestions}`}>
          <div className={`col-xs-12 ${styles.initial}`}>
            <AUheading size="md" level="2">
              No questions have been asked.
            </AUheading>
            <p>
              If the question you want to answer does not appear, you can{' '}
              <a href={`${rootPath}/brief/${this.props.briefId}/publish-answer`}>add additional questions</a>
            </p>
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
        {this.state.questions && (
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
                        {item.answered ? (
                          'Answered'
                        ) : (
                          <a href={`${rootPath}/brief/${this.props.briefId}/publish-answer/${item.id}`}>
                            Answer question
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
  loadData: briefId => dispatch(loadQuestions(briefId))
})

export default connect(null, mapDispatchToProps)(SellerQuestions)
