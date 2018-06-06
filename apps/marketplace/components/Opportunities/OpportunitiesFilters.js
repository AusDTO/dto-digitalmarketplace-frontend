import React, { Component } from 'react'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './Opportunities.scss'

export class OpportunitiesFilters extends Component {
  constructor(props) {
    super(props)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
    this.handleTypeFilterClick = this.handleTypeFilterClick.bind(this)
    this.handleFilterCancelClick = this.handleFilterCancelClick.bind(this)
    this.handleFilterApplyClick = this.handleFilterApplyClick.bind(this)
  }

  handleCheckboxClick(e) {
    const type = e.target.getAttribute('data-filter-type')
    const filter = e.target.name
    if (filter && type) {
      switch (type) {
        case 'status':
          this.props.toggleStatusFilter(filter)
          break

        case 'openTo':
          this.props.toggleOpenToFilter(filter)
          break

        case 'type':
          this.props.toggleTypeFilter(filter)
          break

        default:
          break
      }
    }
  }

  handleTypeFilterClick(e) {
    e.preventDefault()
    const filter = e.target.getAttribute('data-filter')
    if (filter) {
      this.props.toggleTypeFilter(filter)
      this.props.applyFilters()
    }
  }

  handleFilterCancelClick(e) {
    e.preventDefault()
    this.props.closeAccordion()
  }

  handleFilterApplyClick(e) {
    e.preventDefault()
    this.props.applyFilters()
    this.props.closeAccordion()
  }

  render() {
    return (
      <div>
        <div className={`col-md-6 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
          <ul className="au-link-list au-link-list--inline">
            <li className={styles.filterContainer}>
              <a
                href="#dummy"
                className={`${styles.filter} ${styles.firstFilter} ${
                  this.props.activeTypeFilters.innovation ? styles.active : ''
                }`}
                onClick={this.handleTypeFilterClick}
                data-filter="innovation"
              >
                Innovation
              </a>
            </li>
            <li className={styles.filterContainer}>
              <a
                href="#dummy"
                className={`${styles.filter} ${this.props.activeTypeFilters.outcomes ? styles.active : ''}`}
                onClick={this.handleTypeFilterClick}
                data-filter="outcomes"
              >
                Outcomes
              </a>
            </li>
            <li className={styles.filterContainer}>
              <a
                href="#dummy"
                className={`${styles.filter} ${this.props.activeTypeFilters.training ? styles.active : ''}`}
                onClick={this.handleTypeFilterClick}
                data-filter="training"
              >
                Training
              </a>
            </li>
            <li className={styles.filterContainer}>
              <a
                href="#dummy"
                className={`${styles.filter} ${styles.lastFilter} ${
                  this.props.activeTypeFilters.specialists ? styles.active : ''
                }`}
                onClick={this.handleTypeFilterClick}
                data-filter="specialists"
              >
                Specialists
              </a>
            </li>
          </ul>
        </div>
        <div className={`col-md-2 col-sm-12 ${styles.hideMobile}`}>
          <AUaccordion
            header={`Filters ${this.props.getActiveFilterCount() > 0 ? `• ${this.props.getActiveFilterCount()}` : ''}`}
            open={this.props.accordionOpen}
            onOpen={() => {
              this.props.openAccordion()
            }}
            onClose={() => {
              this.props.closeAccordion()
            }}
          >
            <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
              <div className={styles.inputGroup}>
                <AUheading size="sm" level="3">
                  Status of opportunity
                </AUheading>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Open"
                    data-filter-type="status"
                    name="open"
                    onChange={this.handleCheckboxClick}
                    checked={this.props.activeStatusFilters.open}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Closed"
                    data-filter-type="status"
                    name="closed"
                    onChange={this.handleCheckboxClick}
                    checked={this.props.activeStatusFilters.closed}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <AUheading size="sm" level="3">
                  Open to
                </AUheading>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="All"
                    data-filter-type="openTo"
                    name="all"
                    onChange={this.handleCheckboxClick}
                    checked={this.props.activeOpenToFilters.all}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Selected"
                    data-filter-type="openTo"
                    name="selected"
                    onChange={this.handleCheckboxClick}
                    checked={this.props.activeOpenToFilters.selected}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="One"
                    data-filter-type="openTo"
                    name="one"
                    onChange={this.handleCheckboxClick}
                    checked={this.props.activeOpenToFilters.one}
                  />
                </div>
              </div>
              <span className={styles.cancelLink}>
                <a href="#dummy" onClick={this.handleFilterCancelClick}>
                  Cancel
                </a>
              </span>
              <span className={styles.applyFilters}>
                <a href="#dummy" onClick={this.handleFilterApplyClick}>
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
            header={`Filter opportunities ${
              this.props.getActiveFilterCount(true) > 0 ? `• ${this.props.getActiveFilterCount(true)}` : ''
            }`}
            open={this.props.accordionOpen}
            onOpen={() => {
              this.props.openAccordion()
            }}
            onClose={() => {
              this.props.closeAccordion()
            }}
          >
            <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
              <div className={styles.inputGroup}>
                <AUheading size="sm" level="3">
                  Type of opportunity
                </AUheading>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Innovation"
                    name="innovation"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="type"
                    checked={this.props.activeTypeFilters.innovation}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Outcomes"
                    name="outcomes"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="type"
                    checked={this.props.activeTypeFilters.outcomes}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Training"
                    name="training"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="type"
                    checked={this.props.activeTypeFilters.training}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Specialists"
                    name="specialists"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="type"
                    checked={this.props.activeTypeFilters.specialists}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <AUheading size="sm" level="3">
                  Status of opportunity
                </AUheading>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Open"
                    name="open"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="status"
                    checked={this.props.activeStatusFilters.open}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Closed"
                    name="closed"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="status"
                    checked={this.props.activeStatusFilters.closed}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <AUheading size="sm" level="3">
                  Open to
                </AUheading>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="All"
                    name="all"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="openTo"
                    checked={this.props.activeOpenToFilters.all}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Selected"
                    name="selected"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="openTo"
                    checked={this.props.activeOpenToFilters.selected}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="One"
                    name="one"
                    onChange={this.handleCheckboxClick}
                    data-filter-type="openTo"
                    checked={this.props.activeOpenToFilters.one}
                  />
                </div>
              </div>
              <span className={styles.cancelLink}>
                <a href="#dummy" onClick={this.handleFilterCancelClick}>
                  Cancel
                </a>
              </span>
              <span className={styles.applyFilters}>
                <a href="#dummy" onClick={this.handleFilterApplyClick}>
                  Apply filters
                </a>
              </span>
              <div />
            </div>
          </AUaccordion>
        </div>
      </div>
    )
  }
}

OpportunitiesFilters.propTypes = {}

export default OpportunitiesFilters
