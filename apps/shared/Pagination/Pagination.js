/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const handlePageScroll = () => {
  typeof window !== 'undefined' ? window.scrollTo(0, 250) : ''
}

/* 
This helper will generate an array designed to be passed to the Pagination 'pages' prop that
creates elements like the following (where * indicates the current page):

  - 1, ..., 5, 6*, 7, ..., 16
  - 1, 2, 3*, 4, ..., 16
  - 1, ..., 13, 14*, 15, 16
*/
export const generatePages = (pageSize, resultSize, curPage) => {
  let pages = []
  const lastPage = parseInt(Math.ceil(parseFloat(resultSize) / parseFloat(pageSize)))
  
  pages.push(1)
  if (curPage - 2 > 1) {
    pages.push('...')
  }
  if (curPage - 1 > 1) {
    pages.push(curPage - 1)
  }
  if (curPage != 1 && curPage <= lastPage) {
    pages.push(curPage)
  }
  if (resultSize > curPage * pageSize) {
    pages.push(curPage + 1)
  }
  if (resultSize > (curPage + 2) * pageSize) {
    pages.push('...')
  }
  if (resultSize > (curPage + 1) * pageSize) {
    pages.push(lastPage)
  }

  return pages
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
