/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Opportunities.scss'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import Pagination from 'shared/Pagination/Pagination'

export class Opportunities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: false,
      accordionOpenMobile: false,
      filterCount: 0,
      filterCountMobile: 0
    }
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
    this.setState({ accordionOpen: false })
  }

  openAccordionMobile = () => {
    this.setState({ accordionOpenMobile: true })
  }

  closeAccordionMobile = () => {
    this.setState({ accordionOpenMobile: false })
  }

  filterClick = e => {
    this.setState({ filterCount: e.target.checked === true ? this.state.filterCount + 1 : this.state.filterCount - 1 })
  }

  filterClickMobile = e => {
    this.setState({
      filterCountMobile: e.target.checked === true ? this.state.filterCountMobile + 1 : this.state.filterCountMobile - 1
    })
  }

  applyFilters = e => {
    this.setState({ accordionOpen: false })
  }

  cancelFilters = e => {
    this.setState({ accordionOpen: false })
  }

  render() {
    const items = [
      {
        openTo: 'all',
        id: 1239,
        name: 'Automation proof of concept',
        location: 'Sydney',
        closing: '1w : 3d : 5h',
        submissions: '2 SME',
        company: 'Australian Taxation Office (ATO)'
      },
      {
        openTo: 'all',
        id: 1238,
        name: 'Exploration of commercial datasets to answer questions about household and SME energy use and costs',
        location: 'Offsite',
        closing: '5d : 6h : 36m',
        submissions: '16 (9 SME)',
        company: 'Department of the Environment and Energy'
      },
      {
        openTo: 'one',
        id: 1260,
        name: 'CA GEN Conversion consultancy for Proof of Concept (POC)',
        location: 'Australian Capital Territory',
        closing: '3d : 37h : 8m',
        submissions: '2',
        company: 'Australian Taxation Office (ATO)'
      },
      {
        openTo: 'Selected',
        id: 1263,
        name: 'Data Analytics for Heavy Vehicle Road Reform',
        location: 'Australian Capital Territory',
        closing: 'Closed',
        submissions: '8 (5 SME)',
        company: 'Land Transport Market Reform Branch, Department of Infrastructure, Regional Development and Cities.'
      }
    ]

    return (
      <div className={styles.container}>
        <article className="opportunities-page" role="main">
          <div className={`${styles.header} row`}>
            <div className={`${styles.headerTitle} col-md-4 col-sm-4 col-xs-4`}>
              <h1 className="au-display-xl">Opportunities</h1>
            </div>
            <div className={`col-md-6 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
              <ul className="au-link-list au-link-list--inline">
                <li className={styles.filterContainer}>
                  <a href="#" className={`${styles.filter} ${styles.firstFilter}`}>
                    Innovation
                  </a>
                </li>
                <li className={styles.filterContainer}>
                  <a href="#" className={`${styles.filter}`}>
                    Outcomes
                  </a>
                </li>
                <li className={styles.filterContainer}>
                  <a href="#" className={styles.filter}>
                    Training
                  </a>
                </li>
                <li className={styles.filterContainer}>
                  <a href="#" className={`${styles.filter} ${styles.lastFilter}`}>
                    Specialists
                  </a>
                </li>
              </ul>
            </div>
            <div className={`col-md-2 col-sm-12 ${styles.hideMobile}`}>
              <AUaccordion
                header={`Filters ${this.state.filterCount > 0 ? '• ' + this.state.filterCount : ''}`}
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
                    <h3 className="au-display-sm">Status of opportunity</h3>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Open" name="open-opportunities" onClick={this.filterClick} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Closed" name="closed-opportunities" onClick={this.filterClick} />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <h3 className="au-display-sm">Open to</h3>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="All" name="all-opportunities" onClick={this.filterClick} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Selected" name="selected-opportunities" onClick={this.filterClick} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="One" name="one-opportunity" onClick={this.filterClick} />
                    </div>
                  </div>
                  <span className={styles.cancelLink}>
                    <a href="#" onClick={this.cancelFilters}>Cancel</a>
                  </span>
                  <span className={styles.applyFilters}>
                    <a href="#" onClick={this.applyFilters}>Apply filters</a>
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
                  this.state.filterCountMobile > 0 ? '• ' + this.state.filterCountMobile : ''
                }`}
                open={this.state.accordionOpenMobile}
                onOpen={() => {
                  this.openAccordionMobile()
                }}
                onClose={() => {
                  this.closeAccordionMobile()
                }}
              >
                <div className="au-accordion__body" id="accordion-default" aria-hidden="false">
                  <div className={styles.inputGroup}>
                    <h3 className="au-display-sm">Type of opportunity</h3>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Innovation" name="innovation-opportunities" onClick={this.filterClickMobile} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Outcomes" name="outcomes-opportunities" onClick={this.filterClickMobile} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Training" name="training-opportunities" onClick={this.filterClickMobile} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox
                        label="Specialists"
                        name="specialists-opportunities"
                        onClick={this.filterClickMobile}
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <h3 className="au-display-sm">Status of opportunity</h3>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Open" name="open-opportunities" onClick={this.filterClickMobile} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Closed" name="closed-opportunities" onClick={this.filterClickMobile} />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <h3 className="au-display-sm">Open to</h3>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="All" name="all-opportunities" onClick={this.filterClickMobile} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="Selected" name="selected-opportunities" onClick={this.filterClickMobile} />
                    </div>
                    <div className={styles.checkbox}>
                      <AUcheckbox label="One" name="one-opportunity" onClick={this.filterClickMobile} />
                    </div>
                  </div>
                  <span className={styles.cancelLink}>
                    <a href="#">Cancel</a>
                  </span>
                  <span className={styles.applyFilters}>
                    <a href="#">Apply filters</a>
                  </span>
                  <div />
                </div>
              </AUaccordion>
            </div>
          </div>
          {items.length > 0 && (
            <div className={`${styles.tableDesktop} ${styles.hideMobile}`}>
              <div className={styles.headingRow}>
                <div className="row">
                  <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                    Open to
                  </div>
                  <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>ID</div>
                  <div className={`col-md-4 col-sm-4 ${styles.cell}`}>Name</div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`}>Location</div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`}>Closing</div>
                  <div className={`col-md-1 col-sm-1 ${styles.cell}`}>Submissions</div>
                </div>
              </div>
              {items.map(item => (
                <div className={styles.tableRow} key={`item.${item.id}`}>
                  <div className="row">
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                      <div className={`${styles.badge} ${item.openTo === 'all' ? styles.green : styles.blue}`}>
                        {item.openTo}
                      </div>
                    </div>
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>{item.id}</div>
                    <div className={`col-md-4 col-sm-4 ${styles.cell}`}>
                      <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                      <div>At: {item.company}</div>
                    </div>
                    <div className={`col-md-2 col-sm-2 ${styles.cell}`}>{item.location}</div>
                    <div className={`col-md-2 col-sm-2 ${styles.cell}`}>{item.closing}</div>
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.lastColumn}`}>{item.submissions}</div>
                  </div>
                </div>
              ))}
              <Pagination pageCount={5} pages={[1,2,3,4,5]}/>
            </div>
          )}
          {items.length > 0 && (
            <div className={`${styles.tableMobile} ${styles.hideDesktop}`}>
              {items.map(item => (
                <div className={styles.tableRowMobile} key={`item.${item.id}`}>
                  <div className="row">
                    <div className={`col-md-10 col-sm-10 col-xs-11 ${styles.mobileColumn}`}>
                      <div className={`${styles.badgeMobile} ${item.openTo === 'all' ? styles.green : styles.blue}`}>
                        open to {item.openTo.toLowerCase()}
                      </div>
                      <div className={styles.mobileName}>
                        <a href={`/digital-marketplace/opportunities/${item.id}`}>{item.name}</a>
                        <div className={styles.companyMobile}>At: {item.company}</div>
                      </div>
                      <div className={`${styles.mobileDetails} row`}>
                        <div className="col-md-3 col-sm-3 col-xs-4">
                          <div>
                            <strong>Location:</strong>
                          </div>
                          <div>
                            <strong>Closing:</strong>
                          </div>
                          <div>
                            <strong>Submissions:</strong>
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-8">
                          <div>{item.location}</div>
                          <div>{item.closing}</div>
                          <div>{item.submissions}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    )
  }
}

Opportunities.propTypes = {}

const mapStateToProps = ({}) => ({})

export default connect(mapStateToProps)(Opportunities)
