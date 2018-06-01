/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const handlePageScroll = () => {
  typeof window !== 'undefined' ? window.scrollTo(0, 250) : ''
}

const Pagination = ({ page, pages, pageCount, onClick, onNext, onBack }) => (
  <div className="pagination">
    <div>
      Page <strong>{page}</strong> of <strong>{pageCount}</strong>
    </div>
    <div>
      <ul className="pagination-controls">
        {page - 1 > 0 && (
          <a
            href="#next"
            onClick={e => {
              e.preventDefault()
              handlePageScroll()
              onBack(page - 1)
            }}
          >
            &lt; Previous
          </a>
        )}

        {pages.map((pg, i) => (
          <li
            key={i}
            className={classNames({
              current: pg === page
            })}
          >
            {pg !== '...' ? (
              <a
                href="#pg"
                onClick={e => {
                  e.preventDefault()
                  handlePageScroll()
                  onClick(pg)
                }}
              >
                {pg}
              </a>
            ) : (
              <span>{pg}</span>
            )}
          </li>
        ))}

        {page + 1 <= pageCount && (
          <a
            href="#next"
            onClick={e => {
              e.preventDefault()
              handlePageScroll()
              onNext(page + 1)
            }}
          >
            Next &gt;
          </a>
        )}
      </ul>
    </div>
  </div>
)

Pagination.defaultProps = {
  pages: [],
  page: 1,
  pageCount: 1,
  onNext: () => {},
  onBack: () => {},
  onClick: () => {}
}

Pagination.propTypes = {
  pages: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Pagination
