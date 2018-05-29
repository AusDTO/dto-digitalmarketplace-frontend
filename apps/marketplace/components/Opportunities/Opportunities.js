/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Opportunities.scss'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'

export class Opportunities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accordionOpen: false
    }
  }

  openAccordion = () => {
    this.setState({ accordionOpen: true })
  }

  closeAccordion = () => {
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
            <div className="col-md-4 col-sm-12">
              <h1 className="au-display-xl">Opportunities</h1>
            </div>
            <div className={`col-md-6 col-sm-12 ${styles.filtersSection} ${styles.hideMobile}`}>
              <ul className="au-link-list au-link-list--inline">
                <li className={styles.filterContainer}><a href="#" className={`${styles.filter} ${styles.firstFilter}`}>Innovation</a></li>
                <li className={styles.filterContainer}><a href="#" className={`${styles.filter}`}>Outcomes</a></li>
                <li className={styles.filterContainer}><a href="#" className={styles.filter}>Training</a></li>
                <li className={styles.filterContainer}><a href="#" className={`${styles.filter} ${styles.lastFilter}`}>Specialists</a></li>
              </ul>
            </div>
            <div className={`col-md-2 col-sm-12 ${styles.hideMobile}`}>
              <AUaccordion
                  header='Filters'
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
                    <div className={styles.checkbox}><AUcheckbox label="Open" name="open-opportunities" /></div>
                    <div className={styles.checkbox}><AUcheckbox label="Closed" name="closed-opportunities" /></div>
                  </div>
                  <div className={styles.inputGroup}>
                    <h3 className="au-display-sm">Open to</h3>
                    <div className={styles.checkbox}><AUcheckbox label="All" name="all-opportunities" /></div>
                    <div className={styles.checkbox}><AUcheckbox label="Selected" name="selected-opportunities" /></div>
                    <div className={styles.checkbox}><AUcheckbox label="One" name="one-opportunity" /></div>
                  </div>
                    <span className={styles.cancelLink}><a href="#">Cancel</a></span>
                    <span className={styles.applyFilters}><a href="#">Apply filters</a></span>
                  <div>
                  </div>
                </div>
              </AUaccordion>
            </div>
          </div>
          {items.length > 0 &&
            <div className={styles.table}>
              <div className={styles.headingRow}>
                <div className="row">
                  <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                    Open to
                  </div>
                  <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>
                    ID
                  </div>
                  <div className={`col-md-4 col-sm-4 ${styles.cell}`}>
                    Name
                  </div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`}>
                    Location
                  </div>
                  <div className={`col-md-2 col-sm-2 ${styles.cell}`}>
                    Closing
                  </div>
                  <div className={`col-md-1 col-sm-1 ${styles.cell}`}>
                    Submissions
                  </div>
                </div>
              </div>
              {items.map(item =>
                <div className={styles.tableRow} key={`item.${item.id}`}>
                  <div className="row">
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter} ${styles.firstColumn}`}>
                      <div className={`${styles.badge}`}>
                        {item.openTo}
                      </div>
                    </div>
                    <div className={`col-md-1 col-sm-1 ${styles.cell} ${styles.alignCenter}`}>
                      {item.id}
                    </div>
                    <div className={`col-md-4 col-sm-4 ${styles.cell}`}>
                      <a href={`/digital-marketplace/opportunities/${item.id}`}>
                        {item.name}
                      </a>
                      <div>At: {item.company}</div>
                    </div>
                    <div className={`col-md-2 col-sm-2 ${styles.cell}`}>
                      {item.location}
                    </div>
                    <div className={`col-md-2 col-sm-2 ${styles.cell}`}>
                      {item.closing}
                    </div>
                    <div className={`col-md-1 col-sm-1 ${styles.cell}`}>
                      {item.submissions}
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        </article>
      </div>
    )
  }
}

Opportunities.propTypes = {
}

const mapStateToProps = ({ }) => ({

})

export default connect(mapStateToProps)(Opportunities)
