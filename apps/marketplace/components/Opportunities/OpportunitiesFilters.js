import React from 'react'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './Opportunities.scss'

const OpportunitiesFilters = props => (
  <div>
    <div className={`col-md-6 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
      <ul className="au-link-list au-link-list--inline">
        <li className={styles.filterContainer}>
          <a href="#dummy" className={`${styles.filter} ${styles.firstFilter}`}>
            Innovation
          </a>
        </li>
        <li className={styles.filterContainer}>
          <a href="#dummy" className={`${styles.filter}`}>
            Outcomes
          </a>
        </li>
        <li className={styles.filterContainer}>
          <a href="#dummy" className={styles.filter}>
            Training
          </a>
        </li>
        <li className={styles.filterContainer}>
          <a href="#dummy" className={`${styles.filter} ${styles.lastFilter}`}>
            Specialists
          </a>
        </li>
      </ul>
    </div>
    <div className={`col-md-2 col-sm-12 ${styles.hideMobile}`}>
      <AUaccordion
        header={`Filters ${props.filterCount > 0 ? `• ${props.filterCount}` : ''}`}
        open={props.accordionOpen}
        onOpen={() => {
          props.openAccordion()
        }}
        onClose={() => {
          props.closeAccordion()
        }}
      >
        <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
          <div className={styles.inputGroup}>
            <AUheading size="sm" level="3">
              Status of opportunity
            </AUheading>
            <div className={styles.checkbox}>
              <AUcheckbox label="Open" name="open-opportunities" onClick={props.filterClick} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Closed" name="closed-opportunities" onClick={props.filterClick} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <AUheading size="sm" level="3">
              Open to
            </AUheading>
            <div className={styles.checkbox}>
              <AUcheckbox label="All" name="all-opportunities" onClick={props.filterClick} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Selected" name="selected-opportunities" onClick={props.filterClick} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="One" name="one-opportunity" onClick={props.filterClick} />
            </div>
          </div>
          <span className={styles.cancelLink}>
            <a href="#dummy" onClick={props.cancelFilters}>
              Cancel
            </a>
          </span>
          <span className={styles.applyFilters}>
            <a href="#dummy" onClick={props.applyFilters}>
              Apply filters
            </a>
          </span>
          <div />
        </div>
      </AUaccordion>
    </div>
    <div
      className={`col-md-push-3 col-md-5 col-sm-push-3 col-sm-5 col-xs-12 ${styles.filtersSectionMobile} ${
        styles.hideDesktop
      }`}
    >
      <AUaccordion
        header={`Filter opportunities ${props.filterCountMobile > 0 ? `• ${props.filterCountMobile}` : ''}`}
        open={props.accordionOpenMobile}
        onOpen={() => {
          props.openAccordionMobile()
        }}
        onClose={() => {
          props.closeAccordionMobile()
        }}
      >
        <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
          <div className={styles.inputGroup}>
            <AUheading size="sm" level="3">
              Type of opportunity
            </AUheading>
            <div className={styles.checkbox}>
              <AUcheckbox label="Innovation" name="innovation-opportunities" onClick={props.filterClickMobile} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Outcomes" name="outcomes-opportunities" onClick={props.filterClickMobile} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Training" name="training-opportunities" onClick={props.filterClickMobile} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Specialists" name="specialists-opportunities" onClick={props.filterClickMobile} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <AUheading size="sm" level="3">
              Status of opportunity
            </AUheading>
            <div className={styles.checkbox}>
              <AUcheckbox label="Open" name="open-opportunities" onClick={props.filterClickMobile} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Closed" name="closed-opportunities" onClick={props.filterClickMobile} />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <AUheading size="sm" level="3">
              Open to
            </AUheading>
            <div className={styles.checkbox}>
              <AUcheckbox label="All" name="all-opportunities" onClick={props.filterClickMobile} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="Selected" name="selected-opportunities" onClick={props.filterClickMobile} />
            </div>
            <div className={styles.checkbox}>
              <AUcheckbox label="One" name="one-opportunity" onClick={props.filterClickMobile} />
            </div>
          </div>
          <span className={styles.cancelLink}>
            <a href="#dummy">Cancel</a>
          </span>
          <span className={styles.applyFilters}>
            <a href="#dummy">Apply filters</a>
          </span>
          <div />
        </div>
      </AUaccordion>
    </div>
  </div>
)

export default OpportunitiesFilters
