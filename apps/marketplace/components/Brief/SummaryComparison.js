import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AUheading from '@gov.au/headings/lib/js/react.js'

import PageHeader from 'marketplace/components/PageHeader/PageHeader'

import localStyles from './SummaryComparison.scss'
import styles from '../../main.scss'

const SummaryComparison = props => {
  const { brief, previous, updated } = props
  const previousSummaryIsLonger = previous.length >= updated.length

  return (
    <React.Fragment>
      <div className="row">
        <PageHeader actions={[]} organisation={`${brief.title} (${brief.id})`} title="Summary updates" />
      </div>
      <div className={`row ${styles.hideMobile} ${localStyles.container} ${styles.marginTop2}`}>
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
      <div className={`row ${styles.hideDesktop} ${localStyles.container}`}>
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
      <div className={`row ${styles.marginTop2} ${localStyles.container}`}>
        <Link to="/" className={`au-btn au-btn--tertiary ${localStyles.inlineLink}`}>
          Return to History of updates
        </Link>
      </div>
    </React.Fragment>
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
