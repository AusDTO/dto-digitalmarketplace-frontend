import React, { Component } from 'react'
import ProgressIndicator from '@gov.au/progress-indicator/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

export class SellerUnsuccessfulNav extends Component {
  constructor(props) {
    super(props)
    
  }

  handleClick(e) {
    e.preventDefault()
    console.log(e)
  }

  render() {
    const items = [
      {
        link: `${rootPath}/seller/unsuccessful`,
        text: 'Introduction',
        status: 'doing',
        onClick: this.handleClick,
      },
      {
        link: `${rootPath}/seller/unsuccessful/select`,
        text: 'Select sellers',
        status: 'todo',
        onClick: this.handleClick,
      },
      {
        link: `${rootPath}/seller/unsuccessful/review`,
        text: 'Review email',
        status: 'todo',
        onClick: this.handleClick,
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
