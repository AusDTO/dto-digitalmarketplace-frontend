/* eslint-disable */
import React from 'react'
import { uniqueID } from 'shared/utils/helpers'
import { bindActionCreators } from 'redux'
import Pagination from 'shared/Pagination/Pagination'
import styles from './SellerDashboard.scss'
import is_before from 'date-fns/is_before'
import distance_in_words from 'date-fns/distance_in_words'
import parse from 'date-fns/parse'

const SellerDashboard = props => {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} row`}>
        <div className="col-md-12 col-sm-12">
          <span className="uikit-display-5">Your responses</span>
          <span className={styles.briefsFilter}>
            <a href="/sellers">team access</a> | <a href="/sellers/edit">view profile</a>
          </span>
        </div>
      </div>
      <article role="main">
        <div className={styles.headingRow}>
          <div className="row">
            <div className={`${styles.alignCenter} col-md-1 col-sm-1`}>ID</div>
            <div className="col-md-3 col-sm-3">Name</div>
            <div className="col-md-2 col-sm-2">Closes in</div>
            <div className="col-md-3 col-sm-3">Status</div>
            <div className="col-md-3 col-sm-3">Action</div>
          </div>
        </div>
        {props.items &&
          props.items.map((item, i) =>
            <div key={`item.${i}`} className={i % 2 ? styles.priceRow + ' ' + styles.greyRow : styles.priceRow}>
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
                  <a href={getAction(item).link} rel="external">
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
  )
}

const ClosedDate = props => {
  let text = 'Closed'

  if (props.date) {
    const parsed = parse(props.date)
    const today = new Date()

    if (is_before(today, parsed)) {
      text = distance_in_words(today, parsed)
    }
  }

  return (
    <div className="col-md-2 col-sm-2">
      {text}
    </div>
  )
}

const getAction = item => {
  const actions = {
    'Approved to apply': {
      text: 'Apply now',
      link: `/digital-marketplace/opportunities/${item.id}`,
      style: styles.badge
    },
    'Assessment requested': {
      text: 'Prepare response',
      link: `/digital-marketplace/opportunities/${item.id}`,
      style: styles.badge
    },
    'Assessment rejected': {
      text: 'Update case study',
      link: '/sellers/edit',
      style: styles.badgeRed
    },
    default: {
      text: 'View next steps',
      link: `/2/brief/${item.id}/respond/submitted`,
      style: styles.badge
    }
  }

  return actions[item.status] || actions['default']
}

export default SellerDashboard
