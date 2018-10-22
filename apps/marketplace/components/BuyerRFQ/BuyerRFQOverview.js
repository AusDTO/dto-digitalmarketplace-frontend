import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isFuture from 'date-fns/is_future'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerRFQOverview.scss'

const BuyerRFQOverview = props => {
  const { brief } = props

  if (brief && brief.id && brief.dates) {
    const isPublished = !!brief.dates.published_date
    const isOpenToQuestions = brief.dates.questions_close && isFuture(new Date(brief.dates.questions_close))
    const isClosed = brief.dates.closing_time && !isFuture(new Date(brief.dates.closing_time))

    return (
      <div>
        <ul className={styles.overviewList}>
          <li>
            {isPublished ? (
              <span>1. Send request to sellers</span>
            ) : (
              <a href={`${rootPath}/buyer-rfq/${brief.id}/introduction`}>1. Send request to sellers</a>
            )}
          </li>
          <li>
            {isPublished && isOpenToQuestions ? (
              <a
                href={`/buyers/frameworks/digital-marketplace/requirements/rfx/${
                  brief.id
                }/supplier-questions/answer-question`}
              >
                2. Answer seller questions
              </a>
            ) : (
              <span>2. Answer seller questions</span>
            )}
          </li>
          <li>
            {isPublished && isClosed ? (
              <a href={`${rootPath}/brief/${brief.id}/download-responses`}>3. Download responses</a>
            ) : (
              <span>3. Download responses</span>
            )}
          </li>
          <li>4. Evaluate responses</li>
          <li>5. Award a contract</li>
          <li>6. Debrief sellers</li>
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
