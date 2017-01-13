import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import profile from './profile.css'; // eslint-disable-line no-unused-vars

const ReviewHeader = (props) => {

  const {
    name,
    seller_type,
    summary,
    website,
    contact_name,
    contact_phone,
    contact_email,
    number_of_employees,
    public_profile
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
    <section styleName={public_profile ? 'profile.full-header' : 'profile.review-header'}>
      <div className="row ">
        <div className="col-sm-8">
          <h1 tabIndex="-1" styleName="profile.heading">{name}</h1>
        </div>
      </div>
      <div className="row">
        <div styleName="profile.badges">
        {Object.keys(seller_type)
          // If type is not in our list or falsy, dont render an empty span.
          .filter(type => get(seller_type, type) && `${type}` in badgeTitle)
          .map((type, i) => (
          <span key={i} className={classNames(
            'badge--default',
            `badge__${type}`
          )} styleName={`profile.badge__${type}`}> {badgeTitle[type]}</span>
        ))}
        </div>
      </div>
      <div className="row">
        <article className="col-xs-12 col-sm-8">
          <div className="seller-profile__summary">
            <p>{summary}</p>
          </div>

          <div className="row" styleName="profile.meta-row">
            <div className="col-xs-12 col-sm-3">
              <h4>Website</h4>
            </div>
            <div className="col-xs-12 col-sm-8 col-sm-push-1">
              <p><a href={website} rel="external">{website}</a></p>
            </div>
          </div>

          <div className="row" styleName="profile.meta-row">
            <div className="col-xs-12 col-sm-3">
              <h4>Company Size</h4>
            </div>
            <div className="col-xs-12 col-sm-8 col-sm-push-1">
              <p>{number_of_employees}</p>
            </div>
          </div>

          <div className="row" styleName="profile.meta-row">
            <div className="col-xs-12 col-sm-3">
              <h4>Business Contact</h4>
            </div>
            <div className="col-xs-12 col-sm-8 col-sm-push-1">
              <p>
                {contact_name}<br/>
                {contact_phone}<br/>
                <a href={`mailto:${contact_email}`}>{contact_email}</a>
              </p>
            </div>
          </div>
          
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