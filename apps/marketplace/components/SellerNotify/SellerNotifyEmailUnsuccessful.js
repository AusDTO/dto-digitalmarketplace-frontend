import React from 'react'
import PropTypes from 'prop-types'

const SellerNotifyEmailUnsuccessful = props =>
  <div>
    <p>
      Unfortunately your application for{' '}
      <a href={`/digital-marketplace-opportunities/${props.brief.id}`}>{props.brief.title}</a> was not successful.
      However please keep in mind this may change and {props.brief.organisation} may contact you at a later date for an
      interview.
    </p>
    <p>
      The {props.brief.organisation} has forwarded us some feedback which we thought you would find helpful:
    </p>
    <ul>
      <li>
        <em>
          We suggest you write some points about the successful candidates&#x27; responses / attributes. For example:
        </em>
      </li>
      <li>
        <em>
          {props.brief.organisation} found answers more convincing when they were backed up with examples of recent
          real-life scenarios.
        </em>
      </li>
    </ul>
    <p>To assist you with your future applications, the Marketplace team have put together a debrief for you.</p>
  </div>

SellerNotifyEmailUnsuccessful.propTypes = {
  brief: PropTypes.object.isRequired
}

export default SellerNotifyEmailUnsuccessful
