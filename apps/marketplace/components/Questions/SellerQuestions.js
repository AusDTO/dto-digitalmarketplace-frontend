import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import format from 'date-fns/format'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadQuestions } from 'marketplace/actions/questionActions'
import styles from './Questions.scss'

export class SellerQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      questionCount: null,
      questions: []
    }
  }

  componentDidMount() {
    this.props.loadData(this.props.briefId).then(response => {
      this.setState({
        questions: response.data.questions,
        questionCount: response.data.questionCount,
        loading: false
      })
      this.props.questionCountUpdated(response.data.questionCount)
      this.props.briefUpdated(response.data.brief)
    })
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
                  <td className={styles.colAction}>Action</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
