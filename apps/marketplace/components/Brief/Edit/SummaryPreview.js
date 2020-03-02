import React, { Component } from 'react'

import AUbutton from '@gov.au/buttons/lib/js/react.js'

import { itemWasEdited } from './helpers'

import localStyles from './SummaryPreview.scss'
import styles from '../../../main.scss'

class SummaryPreview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      summaryExpanded: false
    }

    this.SUMMARY_PREVIEW_LENGTH = 245
    this.summary = itemWasEdited(props.brief.summary, props.edits.summary) ? props.edits.summary : props.brief.summary
    this.longSummary = this.summary.length > this.SUMMARY_PREVIEW_LENGTH
    this.summaryPreview = this.longSummary ? this.summary.slice(0, this.SUMMARY_PREVIEW_LENGTH) : this.summary

    this.handleExpandSummaryClick = this.handleExpandSummaryClick.bind(this)
  }

  handleExpandSummaryClick = () => {
    this.setState(prevState => ({
      summaryExpanded: !prevState.summaryExpanded
    }))
  }

  render = () => {
    const { longSummary, summary, summaryPreview } = this
    const { summaryExpanded } = this.state

    return (
      <React.Fragment>
        <td className={`${styles.tableColumnWidth19} ${!longSummary ? styles.hidden : ''}`}>
          <div className={`${!summaryExpanded ? styles.bottomLinearGradient : ''}`}>
            <p>{summaryExpanded ? summary : summaryPreview}</p>
          </div>
          <div className={localStyles.toggleSummaryContainer}>
            <AUbutton as="tertiary" className={localStyles.toggleSummaryButton} onClick={this.handleExpandSummaryClick}>
              {summaryExpanded ? 'Collapse summary' : 'Expand summary'}
            </AUbutton>
          </div>
        </td>
        <td className={`${styles.tableColumnWidth19} ${longSummary ? styles.hidden : ''}`}>{summary}</td>
      </React.Fragment>
    )
  }
}

export default SummaryPreview
