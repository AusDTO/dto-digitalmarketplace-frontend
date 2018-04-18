import React from 'react'

import styles from './BriefOverview.scss'

const BriefOverview = props =>
  <div className={`${styles.header} row`}>
    <div className="col-md-12 col-sm-12">
      <small className={styles.organisation}>Overview</small>
      <h1 className="uikit-display-5">
        {props.title}
      </h1>
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-md-9">
          {/* <BriefOverviewSection number="1" title="Publish your brief" /> */}
        </div>
      </div>
    </div>
  </div>

export default BriefOverview
