/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const handlePageScroll = () => {
  typeof window !== 'undefined' ? window.scrollTo(0, 250) : ''
}

/* 
This helper will generate an array designed to be passed to the Pagination 'pages' prop. If the pageCount
is 5 or less, it will return a simple array for each page, otherwise it will generate an array that:

- always contains the first 2 and last 2 page numbers
- always contains the curPage number.
- always includes the numbers immeditately before and after the curPage number, with a '...' before and 
  after these respectively if their inclusion creates a jump of more than 1, e.g. (* is curPage): 
    - 1, 2, ..., 5, 6*, 7, ..., 15, 16
    - 1, 2, 3, 4*, 5, ..., 22, 23
    - 1, 2, ..., 15, 16*, 17, 18, 19
*/
export const generatePages = (curPage, pageCount) => {
  let pages = []
  if (pageCount <= 5) {
    pages = [...Array(pageCount + 1).keys()].filter(v => v > 0)
  } else {
    const lastPage = pageCount
    pages = [1, 2, lastPage - 1, lastPage]
    if (pages.includes(curPage)) {
      pages.splice(2, 0, '...')
    } else {
      pages.splice(2, 0, ...[curPage - 1, curPage, curPage + 1])
      pages = [...new Set(pages)]
      const lower = pages.indexOf(curPage - 1)
      if (pages[lower - 1] + 1 !== pages[lower]) {
        pages.splice(lower, 0, '...')
      }
      const upper = pages.indexOf(curPage + 1)
      if (pages[upper + 1] - 1 !== pages[upper]) {
        pages.splice(upper + 1, 0, '...')
      }
    }
    if (!pages.includes(curPage + 1)) {
      pages.splice(pages.indexOf(curPage) + 1, 0, curPage + 1)
    }
    if (!pages.includes(curPage - 1)) {
      pages.splice(pages.indexOf(curPage), 0, curPage - 1)
    }
    pages = pages.filter(v => v === '...' || (v > 0 && v <= pageCount))
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
