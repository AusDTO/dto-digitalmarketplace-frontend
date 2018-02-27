import React from 'react'
import {ClosedDate} from 'shared/ClosedDate'
import styles from './BuyerDashboard.scss'

const BuyerDashboard = props =>
  <div className={styles.container}>
    <div className={`${styles.header} row`}>
      <div className="col-md-12 col-sm-12">
        <h1 className="uikit-display-5">Opportunities</h1>
        <span className={styles.buttonsContainer}>
          <a className={`${styles.firstButton} uikit-btn`} href="#url">
            Create new brief
          </a>
        </span>
      </div>
    </div>
    <article role="main">
      <div className={styles.headingRow}>
        <div className="row">
          <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>ID</div>
          <div className="col-md-3 col-sm-3">Name</div>
          <div className="col-md-3 col-sm-3">Canberra closing time</div>
          <div className="col-md-1 col-sm-1">Status</div>
          <div className="col-md-2 col-sm-2">Action</div>
          <div className="col-md-2 col-sm-2" />
        </div>
      </div>
      {props.items.map((item, i) =>
      <div key={`item.${item.id}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
        <div className="row">
          <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>{item.id}</div>
          <div className="col-md-3 col-sm-3">
            <a href="/#">{item.name}</a>
          </div>
          <div className="col-md-3 col-sm-3">
            {item.status === 'live' && <ClosedDate date={item.closed_at} />}
            {item.status !== 'draft' && <div>{`${item.applications} Sellers applied`}</div>}
          </div>
          <div className="col-md-1 col-sm-1" >
            <div className={styles.badge}>{item.status}</div>
          </div>
          <div className="col-md-2 col-sm-2">
          {item.status === 'draft' && 
            <a href="/#" rel="external">
              <strong>Edit draft</strong>
            </a>
          }
          {item.status === 'live' && 
            <a href="/#" rel="external">
              <strong>Answer a question</strong>
            </a>
          }
          {item.status === 'closed' && 
            <a href="/#" rel="external">
              <strong>View Responses</strong>
            </a>
          }
          </div>
                  <div className="col-md-2 col-sm-2">
          {item.status === 'closed' && 
                      <a href="/#" rel="external">
              <strong>Create work order</strong>
            </a>

        }
        </div>

        </div>
      </div>
      )}
    </article>
  </div>

export default BuyerDashboard
