import React from 'react'
import PropTypes from 'prop-types'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react'
import styles from './Opportunities.scss'

const scrollToTop = () => (typeof window !== 'undefined' ? window.scrollTo(0, 0) : '')

const showPrevious = props => props.lastPage > 1 && props.currentPage > 1

const showNext = props => props.lastPage > 1 && props.currentPage < props.lastPage

export const OpportunitiesPagination = props => (
  <div className="row">
    <div className={`col-xs-6 ${styles.pageLeft}`}>
      {showPrevious(props) && (
        <span>
          <p>
            <AUdirectionLink
              direction="left"
              link="#prev"
              text="Previous page"
              onClick={e => {
                e.preventDefault()
                scrollToTop()
                props.onPageClick(props.currentPage - 1)
              }}
              title={`${props.currentPage - 1} of ${props.lastPage}`}
            />
          </p>
          <span className={styles.pageSummary}>
            {props.currentPage - 1} of {props.lastPage}
          </span>
        </span>
      )}
    </div>
    <div className={`col-xs-6 ${styles.pageRight}`}>
      {showNext(props) && (
        <span>
          <p>
            <AUdirectionLink
              direction="right"
              link="#next"
              text="Next page"
              onClick={e => {
                e.preventDefault()
                scrollToTop()
                props.onPageClick(props.currentPage + 1)
              }}
              title={`${props.currentPage + 1} of ${props.lastPage}`}
            />
          </p>
          <span className={styles.pageSummary}>
            {props.currentPage + 1} of {props.lastPage}
          </span>
        </span>
      )}
    </div>
  </div>
)

OpportunitiesPagination.defaultProps = {
  onPageClick: () => {}
}

OpportunitiesPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func
}

export default OpportunitiesPagination
