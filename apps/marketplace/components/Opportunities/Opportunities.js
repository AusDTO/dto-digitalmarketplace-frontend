import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClosedDate from 'shared/ClosedDate'
import { OpportunitiesPagination } from './OpportunitiesPagination'
import styles from './Opportunities.scss'

const mapOpenTo = val => {
  const vals = {
    allSellers: 'all',
    someSellers: 'selected',
    oneSeller: 'one'
  }
  return val in vals ? vals[val] : val
}

export class Opportunities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curPage: props.page
    }
    this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  setCurrentPage(page) {
    this.setState({
      curPage: page
    })
  }

  getPageCount() {
    return Math.ceil(this.props.opportunities.length / this.props.limit)
  }

  render() {
    const offset = (this.state.curPage - 1) * this.props.limit
    const opportunities = this.props.opportunities.slice(offset, offset + this.props.limit)

    return (
      <div className={styles.container}>
        <article className="opportunities-page" role="main">
          {opportunities.length === 0 && (
            <div className="row">
              <div className="col-xs-12">There are no opportunities to show that match your filter.</div>
            </div>
          )}
          {opportunities.length > 0 && (
            <div className={`${styles.tableDesktop} ${styles.hideMobile}`}>
              <div className={styles.headingRow}>
                <div className="row">
                  <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                    Open to
                  </div>
                  <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>ID</div>
                  <div className={`col-md-4 col-sm-4 ${styles.cell}`}>Name</div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`}>Location</div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`}>Closing</div>
                  <div className={`col-md-1 col-sm-1 ${styles.cell}`}>Submissions</div>
                </div>
              </div>
              {opportunities.map(item => (
                <div className={styles.tableRow} key={`item.${item.id}`}>
                  <div className="row">
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                      <div className={`${styles.badge} ${item.openTo === 'allSellers' ? styles.green : styles.blue}`}>
                        {mapOpenTo(item.openTo)}
                      </div>
                    </div>
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>{item.id}</div>
                    <div className={`col-md-4 col-sm-4 ${styles.cell}`}>
                      <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                      <div>At: {item.company}</div>
                    </div>
                    <div className={`col-md-2 col-sm-2 ${styles.cell}`}>
                      {item.location ? item.location.join(', ') : ''}
                    </div>
                    <div className={`col-md-2 col-sm-2 ${styles.cell}`}>
                      <ClosedDate countdown date={item.closed_at} />
                    </div>
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.lastColumn}`}>{item.submissions}</div>
                  </div>
                </div>
              ))}
              {this.getPageCount() > 1 && (
                <OpportunitiesPagination
                  lastPage={this.getPageCount()}
                  currentPage={this.state.curPage}
                  onPageClick={this.setCurrentPage}
                />
              )}
            </div>
          )}
          {opportunities.length > 0 && (
            <div className={`${styles.tableMobile} ${styles.hideDesktop}`}>
              {opportunities.map(item => (
                <div className={styles.tableRowMobile} key={`item.${item.id}`}>
                  <div className="row">
                    <div className={`col-md-10 col-sm-10 col-xs-11 ${styles.mobileColumn}`}>
                      <div
                        className={`${styles.badgeMobile} ${item.openTo === 'allSellers' ? styles.green : styles.blue}`}
                      >
                        open to {mapOpenTo(item.openTo)}
                      </div>
                      <div className={styles.mobileName}>
                        <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                        <div className={styles.companyMobile}>At: {item.company}</div>
                      </div>
                      <div className={`${styles.mobileDetails} row`}>
                        <div className="col-md-3 col-sm-3 col-xs-4">
                          <div>
                            <strong>Location:</strong>
                          </div>
                          <div>
                            <strong>Closing:</strong>
                          </div>
                          <div>
                            <strong>Submissions:</strong>
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-8">
                          <div>{item.location ? item.location.join(', ') : ''}</div>
                          <div>
                            <ClosedDate countdown date={item.closed_at} />
                          </div>
                          <div>{item.submissions}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    )
  }
}

Opportunities.defaultProps = {
  opportunities: [],
  page: 1,
  limit: 25
}

Opportunities.propTypes = {
  opportunities: PropTypes.array.isRequired,
  page: PropTypes.number,
  limit: PropTypes.number
}

export default Opportunities
