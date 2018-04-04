import React, { Component } from 'react'
import Button from '@gov.au/buttons/lib/js/react.js'
import styles from './SellerUnsuccessful.scss'

export class SellerUnsuccessfulReview extends Component {
  constructor(props) {
    super(props)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  componentDidMount() {
    this.props.setStageStatus('review', 'doing')
  }

  handleContinueClick(e) {
    e.preventDefault()
    this.props.setStageStatus('review', 'done')
    this.props.moveToNextStage('review')
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
          <ul>
            {this.props.selectedSellers.map(seller =>
              <li key={seller.id}>
                {seller.name}
              </li>
            )}
          </ul>
          <form className={styles.reviewForm}>
            <label htmlFor="input_subject_line">Subject line</label>
            <input
              type="text"
              id="input_subject_line"
              name="subject_line"
              defaultValue="You have successful made it through to the next round!"
            />
            <label htmlFor="email_body">Email</label>
            <div contentEditable="true" suppressContentEditableWarning>
              <p>Thank you for your application for &lt;brief&gt;.</p>
              <p>
                <strong>The buyer has requested you supply:</strong>
              </p>
            </div>
            <Button onClick={this.handleContinueClick} text="Send email" />
          </form>
        </div>
      </div>
    )
  }
}

export default SellerUnsuccessfulReview
