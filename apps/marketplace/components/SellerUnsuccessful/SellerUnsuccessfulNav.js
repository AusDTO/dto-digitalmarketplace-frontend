import React, { Component } from 'react'
import ProgressIndicator from '@gov.au/progress-indicator/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

export class SellerUnsuccessfulNav extends Component {
  handleClick(e) {
    e.preventDefault()
    const el = e.currentTarget
    this.props.history.push(el.attributes.href.value)
  }

  handleStatusChange(stage, status) {
    if (this.props[stage] !== 'done') {
      this.props.setStageStatus(stage, status)
    }
  }

  render() {
    const items = [
      {
        link: `${rootPath}/seller/unsuccessful`,
        text: 'Introduction',
        status: this.props.introduction,
        onClick: (e) => {
          this.handleClick(e)
          this.handleStatusChange('introduction', 'doing')
        }
      },
      {
        link: `${rootPath}/seller/unsuccessful/select`,
        text: 'Select sellers',
        status: this.props.select,
        onClick: (e) => {
          this.handleClick(e)
          this.handleStatusChange('select', 'doing')
        }
      },
      {
        link: `${rootPath}/seller/unsuccessful/review`,
        text: 'Review email',
        status: this.props.review,
        onClick: (e) => {
          this.handleClick(e)
          this.handleStatusChange('review', 'doing')
        }
      }
    ]

    return (
      <div className="row">
        <div className="col-xs-12">
          <ProgressIndicator items={items}/>
        </div>
      </div>
    )
  }
}

export default SellerUnsuccessfulNav
