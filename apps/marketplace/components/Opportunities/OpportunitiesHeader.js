import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import OpportunitiesFilters from 'marketplace/components/Opportunities/OpportunitiesFilters'
import styles from './Opportunities.scss'

export const OpportunitiesHeader = props => (
  <div className={`opportunities-page ${styles.container}`}>
    <div className={`${styles.header} row`}>
      <div className={`${styles.headerTitle} col-md-3 col-sm-3 col-xs-3`}>
        <AUheading size="xl" level="1">
          Opportunities
        </AUheading>
      </div>
      <div className="col-sm-9">
        <OpportunitiesFilters
          updateQueryString={props.updateQueryString}
          initialFilterValues={props.initialFilterValues}
          statusAccordionClosed
          locationAccordionClosed
          mobileAccordionClosed
          typeAccordionClosed
        />
      </div>
    </div>
  </div>
)

OpportunitiesHeader.defaultProps = {
  initialFilterValues: {},
  updateQueryString: () => {}
}

OpportunitiesHeader.propTypes = {
  initialFilterValues: PropTypes.object,
  updateQueryString: PropTypes.func
}

export default OpportunitiesHeader
