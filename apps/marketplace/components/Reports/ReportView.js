import React from 'react'
import { uniqueID } from '../shared/utils/helpers'
import ReportItem from './ReportItem'
import * as styles from './ReportView.scss'

const ReportView = props => {
  const { data } = props
  const { title, items, date } = data

  return (
    <div className={styles.reportView}>
      <div className="row">
        <div className="col-sm-12 col-xs-12">
          <div>
            <h1 className={`${styles.reportViewTitle} uikit-display-4`}>
              {title} <span className={styles.reportViewDate}>{date}</span>
            </h1>
            <a rel="external" target="_blank" href="/static/media/documents/Marketplace_2017Aug.pdf">
              View this report as a PDF (468KB)
            </a>
          </div>
          <h2 className={`${styles.reportViewHeading} uikit-display-2`}>Who are we?</h2>
          <span>
            The Digital Marketplace is a simple, clear and fast way to buy and sell with government. It {' '}
            <strong>breaks down barriers to entry for SMEs</strong> (a small to medium enterprise with less than 200
            employees) and makes it <strong>easier to compete for the $6.5 billion government spend</strong> on ICT each
            year.
          </span>
          {items &&
            <div className="row">
              <div className="hidden">
                {items.map((item, id = uniqueID()) =>
                  <div key={id}>
                    <ReportItem {...item} />
                  </div>
                )}
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default ReportView
