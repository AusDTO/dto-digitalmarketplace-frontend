import React from 'react'
import distanceInWords from 'date-fns/distance_in_words'
import isBefore from 'date-fns/is_before'
import parse from 'date-fns/parse'
import styles from './SellerDashboard.scss'

const getAction = item => {
  const actions = {
    'Approved to apply': {
      text: 'Apply now',
      link: `/digital-marketplace/opportunities/${item.id}`,
      style: styles.badgeYellow
    },
    'Assessment requested': {
      text: 'Prepare response',
      link: `/digital-marketplace/opportunities/${item.id}`,
      style: styles.badgeBlue
    },
    'Assessment rejected': {
      text: 'Update case study',
      link: '/sellers/edit',
      style: styles.badgeRed
    },
    'Response submitted': {
      text: 'View next steps',
      link: `/2/brief/${item.id}/respond/submitted`,
      style: styles.badge
    }
  }
  return actions[item.status]
}

const SellerDashboard = props =>
  <div className={styles.container}>
    <div className={`${styles.header} row`}>
      <div className="col-md-12 col-sm-12">
        <span className={styles.briefsFilter}>
          <a href="/sellers">team access</a> | <a href={`/supplier/${props.supplier.code}`}>view profile</a>
        </span>
        <span className="uikit-display-2">
          {props.supplier.name}
        </span>
        <span className="uikit-display-5">Your responses</span>
      </div>
    </div>
    <article role="main">
      <div className={styles.headingRow}>
        <div className={`${styles.headingTitles} row`}>
          <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>ID</div>
          <div className="col-md-3 col-sm-3">Name</div>
          <div className="col-md-2 col-sm-2">Closes in</div>
          <div className="col-md-3 col-sm-3">Status</div>
          <div className="col-md-3 col-sm-3">Action</div>
        </div>
      </div>
      {props.items &&
        props.items.map((item, i) =>
          <div key={`item.${item.id}`} className={i % 2 ? `${styles.priceRow} ${styles.greyRow}` : styles.priceRow}>
            <div className="row">
              <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>
                {item.id}
              </div>
              <div className="col-md-3 col-sm-3">
                <a href={`/digital-marketplace/opportunities/${item.id}`}>
                  {item.name}
                </a>
              </div>
              <ClosedDate date={item.closed_at} />
              <div className="col-md-3 col-sm-3">
                <div className={getAction(item).style}>
                  {item.status}
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <a href={getAction(item).link}>
                  <strong>
                    {getAction(item).text}
                  </strong>
                </a>
              </div>
            </div>
          </div>
        )}
    </article>
  </div>

const ClosedDate = props => {
  let text = 'Closed'

  if (props.date) {
    const parsed = parse(props.date)
    const today = new Date()

    if (isBefore(today, parsed)) {
      text = distanceInWords(today, parsed)
    }
  }

  return (
    <div className="col-md-2 col-sm-2">
      {text}
    </div>
  )
}

export default SellerDashboard
