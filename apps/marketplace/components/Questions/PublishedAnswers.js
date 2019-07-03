import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import { loadAnswers } from 'marketplace/actions/questionActions'
import styles from './Questions.scss'

export class PublishedAnswers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      questionCount: null,
      answers: []
    }
  }

  componentDidMount() {
    this.props.loadData(this.props.briefId).then(response => {
      this.setState({
        answers: response.data.answers,
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

    if (this.state.answers.length === 0) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <span />
            <p>You don&apos;t have any published answers.</p>
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
                <th scope="col" className={styles.colId}>
                  Published by
                </th>
                <th scope="col" className={styles.colName}>
                  Question
                </th>
                <th scope="col" className={styles.colOwner}>
                  Answer
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.answers.map(item => (
                <tr key={`item.${item.id}`}>
                  <td className={styles.colId}>{item.owner}</td>
                  <td className={styles.colName}>{item.question}</td>
                  <td className={styles.colName}>{item.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

PublishedAnswers.defaultProps = {
  questionCountUpdated: () => {},
  briefUpdated: () => {}
}

PublishedAnswers.propTypes = {
  briefId: PropTypes.string.isRequired,
  questionCountUpdated: PropTypes.func,
  briefUpdated: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  loadData: briefId => dispatch(loadAnswers(briefId))
})

export default connect(null, mapDispatchToProps)(PublishedAnswers)
