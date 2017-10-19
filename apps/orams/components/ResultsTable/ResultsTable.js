/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { uniqueID } from 'shared/utils/helpers'
import { connect } from 'react-redux'
import styles from './ResultsTable.scss'
import PageAlert from '@gov.au/page-alerts'

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
          ? <PageAlert as={alert.type}>
              <h4>
                {alert.message}
              </h4>
            </PageAlert>
          : ''}
        <div className={styles.tableContainer}>
          {categories &&
            categories.map((category, id = uniqueID()) =>
              <div key={id + category.category}>
                <div className={styles.categoryTitle}>
                  {category.category}
                </div>
                {category.suppliers.map((supplier, id = uniqueID()) =>
                  <div key={id} className={styles.tableRow}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <span className={styles.name}>
                          <a href="#">
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
