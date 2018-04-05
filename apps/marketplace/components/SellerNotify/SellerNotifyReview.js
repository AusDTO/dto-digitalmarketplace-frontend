import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@gov.au/buttons/lib/js/react.js'
import SellerNotifyEmailUnsuccessful from './SellerNotifyEmailUnsuccessful'
import styles from './SellerNotify.scss'

export class SellerNotifyReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: ''
    }

    switch (this.props.flow) {
      case 'unsuccessful':
        this.state.subject = 'Your submission was unsuccessful'
        break

      default:
        break
    }

    this.emailContent = null
    this.setEmailContentRef = element => {
      this.emailContent = element
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getEmailContent = this.getEmailContent.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('review', 'doing')
  }

  getEmailContent() {
    switch (this.props.flow) {
      case 'unsuccessful':
        return <SellerNotifyEmailUnsuccessful brief={this.props.brief} />

      default:
        return <p />
    }
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
      subject: this.state.subject,
      content: this.emailContent.innerHTML,
      selectedSellers: this.props.selectedSellers
    }
    this.props.setStageStatus('review', 'done')
    this.props.handleSubmit(this.props.brief.id, model)
  }

  render() {
    if (!this.props.hasSelectedASeller()) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h2>Review email</h2>
            <p>You must first select at least one seller to email.</p>
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
          <ul className={styles.sellerList}>
            {this.props.selectedSellers.map(seller =>
              <li key={seller.supplier_code}>
                {seller.contact_name}, {seller.supplier_name}
              </li>
            )}
          </ul>
          <form onSubmit={this.handleSubmit} className={styles.reviewForm}>
            <label htmlFor="input_subject_line">Subject line</label>
            <input
              type="text"
              id="input_subject_line"
              name="subject_line"
              onChange={this.handleSubjectChange}
              value={this.state.subject}
            />
            <label htmlFor="email_body">Email</label>
            <div
              id="input_email_content"
              contentEditable="true"
              role="textbox"
              aria-multiline="true"
              tabIndex={0}
              suppressContentEditableWarning
              ref={this.setEmailContentRef}
            >
              {this.getEmailContent()}
            </div>
            <Button onClick={this.handleSubmit} text="Send email" />
          </form>
        </div>
      </div>
    )
  }
}

SellerNotifyReview.propTypes = {
  flow: PropTypes.string.isRequired
}

export default SellerNotifyReview
