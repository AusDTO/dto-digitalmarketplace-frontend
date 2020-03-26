import React, { Component } from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import { itemWasEdited } from './helpers'

import localStyles from './SummaryPreview.scss'
import styles from '../../../main.scss'

class SummaryPreview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      summaryDivHeight: 0,
      summaryExpanded: false
    }

    this.summaryRef = React.createRef()
    this.summary = itemWasEdited(props.brief.summary, props.edits.summary) ? props.edits.summary : props.brief.summary

    this.handleExpandSummaryClick = this.handleExpandSummaryClick.bind(this)
  }

  componentDidMount = () => {
    const height = this.summaryRef.clientHeight

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      summaryDivHeight: height
    })
  }

  handleExpandSummaryClick = () => {
    this.setState(prevState => ({
      summaryExpanded: !prevState.summaryExpanded
    }))
  }

  render = () => {
    const { summary } = this
    const { previewHeight } = this.props
    const { summaryDivHeight, summaryExpanded } = this.state

    return (
      <React.Fragment>
        <div
          className={`
            ${summaryDivHeight > previewHeight && !summaryExpanded ? styles.maxHeight4Half : ''}
            ${summaryDivHeight > previewHeight && !summaryExpanded ? styles.overflowHidden : ''}
            ${summaryDivHeight > previewHeight && !summaryExpanded ? styles.bottomLinearGradient : ''}
            ${styles.whiteSpacePreWrap}
          `}
          ref={summaryRef => {
            this.summaryRef = summaryRef
          }}
        >
          {summary}
        </div>
        <div
          className={`
            ${summaryDivHeight <= previewHeight ? styles.hidden : ''}
            ${localStyles.toggleSummaryContainer}
          `}
        >
          <AUbutton as="tertiary" className={localStyles.toggleSummaryButton} onClick={this.handleExpandSummaryClick}>
            {summaryExpanded ? 'Collapse summary' : 'Expand summary'}
          </AUbutton>
        </div>
      </React.Fragment>
    )
  }
}

export default SummaryPreview