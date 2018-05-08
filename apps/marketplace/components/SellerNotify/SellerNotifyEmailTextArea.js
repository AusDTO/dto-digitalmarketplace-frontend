import React from 'react'
import PropTypes from 'prop-types'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'
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

const SellerNotifyEmailTextArea = props =>
  <span>
    <label htmlFor="input_email_content">Email</label>
    <AUtextInput
      as="textarea"
      id="input_email_content"
      name="email_content"
      defaultValue={emailContent(props.brief, props.flow)}
      className={styles.emailContent}
      block
      required
    />
  </span>

SellerNotifyEmailTextArea.propTypes = {
  brief: PropTypes.object.isRequired,
  flow: PropTypes.string.isRequired
}

export default SellerNotifyEmailTextArea
