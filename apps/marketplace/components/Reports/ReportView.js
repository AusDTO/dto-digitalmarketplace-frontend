import React from 'react'
import DocumentTitle from 'react-document-title'
import { uniqueID } from '../helpers'
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
              href="/static/media/documents/Digital Marketplace - November 2017 Insights.pdf"
            >
              View this report as a PDF (468KB)
            </a>
          </div>
          <h2 className={`${styles.reportViewHeading} uikit-display-2`}>Who are we?</h2>
          <span>
            The Digital Marketplace is a simple and fast way to buy and sell with government. It {' '}
            <strong>breaks down the barriers of entry for SMEs</strong> (a small to medium enterprise with less than 200
            employees) and makes it{' '}
            <strong>easier to compete for the Australian Government&apos;s annual ICT spend</strong> ($6.2 billion in
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
          <span className={styles.caveat}>
            * Contract information is sourced from{' '}
            <a href="http://tenders.gov.au" rel="noopener noreferrer external" target="_blank">
              Austender
            </a>. It excludes contracts awarded by entities that don&apos;t report through Austender and contracts under
            $10,000. Contracts may take up to 42 days to be published.
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReportView
