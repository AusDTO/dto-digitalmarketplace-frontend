import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'shared/Pagination/Pagination'
import styles from './Opportunities.scss'

export const Opportunities = props => (
  <div className={styles.container}>
    <article className="opportunities-page" role="main">
      {props.opportunities.length > 0 && (
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
          {props.opportunities.map(item => (
            <div className={styles.tableRow} key={`item.${item.id}`}>
              <div className="row">
                <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                  <div className={`${styles.badge} ${item.openTo === 'all' ? styles.green : styles.blue}`}>
                    {item.openTo}
                  </div>
                </div>
                <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>{item.id}</div>
                <div className={`col-md-4 col-sm-4 ${styles.cell}`}>
                  <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                  <div>At: {item.company}</div>
                </div>
                <div className={`col-md-2 col-sm-2 ${styles.cell}`}>{item.location}</div>
                <div className={`col-md-2 col-sm-2 ${styles.cell}`}>{item.closing}</div>
                <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.lastColumn}`}>{item.submissions}</div>
              </div>
            </div>
          ))}
          <Pagination pageCount={5} pages={[1, 2, 3, 4, 5]} />
        </div>
      )}
      {props.opportunities.length > 0 && (
        <div className={`${styles.tableMobile} ${styles.hideDesktop}`}>
          {props.opportunities.map(item => (
            <div className={styles.tableRowMobile} key={`item.${item.id}`}>
              <div className="row">
                <div className={`col-md-10 col-sm-10 col-xs-11 ${styles.mobileColumn}`}>
                  <div className={`${styles.badgeMobile} ${item.openTo === 'all' ? styles.green : styles.blue}`}>
                    open to {item.openTo.toLowerCase()}
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
                      <div>{item.location}</div>
                      <div>{item.closing}</div>
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

Opportunities.propTypes = {
  opportunities: PropTypes.array.isRequired
}

export default Opportunities
