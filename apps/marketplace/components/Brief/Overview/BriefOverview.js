import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { rootPath } from 'marketplace/routes'
import ErrorBox from 'shared/form/ErrorBox'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import BriefOverviewSection from './BriefOverviewSection'

import styles from './BriefOverview.scss'

export class BriefOverview extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showDeleteAlert: false,
      showDeleteButton: false
    }
  }

  componentWillMount = () => {
    if (this.props.status === 'draft') {
      this.setState(prevState => ({
        showDeleteButton: !prevState.showDeleteButton
      }))
    }
  }

  componentDidUpdate = () => {
    if (this.state.showDeleteAlert) {
      window.scrollTo(0, this.deleteAlert.offsetTop)
    }
  }

  toggleDeleteAlert = () => {
    this.setState(prevState => ({
      showDeleteAlert: !prevState.showDeleteAlert,
      showDeleteButton: !prevState.showDeleteButton
    }))
  }

  render() {
    const { briefId, deleteBrief, deleteBriefSuccess, sections, setFocus, title, lotSlug, status } = this.props

    return (
      <div className="row">
        <div className="col-xs-12">
          {deleteBriefSuccess && <Redirect to={`${rootPath}/buyer-dashboard`} />}
          {!deleteBriefSuccess && <ErrorBox title="There was a problem deleting the brief" setFocus={setFocus} />}
          {lotSlug === 'digital-professionals' && status === 'draft' && (
            <AUpageAlert as="warning">
              <h2>This page has been retired.</h2>
              <p>
                Use the <a href="/2/buyer-specialist/create">new specialist approach</a> to publish this opportunity.
              </p>
            </AUpageAlert>
          )}
          <div className={styles.overviewHeading}>
            <span className={styles.overview}>Overview</span>
            <AUheading className={styles.briefTitle} size="xl" level="1">
              {title}
            </AUheading>
          </div>
          {this.state.showDeleteAlert && (
            <div className="row">
              <div
                className={styles.confirmDeleteAlert}
                ref={alert => {
                  this.deleteAlert = alert
                }}
              >
                <AUpageAlert as="warning">
                  <p>Are you sure you want to delete this brief?</p>
                  <AUbutton onClick={() => deleteBrief(briefId)}>Yes, delete brief</AUbutton>
                  <AUbutton as="secondary" className={styles.cancelDeleteButton} onClick={this.toggleDeleteAlert}>
                    Do not delete
                  </AUbutton>
                </AUpageAlert>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-12">
              <ol className={`${styles.briefOverviewSections}`}>
                {sections.map(section => (
                  <BriefOverviewSection key={`section.${section.title}`} links={section.links} title={section.title} />
                ))}
              </ol>
            </div>
          </div>
          {this.state.showDeleteButton && (
            <div className="row">
              <div className={styles.deleteButtonContainer}>
                <AUbutton className={styles.deleteButton} onClick={this.toggleDeleteAlert}>
                  Delete
                </AUbutton>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default BriefOverview
