import React from 'react'
import {ClosedDate} from 'shared/ClosedDate'
import styles from './SellerDashboard.scss'

const SellerDashboard = props =>
  <div className={styles.container}>
    <div className={`${styles.header} row`}>
      <div className="col-md-12 col-sm-12">
        <div className={styles.briefsFilter}>
          <ul className="uikit-link-list uikit-link-list--inline">
            <li>
              <a href="/sellers">Manage team</a>
            </li>
            <li>
              <a href={`/supplier/${props.supplier.code}`}>View profile</a>
            </li>
          </ul>
        </div>
        <span className={`uikit-display-2 ${styles.lightText}`}>
          {props.supplier.name}
        </span>
        <h1 className="uikit-display-5">Dashboard</h1>
        {props.items.length === 0 &&
          <div>
            You have not applied for any <a href="/digital-marketplace/opportunities?status=live">opportunities</a>{' '}
            since January 1st 2018.
          </div>}
      </div>
    </div>
    {props.items.length > 0 &&
      <article role="main">
        <div className={styles.headingRow}>
          <div className={`${styles.headingTitles} row`}>
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`} role="columnheader">
              ID
            </div>
            <div className="col-md-4 col-sm-4" role="columnheader">
              Name
            </div>
            <div className="col-md-3 col-sm-3" role="columnheader">
              Canberra closing time
            </div>
            <div className="col-md-2 col-sm-2" role="columnheader">
              Status
            </div>
            <div className="col-md-2 col-sm-2" role="columnheader">
              Action
            </div>
          </div>
        </div>
        {props.items.map((item, i) =>
          <div key={`item.${item.id}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
            <div className="row">
              <div className={`${styles.alignCenter} ${styles.grids} col-md-1 col-sm-1`}>
                {item.id}
              </div>
              <div className={`${styles.grids} col-md-4 col-sm-4`}>
                <a href={`/digital-marketplace/opportunities/${item.id}`}>
                  {item.name}
                </a>
              </div>
              <div className={`${styles.grids} col-md-3 col-sm-3`}>
                <ClosedDate date={item.closed_at} />
              </div>
              <div className={`${styles.grids} col-md-2 col-sm-2`}>
                <div className={styles.badge}>
                  {item.is_downloaded ? 'Buyer Reviewing' : 'Submitted'}
                </div>
              </div>
              <div className={`${styles.grids} col-md-2 col-sm-2`}>
                <a
                  href={
                    item.framework === 'Digital professionals'
                      ? 'https://marketplace1.zendesk.com/hc/en-gb/articles/115011261887#afterapplying'
                      : 'https://marketplace1.zendesk.com/hc/en-gb/articles/115011258727-Invitation-for-proposals'
                  }
                >
                  <strong>View next steps</strong>
                </a>
              </div>
            </div>
          </div>
        )}
        <div className={styles.disclaimer}>
          <small>
            Showing opportunities posted from January 1st 2018. These will update as buyers provide information.
          </small>
        </div>
      </article>}
  </div>

export default SellerDashboard
