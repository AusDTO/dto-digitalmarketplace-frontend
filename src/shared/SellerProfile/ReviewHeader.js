import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

const ReviewHeader = (props) => {

  const {
    name,
    seller_type,
    summary,
    website,
    contact_name,
    contact_phone,
    contact_email,
  } = props;

  const badgeTitle = {
    indigenous: 'Indigenous',
    nfp_social_enterprise: 'Not-for-profit / social enterprise',
    product: 'Product based business',
    recruitment: 'Recruiter',
    sme: 'SME',
    start_up: 'Start up',
    regional: 'Regional or non-metro based business'
  };

  return (
    <section className="seller-profile seller-profile__review-header">
      <div className="row ">
        <div className="col-sm-8">
          <h1>{name}</h1>
        </div>
      </div>
      <div className="row">
        <div className="seller-profile__badges">
        {Object.keys(seller_type)
          // If type is not in our list or falsy, dont render an empty span.
          .filter(type => get(seller_type, type) && `${type}` in badgeTitle)
          .map((type, i) => (
          <span key={i} className={classNames(
            'badge--default',
            `badge__${type}`
          )}> {badgeTitle[type]}</span>
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
          {contact_name && (
            <p>
              <b>For opportunities contact</b><br/>
              <span>{contact_name}</span>
            </p>
          )}

          {contact_phone && (
            <p>
              <b>Phone</b><br/>
              <span>{contact_phone}</span>
            </p>
          )}

          {contact_email && (
            <p>
              <b>Email</b><br/>
              <a href={`mailto:${contact_email}`}>{contact_email}</a>
            </p>
          )}
        </article>
      </div>
    </section>
  )
}

ReviewHeader.defaultProps = {
  seller_type: {}
}

ReviewHeader.propTypes = {
  name: React.PropTypes.string,
  seller_type: React.PropTypes.objectOf(React.PropTypes.bool),
  summary: React.PropTypes.string,
  website: React.PropTypes.string,
  contact_email: React.PropTypes.string,
  contact_phone: React.PropTypes.string,
  contact_name: React.PropTypes.string,
}

export default ReviewHeader;