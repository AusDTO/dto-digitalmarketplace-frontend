import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
import SellerNotifyEmailTextArea from './SellerNotifyEmailTextArea'
import SellerNotifySellerList from './SellerNotifySellerList'
import styles from './SellerNotify.scss'

export class SellerNotifyReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      content: ''
    }

    switch (this.props.flow) {
      case 'unsuccessful':
        this.state.subject = 'Your submission was unsuccessful'
        break

      default:
        break
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectSellersClick = this.handleSelectSellersClick.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('review', 'doing')
  }

  handleSubjectChange(e) {
    const subjectEl = e.currentTarget
    const subject = subjectEl.value
    this.setState({
      subject
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const model = {
      flow: this.props.flow,
      subject: this.state.subject,
      content: this.state.content,
      selectedSellers: this.props.selectedSellers
    }
    this.props.setStageStatus('review', 'done')
    this.props.setStageDoneStatus('review', true)
    this.props.handleSubmit(this.props.brief.id, model)
  }

  handleSelectSellersClick(e) {
    e.preventDefault()
    this.props.moveToStage('select')
  }

  render() {
    if (!this.props.hasSelectedASeller()) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <AUpageAlert as="error">
              <p>
                You must first select at least one seller from the{' '}
                <a href="#select" onClick={this.handleSelectSellersClick}>
                  Select sellers
                </a>{' '}
                stage.
              </p>
            </AUpageAlert>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Review email</h2>
          <p>
            <strong>This email will be sent seperately to:</strong>
          </p>
          <SellerNotifySellerList sellers={this.props.selectedSellers} />
          <form onSubmit={this.handleSubmit} className={styles.reviewForm}>
            <input type="hidden" name="flow" value={this.props.flow} />
            <p>
              <label htmlFor="input_subject_line">Subject line</label>
              <AUtextInput
                id="input_subject_line"
                name="subject_line"
                onChange={this.handleSubjectChange}
                value={this.state.subject}
                block
                required
              />
            </p>
            <p>
              <SellerNotifyEmailTextArea brief={this.props.brief} flow={this.props.flow} />
            </p>
            <p>
              <AUbutton type="submit">Send email</AUbutton>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

SellerNotifyReview.propTypes = {
  flow: PropTypes.string.isRequired,
  selectedSellers: PropTypes.array.isRequired
}

export default SellerNotifyReview
