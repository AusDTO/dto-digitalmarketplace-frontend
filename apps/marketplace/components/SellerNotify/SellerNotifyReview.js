import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import SellerNotifySellerList from './SellerNotifySellerList'
import styles from './SellerNotify.scss'

const emailContent = (brief, flow) => {
  let content = ''

  switch (flow) {
    case 'unsuccessful':
      content = `Unfortunately your application for ${brief.title} was not successful. However please keep in mind this may change and ${brief.organisation} may contact you at a later date for an interview.

The ${brief.organisation} has forwarded us some feedback which we thought you would find helpful:`
      break

    default:
      break
  }

  return content
}

const subjectContent = flow => {
  let subject = ''

  switch (flow) {
    case 'unsuccessful':
      subject = 'Your submission was unsuccessful'
      break

    default:
      break
  }

  return subject
}

export class SellerNotifyReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: subjectContent(props.flow),
      content: emailContent(props.brief, props.flow)
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleEmailContentChange = this.handleEmailContentChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSelectSellersClick = this.handleSelectSellersClick.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('review', 'doing')
  }

  handleSubjectChange(e) {
    this.setState({ subject: e.target.value })
  }

  handleEmailContentChange(e) {
    this.setState({ content: e.target.value })
  }

  handleFormSubmit(e) {
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
          <AUheading size="lg" level="2">
            Review email
          </AUheading>
          <p>
            <strong>This email will be sent seperately to:</strong>
          </p>
          <SellerNotifySellerList sellers={this.props.selectedSellers} />
          <form onSubmit={this.handleFormSubmit} className={styles.reviewForm}>
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
              <label htmlFor="input_email_content">Email</label>
              <AUtextInput
                as="textarea"
                id="input_email_content"
                name="email_content"
                value={this.state.content}
                onChange={this.handleEmailContentChange}
                className={styles.emailContent}
                block
                required
              />
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
  brief: PropTypes.object.isRequired,
  selectedSellers: PropTypes.array.isRequired,
  hasSelectedASeller: PropTypes.func.isRequired,
  setStageStatus: PropTypes.func.isRequired,
  moveToStage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired
}

export default SellerNotifyReview
