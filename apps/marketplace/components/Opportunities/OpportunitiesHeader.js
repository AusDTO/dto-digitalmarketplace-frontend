import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { OpportunitiesFilters } from 'marketplace/components/Opportunities/OpportunitiesFilters'
import styles from './Opportunities.scss'

export const OpportunitiesHeader = props => (
  <div className={`opportunities-page ${styles.container}`}>
    <div className={`${styles.header} row`}>
      <div className={`${styles.headerTitle} col-md-4 col-sm-4 col-xs-4`}>
        <AUheading size="xl" level="1">
          Opportunities
        </AUheading>
      </div>
      <OpportunitiesFilters {...props} />
    </div>
  </div>
)

OpportunitiesHeader.propTypes = {
  accordionOpen: PropTypes.bool.isRequired,
  openAccordion: PropTypes.func.isRequired,
  closeAccordion: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  getActiveFilterCount: PropTypes.func.isRequired
}

export default OpportunitiesHeader
