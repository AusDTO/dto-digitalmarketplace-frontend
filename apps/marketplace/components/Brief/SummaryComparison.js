import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AUheading from '@gov.au/headings/lib/js/react.js'

import PageHeader from 'marketplace/components/PageHeader/PageHeader'

import localStyles from './SummaryComparison.scss'
import styles from '../../main.scss'

const SummaryComparison = props => {
  window.scrollTo(0, 0)
  const { brief, previous, updated } = props
  const previousSummaryIsLonger = previous.length >= updated.length

  return (
    <div className={localStyles.container}>
      <PageHeader actions={[]} organisation={`${brief.title} (${brief.id})`} title="Summary updates" />
      <div className={`row ${styles.hideMobile} ${styles.marginTop2}`}>
        <div className={`col-md-6 ${localStyles.previous} ${previousSummaryIsLonger ? styles.greyBorderRight1 : ''}`}>
          <AUheading level="2" size="xs">
            Previous summary:
          </AUheading>
          <p>{previous}</p>
        </div>
        <div className={`col-md-6 ${localStyles.updated} ${previousSummaryIsLonger ? '' : styles.greyBorderLeft1}`}>
          <AUheading level="2" size="xs">
            Updated summary:
          </AUheading>
          <p>{updated}</p>
        </div>
      </div>
      <div className={`row ${styles.hideDesktop}`}>
        <div className={`col-xs-12 ${localStyles.previous}`}>
          <AUheading level="2" size="md">
            Previous summary:
          </AUheading>
          <p>{previous}</p>
        </div>
        <div className={`col-xs-12 ${localStyles.updated} ${styles.greyBorderTop1}`}>
          <AUheading level="2" size="md">
            Updated summary:
          </AUheading>
          <p>{updated}</p>
        </div>
      </div>
      <div className={`row ${styles.marginTop2}`}>
        <div className="col-xs-12">
          <Link to="/" className={`au-btn au-btn--tertiary ${localStyles.inlineLink}`}>
            Return to History of updates
          </Link>
        </div>
      </div>
    </div>
  )
}

SummaryComparison.defaultProps = {
  brief: {},
  previous: '',
  updated: ''
}

SummaryComparison.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  previous: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired
}

export default SummaryComparison
