import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { validURL } from '../../helpers'

const LiteHeader = (props) => {

  const {
    name,
    seller_type,
    summary,
    website,
    contact_email,
    contact_phone,
    contact_name
  } = props;

  return (
    <section className="row seller-profile__lite-header">
      <article className="col-xs-12 col-sm-6">
        <h1>{name}</h1>

        <div className="seller-profile__badges">
        {Object.keys(seller_type).map((type, i) => (
          <span key={i} className={classNames(
            'badge--default'
          )}>{type}</span>
        ))}
        </div>

        <div className="seller-profile-summary">
          <p>{summary}</p>
        </div>

        <p>
          {validURL(website) && <a href={website} target="_blank" rel="external noopener noreferrer">Visit seller's website</a>}
        </p>
      </article>
      <article className="col-xs-12 col-sm-5 col-sm-push-1">
        <p>
          <b>For opportunities contact</b><br/>
          <span>{contact_name}</span>
        </p>
        <p>
          <b>Phone</b><br/>
          <span>{contact_phone}</span>
        </p>
        <p>
          <b>Email</b><br/>
          <a href={`mailto:${contact_email}`}>{contact_email}</a>
        </p>
      </article>
    </section>
  )
}

LiteHeader.propTypes = {
  name: PropTypes.string.isRequired,
  seller_type: PropTypes.objectOf(PropTypes.bool),
  summary: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  contact_email: PropTypes.string.isRequired,
  contact_phone: PropTypes.string.isRequired,
  contact_name: PropTypes.string.isRequired,
}

export default LiteHeader;