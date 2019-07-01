import React from 'react'
import format from 'date-fns/format'
import Icon from 'shared/Icon'
import PropTypes from 'prop-types'

import styles from './BriefResponseSubmitted.scss'

const BriefResponseSubmittedSummary2 = ({ brief }) => (
  <div>
    <h2 className="au-display-lg">
      <Icon value="successful" color="#000000" size={24} className={styles.icon} />
      <b>If your candidate is short-listed</b>
    </h2>
    <p>
      The buyer will get in contact after <b>{format(new Date(brief.applicationsClosedAt), 'MMMM Do, YYYY')}</b> to
      organise next steps.
    </p>
    <h2 className="au-display-lg">
      <Icon value="unsuccessful" color="#000000" size={24} className={styles.icon} />
      <b>If your candidate does not make the short list</b>
    </h2>
    <p>The buyer has been asked to inform you. This may happen after the contract has been awarded.</p>
  </div>
)

BriefResponseSubmittedSummary2.defaultProps = {
  brief: {}
}

BriefResponseSubmittedSummary2.propTypes = {
  brief: PropTypes.object.isRequired
}

export default BriefResponseSubmittedSummary2
