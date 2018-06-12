import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './Opportunities.scss'

export class OpportunitiesFilters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: props.accordionOpen,
      statusFilters: {
        live: false,
        closed: false
      },
      openToFilters: {
        selected: false,
        one: false,
        all: false
      },
      typeFilters: {
        innovation: false,
        outcomes: false,
        training: false,
        specialists: false
      },
      activeStatusFilters: {
        live: false,
        closed: false
      },
      activeOpenToFilters: {
        selected: false,
        one: false,
        all: false
      },
      activeTypeFilters: {
        innovation: false,
        outcomes: false,
        training: false,
        specialists: false
      }
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleTypeFilterClick = this.handleTypeFilterClick.bind(this)
    this.handleFilterCancelClick = this.handleFilterCancelClick.bind(this)
    this.handleFilterApplyClick = this.handleFilterApplyClick.bind(this)
  }

  setActiveFilterState() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.activeStatusFilters = { ...curState.statusFilters }
      newState.activeOpenToFilters = { ...curState.openToFilters }
      newState.activeTypeFilters = { ...curState.typeFilters }
      return newState
    })
  }

  getFilterValues() {
    return {
      statusFilters: { ...this.state.statusFilters },
      openToFilters: { ...this.state.openToFilters },
      typeFilters: { ...this.state.typeFilters }
    }
  }

  getActiveFilterCount = (isMobile = false) => {
    let count = 0
    Object.keys(this.state.activeStatusFilters).map(filter => {
      if (this.state.activeStatusFilters[filter]) {
        count += 1
      }
      return true
    })
    Object.keys(this.state.activeOpenToFilters).map(filter => {
      if (this.state.activeOpenToFilters[filter]) {
        count += 1
      }
      return true
    })
    if (isMobile) {
      Object.keys(this.state.activeTypeFilters).map(filter => {
        if (this.state.activeTypeFilters[filter]) {
          count += 1
        }
        return true
      })
    }
    return count
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  toggleStatusFilter = filter => {
    this.setState(curState => {
      const newState = { ...curState }
      if (filter in curState.statusFilters) {
        newState.statusFilters[filter] = !curState.statusFilters[filter]
      }
      return newState
    })
  }

  toggleOpenToFilter = filter => {
    this.setState(curState => {
      const newState = { ...curState }
      if (filter in curState.openToFilters) {
        newState.openToFilters[filter] = !curState.openToFilters[filter]
      }
      return newState
    })
  }

  toggleTypeFilter = (filter, callback = () => {}) => {
    this.setState(curState => {
      const newState = { ...curState }
      if (filter in curState.typeFilters) {
        newState.typeFilters[filter] = !curState.typeFilters[filter]
      }
      return newState
    }, callback)
  }

  matchFilterStateToActiveState() {
    this.setState(curState => {
      const newState = { ...curState }
      if (curState.activeStatusFilters) {
        newState.statusFilters = { ...curState.activeStatusFilters }
      }
      if (curState.activeOpenToFilters) {
        newState.openToFilters = { ...curState.activeOpenToFilters }
      }
      if (curState.activeTypeFilters) {
        newState.typeFilters = { ...curState.activeTypeFilters }
      }
      return newState
    })
  }

  handleCheckboxChange(e) {
    const type = e.target.getAttribute('data-filter-type')
    const filter = e.target.name
    if (filter && type) {
      switch (type) {
        case 'status':
          this.toggleStatusFilter(filter)
          break

        case 'openTo':
          this.toggleOpenToFilter(filter)
          break

        case 'type':
          this.toggleTypeFilter(filter)
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
      const self = this
      this.toggleTypeFilter(filter, () => {
        self.props.getOpportunities(self.getFilterValues())
        self.setActiveFilterState()
      })
    }
  }

  handleFilterCancelClick(e) {
    e.preventDefault()
    this.matchFilterStateToActiveState()
    this.closeAccordion()
  }

  handleFilterApplyClick(e) {
    e.preventDefault()
    this.props.getOpportunities(this.getFilterValues())
    this.setActiveFilterState()
    this.closeAccordion()
  }

  render() {
    return (
      <div>
        <div className={`col-md-6 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
          <ul className="au-link-list au-link-list--inline">
            <li className={styles.filterContainer}>
              <a
                href="#innovation"
                className={`${styles.filter} ${styles.firstFilter} ${
                  this.state.typeFilters.innovation ? styles.active : ''
                }`}
                onClick={this.handleTypeFilterClick}
                data-filter="innovation"
              >
                Innovation
              </a>
            </li>
            <li className={styles.filterContainer}>
              <a
                href="#outcomes"
                className={`${styles.filter} ${this.state.typeFilters.outcomes ? styles.active : ''}`}
                onClick={this.handleTypeFilterClick}
                data-filter="outcomes"
              >
                Outcomes
              </a>
            </li>
            <li className={styles.filterContainer}>
              <a
                href="#training"
                className={`${styles.filter} ${this.state.typeFilters.training ? styles.active : ''}`}
                onClick={this.handleTypeFilterClick}
                data-filter="training"
              >
                Training
              </a>
            </li>
            <li className={styles.filterContainer}>
              <a
                href="#specialists"
                className={`${styles.filter} ${styles.lastFilter} ${
                  this.state.typeFilters.specialists ? styles.active : ''
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
            header={`Filters ${this.getActiveFilterCount() > 0 ? `• ${this.getActiveFilterCount()}` : ''}`}
            open={this.state.accordionOpen}
            onOpen={() => {
              this.openAccordion()
            }}
            onClose={() => {
              this.closeAccordion()
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
                    name="live"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.statusFilters.live}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Closed"
                    data-filter-type="status"
                    name="closed"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.statusFilters.closed}
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
                    onChange={this.handleCheckboxChange}
                    checked={this.state.openToFilters.all}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Selected"
                    data-filter-type="openTo"
                    name="selected"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.openToFilters.selected}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="One"
                    data-filter-type="openTo"
                    name="one"
                    onChange={this.handleCheckboxChange}
                    checked={this.state.openToFilters.one}
                  />
                </div>
              </div>
              <span className={styles.cancelLink}>
                <a href="#cancel" onClick={this.handleFilterCancelClick}>
                  Cancel
                </a>
              </span>
              <span className={styles.applyFilters}>
                <a href="#apply" onClick={this.handleFilterApplyClick}>
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
              this.getActiveFilterCount(true) > 0 ? `• ${this.getActiveFilterCount(true)}` : ''
            }`}
            open={this.state.accordionOpen}
            onOpen={() => {
              this.openAccordion()
            }}
            onClose={() => {
              this.closeAccordion()
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
                    onChange={this.handleCheckboxChange}
                    data-filter-type="type"
                    checked={this.state.typeFilters.innovation}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Outcomes"
                    name="outcomes"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="type"
                    checked={this.state.typeFilters.outcomes}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Training"
                    name="training"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="type"
                    checked={this.state.typeFilters.training}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Specialists"
                    name="specialists"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="type"
                    checked={this.state.typeFilters.specialists}
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
                    name="live"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="status"
                    checked={this.state.statusFilters.live}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Closed"
                    name="closed"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="status"
                    checked={this.state.statusFilters.closed}
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
                    onChange={this.handleCheckboxChange}
                    data-filter-type="openTo"
                    checked={this.state.openToFilters.all}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="Selected"
                    name="selected"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="openTo"
                    checked={this.state.openToFilters.selected}
                  />
                </div>
                <div className={styles.checkbox}>
                  <AUcheckbox
                    label="One"
                    name="one"
                    onChange={this.handleCheckboxChange}
                    data-filter-type="openTo"
                    checked={this.state.openToFilters.one}
                  />
                </div>
              </div>
              <span className={styles.cancelLink}>
                <a href="#cancel" onClick={this.handleFilterCancelClick}>
                  Cancel
                </a>
              </span>
              <span className={styles.applyFilters}>
                <a href="#apply" onClick={this.handleFilterApplyClick}>
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

OpportunitiesFilters.propTypes = {
  getOpportunities: PropTypes.func.isRequired,
  accordionOpen: PropTypes.bool.isRequired
}

export default OpportunitiesFilters
