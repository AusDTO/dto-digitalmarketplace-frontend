/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import DocumentTitle from 'react-document-title'

import LoadingButton from 'marketplace/components/LoadingButton/LoadingButton'

import styles from './BriefWithdrawForm.scss'

const BriefWithdrawForm = ({
  match
}) =>
  <div className="row">
    <DocumentTitle title="Brief Response - Digital Marketplace">
      <div className="col-sm-push-2 col-sm-8 col-xs-12">
        <article role="main">
          <div>
            <h1 className="uikit-display-5">Application details</h1>
            <br/>
            <div className="uikit-display-3"><strong>Point of contact</strong></div>
            <div>matt.brown@cxco.com.au</div>
            <a href={`/2/brief/${match.params.briefId}/contact`}>Change email</a>
            <div className={`${styles.tableTitle} uikit-display-3`}><strong>Submitted specialists</strong></div>
            <div className={styles.specialist}>
              <span className={styles.name}>Jeff Goldburn</span>
              <span><a className={styles.link} href='#'>Withdraw</a></span>
            </div>
            <div className={styles.specialist}>
              <span className={styles.name}>Chris Hermsworth</span>
              <span><a className={styles.link} href='#'>Withdraw</a></span>
            </div>
            <br/>
            <br/>
            <div className="uikit-btn">Add another specialist</div>
          </div>
        </article>
      </div>
    </DocumentTitle>
  </div>

BriefWithdrawForm.defaultProps = {

}

BriefWithdrawForm.propTypes = {

}

export default BriefWithdrawForm
