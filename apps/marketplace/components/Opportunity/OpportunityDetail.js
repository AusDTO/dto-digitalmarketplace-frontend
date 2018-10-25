import React from 'react'
import PropTypes from 'prop-types'
import styles from './Opportunity.scss'

const OpportunityDetail = props => (
  <div className={`row ${styles.detail}`}>
    <div className="col-sm-12 col-md-4">
      <span className={props.strongLabels ? styles.strongLabels : ''}>{props.label}</span>
    </div>
    <div className={`col-sm-12 col-md-8 ${props.newLines ? styles.newLines : ''}`}>{props.children}</div>
  </div>
)

OpportunityDetail.defaultProps = {
  newLines: false,
  strongLabels: true
}

OpportunityDetail.propTypes = {
  newLines: PropTypes.bool,
  strongLabels: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default OpportunityDetail
