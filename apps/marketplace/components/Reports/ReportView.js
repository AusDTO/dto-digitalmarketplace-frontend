import React from 'react'
import DocumentTitle from 'react-document-title'
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
            <DocumentTitle title={`${title} ${date} | Digital Marketplace`} />
            <h1 className={`${styles.reportViewTitle} uikit-display-4`}>
              {title} <span className={styles.reportViewDate}>{date}</span>
            </h1>
            <a
              rel="external"
              target="_blank"
              href="/static/media/documents/Marketplace_2017Aug.pdf"
              style={{ display: 'none' }}
            >
              View this report as a PDF (468KB)
            </a>
          </div>
          <h2 className={`${styles.reportViewHeading} uikit-display-2`}>Who are we?</h2>
          <span>
            The Digital Marketplace is a simple and fast way to buy and sell with government. It {' '}
            <strong>breaks down the barriers of entry for SMEs</strong> (a small to medium enterprise with less than 200
            employees) and makes it{' '}
            <strong>easier to compete for the Australian Government&apos;s annual ICT spend</strong>($6.2 billion in
            financial year 2015-16)
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
