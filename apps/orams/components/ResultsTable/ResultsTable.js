/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { uniqueID } from 'shared/utils/helpers'
import { connect } from 'react-redux'
import styles from './ResultsTable.scss'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

class ResultsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.focusIfNeeded()
  }

  componentDidUpdate() {
    this.focusIfNeeded()
  }

  setRef = c => {
    this._container = c
  }

  focusIfNeeded() {
    if (this._container && this.props.tableFocus) {
      this._container.focus()
    }
  }

  render(props) {
    const { categories, alert } = this.props.data

    return (
      <div tabIndex="0" ref={this.setRef} className={styles.table}>
        {alert
          ? <AUpageAlert as={alert.type}>
              <h4>
                {alert.message}
              </h4>
            </AUpageAlert>
          : ''}
        <div className={styles.tableContainer}>
          {categories &&
            categories.map((category, id = uniqueID()) =>
              <div key={id + category.name}>
                <div className={styles.categoryTitle}>
                  {category.name}
                </div>
                {category.suppliers.map((supplier, id = uniqueID()) =>
                  <div key={id} className={styles.tableRow}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <span className={styles.name}>
                          <a
                            onClick={() => {
                              this.props.history.push(`/orams/seller-profile/${supplier.code}`)
                            }}
                          >
                            {supplier.name}
                          </a>
                        </span>
                        <span className={styles.priceElements}>
                          <div className={styles.price}>
                            {'$' + supplier.price}
                          </div>
                          <div className={styles.incGst}>inc GST</div>
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <span className={styles.phone}>
                          {supplier.phone}
                        </span>
                        <span className={styles.email}>
                          <a href={'mailto:' + supplier.email}>
                            {supplier.email}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    )
  }
}

ResultsTable.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsTable))
