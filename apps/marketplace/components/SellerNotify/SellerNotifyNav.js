import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import AUprogressIndicator from '@gov.au/progress-indicator/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import styles from './SellerNotify.scss'

export class SellerNotifyNav extends Component {
  handleClick(e) {
    e.preventDefault()
    const el = e.currentTarget
    this.props.history.push(el.attributes.href.value)
  }

  handleStatusChange(stage, status) {
    this.props.setStageStatus(stage, status)
  }

  render() {
    const navPart = this.props.flow

    const items = [
      {
        link: `${rootPath}/brief/${this.props.briefId}/seller-${navPart}`,
        text: 'Introduction',
        status: this.props.stages.introduction,
        onClick: e => {
          this.handleClick(e)
          this.handleStatusChange('introduction', 'doing')
        }
      },
      {
        link: `${rootPath}/brief/${this.props.briefId}/seller-${navPart}/select`,
        text: 'Select sellers',
        status: this.props.stages.select,
        onClick: e => {
          this.handleClick(e)
          this.handleStatusChange('select', 'doing')
        }
      },
      {
        link: `${rootPath}/brief/${this.props.briefId}/seller-${navPart}/review`,
        text: 'Review email',
        status: this.props.stages.review,
        onClick: e => {
          this.handleClick(e)
          this.handleStatusChange('review', 'doing')
        }
      }
    ]

    return (
      <div className="row">
        <div className={`${styles.progressIndicator} col-xs-12`} aria-live="polite" aria-relevant="additions removals">
          <AUprogressIndicator items={items} />
        </div>
      </div>
    )
  }
}

SellerNotifyNav.propTypes = {
  flow: PropTypes.string.isRequired,
  briefId: PropTypes.string.isRequired
}

export default withRouter(SellerNotifyNav)
