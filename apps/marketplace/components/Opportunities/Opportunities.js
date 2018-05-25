/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Opportunities.scss'
import AUaccordion from '@gov.au/accordion/lib/js/react.js'

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
        openTo: 'All',
        id: 1239,
        name: 'Automation proof of concept',
        location: 'Sydney',
        closing: '1w : 3d : 5h',
        submissions: '2 SME'
      },
      {
        openTo: 'All',
        id: 1238,
        name: 'Exploration of commercial datasets to answer questions about household and SME energy use and costs',
        location: 'Offsite',
        closing: '5d : 6h : 36m',
        submissions: '16 (9 SME)'
      }
    ]

    return (
      <div className={styles.container}>
        <article role="main">
          <div className={`${styles.header} row`}>
            <div className="col-md-4 col-sm-12">
              <h1 className="au-display-xl">Opportunities</h1>
            </div>
            <div className="col-md-6 col-sm-12">
              <ul class="au-link-list au-link-list--inline">
                <li><a href="#">Innovation</a></li>
                <li><a href="#">Outcomes</a></li>
                <li><a href="#">Training</a></li>
                <li><a href="#">Specialists</a></li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-12">
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
                  <div>
                    Test
                  </div>
                </div>
              </AUaccordion>
            </div>
          </div>
          {items.length > 0 &&
            <div className="row">
              <div className="col-xs-12">
                <table className={`${styles.resultListing} col-xs-12`}>
                  <thead>
                    <tr className={styles.headingRow}>
                      <th scope="col" className={styles.colOpenTo}>
                        Open to
                      </th>
                      <th scope="col" className={styles.colId}>
                        ID
                      </th>
                      <th scope="col" className={styles.colName}>
                        Name
                      </th>
                      <th scope="col" className={styles.colLocation}>
                        Location
                      </th>
                      <th scope="col" className={styles.colClosing}>
                        Closing
                      </th>
                      <th scope="col" className={styles.colSubmissions}>
                        Submissions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item =>
                      <tr key={`item.${item.id}`}>
                        <td className={styles.colOpenTo}>
                          <div className={`${styles.badge}`}>
                            {item.openTo}
                          </div>
                        </td>
                        <td className={styles.colId}>
                          {item.id}
                        </td>
                        <td className={styles.colName}>
                          <a href={`/digital-marketplace/opportunities/${item.id}`}>
                            {item.name}
                          </a>
                        </td>
                        <td className={styles.colLocation}>
                          {item.location}
                        </td>
                        <td className={styles.colClosing}>
                          {item.closing}
                        </td>
                        <td className={styles.colSubmissions}>
                          {item.submissions}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>}
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
