import React from 'react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
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
    <div className={`row ${styles.flex}`}>
      <div className={`col-xs-12 col-md-3 ${styles.flexColumn}`}>
        <AUheading level="2" size="md">
          Digital outcome
        </AUheading>
        <p>
          Find a team to help you work towards a digital project or goal, for example, a booking system or an
          accessibility audit.
        </p>
        <ul className={styles.tickList}>
          <li>Sellers submit 150 word responses to your criteria for shortlisting.</li>
          <li>Request proposals from shortlisted sellers.</li>
        </ul>
        <AUheading level="3" size="sm">
          Receive responses within:
        </AUheading>
        <span className={styles.flexGrow}>1 to 2 weeks</span>
        <p>
          <a href={`${rootPath}/outcome-choice`}>
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
      <div className="col-xs-12 col-md-1">
        <div className={styles.separator} />
      </div>
      <div className={`col-xs-12 col-md-3 ${styles.flexColumn}`}>
        <AUheading level="2" size="md">
          Training
        </AUheading>
        <p>Build and embed skills to support digital services, for example, coaching in agile practices.</p>
        <ul className={styles.tickList}>
          <li>Sellers submit written proposals, costs and résumés through the Marketplace.</li>
          <li>Request case studies, references, interview and/or presentations.</li>
        </ul>
        <AUheading level="3" size="sm">
          Receive responses within:
        </AUheading>
        <span className={styles.flexGrow}>1 to 2 weeks</span>
        <p>
          <a href="/buyers/frameworks/digital-marketplace/requirements/training">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
      <div className="col-xs-12 col-md-1">
        <div className={styles.separator} />
      </div>
      <div className={`col-xs-12 col-md-3 ${styles.flexColumn}`}>
        <AUheading level="2" size="md">
          Digital specialist
        </AUheading>
        <p>Find a person with specialised digital skills, for example, a developer.</p>
        <ul className={styles.tickList}>
          <li>Sellers can submit up to 3 résumés.</li>
          <li>Request references, interviews, scenarios and/or presentations.</li>
        </ul>
        <AUheading level="3" size="sm">
          Receive responses within:
        </AUheading>
        <span className={styles.flexGrow}>1 to 2 weeks</span>
        <p>
          <a href="/buyers/frameworks/digital-marketplace/requirements/digital-professionals">
            <button className="au-btn">Get started</button>
          </a>
        </p>
      </div>
    </div>
  </div>
)

export default BriefChoice
