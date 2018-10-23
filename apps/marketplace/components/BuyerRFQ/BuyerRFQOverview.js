import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isValid from 'date-fns/is_valid'
import isFuture from 'date-fns/is_future'
import subDays from 'date-fns/sub_days'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerRFQOverview.scss'

const Badge = props => <span className={styles.badge}>{props.status}</span>

const answerSellerQuestionsRender = (brief, isPublished, isPastQuestionsDeadline) => {
  if (!isPublished) {
    return (
      <span>
        <span>2. Answer seller questions</span>
      </span>
    )
  } else if (isPublished && !isPastQuestionsDeadline) {
    return (
      <span>
        2.{' '}
        <a
          href={`/buyers/frameworks/digital-marketplace/requirements/rfx/${
            brief.id
          }/supplier-questions/answer-question`}
        >
          Answer seller questions
        </a>
        <Badge status="To do" />
      </span>
    )
  } else if (isPublished && isPastQuestionsDeadline) {
    return (
      <span>
        <span>2. Answer seller questions</span>
        <Badge status="Done" />
      </span>
    )
  }
  return null
}

const downloadResponsesRender = (brief, isPublished, isClosed) => {
  if (isPublished && isClosed) {
    return (
      <span>
        3. <a href={`${rootPath}/brief/${brief.id}/download-responses`}>Download responses</a>
        <Badge status="Ready for download" />
      </span>
    )
  }

  return (
    <span>
      <span>3. Download responses</span>
    </span>
  )
}

const BuyerRFQOverview = props => {
  const { brief } = props

  if (brief && brief.id && brief.dates) {
    const isPublished = brief.dates.published_date && isValid(new Date(brief.dates.published_date))
    const isPastQuestionsDeadline =
      brief.dates.closing_time &&
      isValid(new Date(brief.dates.closing_time)) &&
      new Date().toLocaleString('en-US', { timeZone: 'UTC' }) >
        subDays(new Date(brief.dates.closing_time), 1).toLocaleString('en-US', { timeZone: 'UTC' })
    const isClosed =
      brief.dates.closing_time &&
      isValid(new Date(brief.dates.closing_time)) &&
      !isFuture(new Date(brief.dates.closing_time))

    return (
      <div>
        <ul className={styles.overviewList}>
          <li>
            {isPublished ? (
              <span>
                <span>1. Send request to sellers</span>
                <Badge status="Done" />
              </span>
            ) : (
              <span>
                <a href={`${rootPath}/buyer-rfq/${brief.id}/introduction`}>1. Send request to sellers</a>
                <Badge status="To do" />
              </span>
            )}
          </li>
          <li>{answerSellerQuestionsRender(brief, isPublished, isPastQuestionsDeadline)}</li>
          <li>{downloadResponsesRender(brief, isPublished, isClosed)}</li>
          <li>
            {isPublished && isClosed ? (
              <span>
                <span>4. Evaluate responses</span>
                <Badge status="To do" />
              </span>
            ) : (
              <span>
                <span>4. Evaluate responses</span>
              </span>
            )}
          </li>
          <li>
            {isPublished && isClosed ? (
              <span>
                <span>5. Award a contract</span>
                <Badge status="To do" />
              </span>
            ) : (
              <span>5. Award a contract</span>
            )}
          </li>
          <li>
            {isPublished && isClosed ? (
              <span>
                <span>6. Debrief sellers</span>
                <Badge status="To do" />
              </span>
            ) : (
              <span>6. Debrief sellers</span>
            )}
          </li>
        </ul>
      </div>
    )
  }

  return null
}

BuyerRFQOverview.propTypes = {
  brief: PropTypes.object.isRequired
}

export default connect()(BuyerRFQOverview)
