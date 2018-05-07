import React from 'react'
import ClosedDate from 'shared/ClosedDate'
import styles from './SellerDashboard.scss'

const SellerDashboard = props =>
  <div className={styles.container}>
    <article role="main">
      <div className={`${styles.header} row`}>
        <div className="col-md-12 col-sm-12">
          <div className={styles.briefsFilter}>
            <ul className="au-link-list au-link-list--inline">
              <li>
                <a href="/sellers">Manage team</a>
              </li>
              <li>
                <a href={`/supplier/${props.supplier.code}`}>View profile</a>
              </li>
            </ul>
          </div>
          <span className={`au-display-lg ${styles.lightText}`}>
            {props.supplier.name}
          </span>
          <h1 className="au-display-xl">Dashboard</h1>
          {props.items.length === 0 &&
            <div>
              You have not applied for any <a href="/digital-marketplace/opportunities?status=live">
                opportunities
              </a>{' '}
              since January 1st 2018.
            </div>}
        </div>
      </div>
      {props.items.length > 0 &&
        <div className="row">
          <div className="col-xs-12">
            <table className={`${styles.resultListing} col-xs-12`}>
              <thead>
                <tr className={styles.headingRow}>
                  <th scope="col" className={styles.colId}>
                    ID
                  </th>
                  <th scope="col" className={styles.colName}>
                    Name
                  </th>
                  <th scope="col" className={styles.colClosing}>
                    Canberra closing time
                  </th>
                  <th scope="col" className={styles.colStatus}>
                    Status
                  </th>
                  <th scope="col" className={styles.colAction}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.items.map(item =>
                  <tr key={`item.${item.id}`}>
                    <td className={styles.colId}>
                      {item.id}
                    </td>
                    <td className={styles.colName}>
                      <a href={`/digital-marketplace/opportunities/${item.id}`}>
                        {item.name}
                      </a>
                    </td>
                    <td>
                      <ClosedDate date={item.closed_at} />
                    </td>
                    <td className={styles.colStatus}>
                      <div className={`${styles.badge}`}>
                        {item.is_downloaded ? 'Buyer Reviewing' : 'Submitted'}
                      </div>
                    </td>
                    <td className={styles.colAction}>
                      <a
                        href={
                          item.framework === 'Digital professionals'
                            ? 'https://marketplace1.zendesk.com/hc/en-gb/articles/115011261887#afterapplying'
                            : 'https://marketplace1.zendesk.com/hc/en-gb/articles/115011258727-Invitation-for-proposals'
                        }
                      >
                        <strong>View next steps</strong>
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={styles.disclaimer}>
              <small>
                Showing opportunities posted from January 1st 2018. These will update as buyers provide information.
              </small>
            </div>
          </div>
        </div>}
    </article>
  </div>

export default SellerDashboard
