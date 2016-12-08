import React from 'react';
import classNames from 'classnames';

const ReviewHeader = (props) => {

  const {
    name,
    seller_type,
    summary,
    website,
    contact_email,
    contact_phone,
    contact_name,
    continueLink
  } = props;

  return (
    <section className="seller-profile seller-profile__review-header">
      <div className="row ">
        <div className="col-sm-8">
          <h1>{name}</h1>
        </div>
        <div className="col-sm-3 col-sm-push-1 seller-profile__continue-link">
          {continueLink}
        </div>
      </div>
      <div className="row">
        <div className="seller-profile__badges">
        {Object.keys(seller_type).map((type, i) => (
          <span key={i} className={classNames(
            'badge--default'
          )}>{type}</span>
        ))}
        </div>
      </div>
      <div className="row">
        <article className="col-xs-12 col-sm-8">
          <div className="seller-profile__summary">
            <p>{summary}</p>
          </div>

          <p>
            <a href={website} rel="external">Visit seller's website</a>
          </p>
        </article>
        <article className="col-xs-12 col-sm-3 col-sm-push-1">
          <p>
            <b>Opportunities contact</b><br/>
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
      </div>
    </section>
  )
}

ReviewHeader.defaultProps = {
  seller_type: {}
}

ReviewHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  seller_type: React.PropTypes.objectOf(React.PropTypes.bool),
  summary: React.PropTypes.string.isRequired,
  website: React.PropTypes.string.isRequired,
  contact_email: React.PropTypes.string.isRequired,
  contact_phone: React.PropTypes.string.isRequired,
  contact_name: React.PropTypes.string.isRequired,
  continueLink: React.PropTypes.element
}

export default ReviewHeader;