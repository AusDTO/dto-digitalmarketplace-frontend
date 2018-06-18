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

const mapStates = val => {
  const vals = {
    'Australian Capital Territory': 'ACT',
    'New South Wales': 'NSW',
    Victoria: 'VIC',
    Queensland: 'QLD',
    'South Australia': 'SA',
    'Western Australia': 'WA',
    'Northern Territory': 'NT',
    Tasmania: 'TAS'
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
            <div className={`${styles.tableDesktop} ${styles.hideMobile}`} role="table" aria-label="Opportunities">
              <div className={styles.headingRow} role="rowgroup">
                <div className="row" role="row">
                  <div
                    className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}
                    role="columnheader"
                    id="header_opento"
                  >
                    Open to
                  </div>
                  <div
                    role="columnheader"
                    className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}
                    id="header_id"
                  >
                    ID
                  </div>
                  <div role="columnheader" className={`col-md-4 col-sm-4 ${styles.cell}`} id="header_name">
                    Name
                  </div>
                  <div role="columnheader" className={`col-md-2 col-sm-2 ${styles.cell}`} id="header_location">
                    Location
                  </div>
                  <div role="columnheader" className={`col-md-2 col-sm-2 ${styles.cell}`} id="header_closing">
                    Closing
                  </div>
                  <div role="columnheader" className={`col-md-1 col-sm-1 ${styles.cell}`} id="header_submissions">
                    Submissions
                  </div>
                </div>
              </div>
              <div role="rowgroup">
                {opportunities.map(item => (
                  <div className={styles.tableRow} key={`item.${item.id}`} role="row">
                    <div className="row">
                      <div
                        className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}
                        role="cell"
                        aria-labelledby="header_opento"
                      >
                        <div className={`${styles.badge} ${item.openTo === 'allSellers' ? styles.green : styles.blue}`}>
                          {mapOpenTo(item.openTo)}
                        </div>
                      </div>
                      <div
                        className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}
                        role="cell"
                        aria-labelledby="header_id"
                      >
                        {item.id}
                      </div>
                      <div className={`col-md-4 col-sm-4 ${styles.cell}`} role="cell" aria-labelledby="header_name">
                        <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                        <div>At: {item.company}</div>
                      </div>
                      <div className={`col-md-2 col-sm-2 ${styles.cell}`} role="cell" aria-labelledby="header_location">
                        {item.location ? item.location.map(v => mapStates(v)).join(', ') : ''}
                      </div>
                      <div className={`col-md-2 col-sm-2 ${styles.cell}`} role="cell" aria-labelledby="header_closing">
                        <ClosedDate countdown date={item.closed_at} />
                      </div>
                      <div
                        className={`col-md-1 col-sm-1 ${styles.cell} ${styles.lastColumn}`}
                        role="cell"
                        aria-labelledby="header_submissions"
                      >
                        {item.submissions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                          <div>
                            {item.location ? item.location.map(v => mapStates(v)).join(', ') : <span>&nbsp;</span>}
                          </div>
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
          {this.getPageCount() > 1 && (
            <OpportunitiesPagination
              lastPage={this.getPageCount()}
              currentPage={this.state.curPage}
              onPageClick={this.setCurrentPage}
            />
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
