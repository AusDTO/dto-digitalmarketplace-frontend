import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './BriefChoice.scss'

const BriefChoice = () => (
  <div className={styles.container}>
    <div className={`row ${styles.headingRow}`}>
      <div className="col-xs-12">
        <AUheading level="1" size="xl">
          Create a new brief
        </AUheading>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-3">
        <span />
        <AUheading level="2" size="md">
          Digital Outcome
        </AUheading>
        <p>Acquire a team to help you work towards a digital project or goal. For example, a website.</p>
        <ul className={styles.tickList}>
          <li>Receive written proposals from sellers.</li>
          <li>Request case studies, work history, references and/or presentations.</li>
        </ul>
        <p>
          <strong>Receive responses within:</strong>
          <br />1 - 2 weeks
        </p>
        <p className={styles.hideDesktop}>
          <a href="/buyers/frameworks/digital-marketplace/requirements/digital-outcome">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
      <div className="col-xs-12 col-md-1">
        <div className={styles.separator} />
      </div>
      <div className="col-xs-12 col-md-3">
        <span />
        <AUheading level="2" size="md">
          Training
        </AUheading>
        <p>Build and embed skills to support digital services. For example, coaching in agile practices.</p>
        <ul className={styles.tickList}>
          <li>Receive written proposals from sellers.</li>
          <li>Request trainer résumés, case studies, references and/or presentations.</li>
        </ul>
        <p>
          <strong>Receive responses within:</strong>
          <br />1 - 2 weeks
        </p>
        <p className={styles.hideDesktop}>
          <a href="/buyers/frameworks/digital-marketplace/requirements/training">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
      <div className="col-xs-12 col-md-1">
        <div className={styles.separator} />
      </div>
      <div className="col-xs-12 col-md-3">
        <span />
        <AUheading level="2" size="md">
          Digital Specialist
        </AUheading>
        <p>Find a person with specialised digital skills. For example, a developer.</p>
        <ul className={styles.tickList}>
          <li>Receive seller résumés.</li>
          <li>Request references, interviews, scenarios and/or presentations.</li>
        </ul>
        <p>
          <strong>Receive responses within:</strong>
          <br />1 - 2 weeks
        </p>
        <p className={styles.hideDesktop}>
          <a href="/buyers/frameworks/digital-marketplace/requirements/digital-professionals">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
    </div>
    <div className={`row ${styles.hideMobile}`}>
      <div className="col-md-3">
        <a href="/buyers/frameworks/digital-marketplace/requirements/digital-outcome">
          <button className="au-btn">Get started</button>
        </a>
      </div>
      <div className="col-md-1" />
      <div className="col-md-3">
        <a href="/buyers/frameworks/digital-marketplace/requirements/training">
          <button className="au-btn">Get started</button>
        </a>
      </div>
      <div className="col-md-1" />
      <div className="col-md-3">
        <a href="/buyers/frameworks/digital-marketplace/requirements/digital-professionals">
          <button className="au-btn">Get started</button>
        </a>
      </div>
    </div>
  </div>
)

export default BriefChoice
