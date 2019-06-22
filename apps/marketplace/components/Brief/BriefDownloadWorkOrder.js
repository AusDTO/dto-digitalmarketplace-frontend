import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
// import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
// import styles from './BriefDownloadResponses.scss'

export class BriefDownloadWorkOrder extends Component {
  constructor(props) {
    super(props)

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(e) {
    e.preventDefault()
    window.location = `/api/2/brief/${this.props.brief.id}/respond/documents`
  }

  render() {
    const { brief } = this.props

    const simpleWorkOrder = (
      <React.Fragment>
        <p>
          We recommend you use the <b>simple work order</b> for this opportunity. This work order is suitable for simple
          or low value procurements.
        </p>
        <p>
          <AUbutton onClick={this.handleButtonClick}>Download simple work order</AUbutton>
        </p>
      </React.Fragment>
    )

    return (
      <span>
        <AUheading size="xl" level="1">
          Download work order
        </AUheading>
        {brief.lotSlug === 'specialist' && (
          <React.Fragment>
            <p>
              We recommend you use the <b>specialist work order</b> for this opportunity. This work order is suitable
              for hiring specialists.
            </p>
            <p>
              <AUbutton onClick={this.handleButtonClick}>Download specialist work order</AUbutton>
            </p>
          </React.Fragment>
        )}
        {brief.lotSlug === 'rfx' && (
          <React.Fragment>
            {brief.comprehensiveTerms ? (
              <React.Fragment>
                <p>
                  We recommend you use the <b>comprehensive work order</b> for this opportunity. This work order is
                  suitable for complex or high value procurements.
                </p>
                <p>
                  <AUbutton onClick={this.handleButtonClick}>Download comprehensive work order</AUbutton>
                </p>
              </React.Fragment>
            ) : (
              simpleWorkOrder
            )}
          </React.Fragment>
        )}
        {brief.lotSlug === 'training' && simpleWorkOrder}
        <p>Other work orders are available on the templates page.</p>
        <p>
          <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
        </p>
      </span>
    )
  }
}

BriefDownloadWorkOrder.propTypes = {
  brief: PropTypes.object.isRequired
}

export default BriefDownloadWorkOrder
