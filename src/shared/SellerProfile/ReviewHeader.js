import React from 'react';

import Badges from '../Badges';

import styles from './SellerProfile.css'; // eslint-disable-line no-unused-vars

const ReviewHeader = (props) => {

  const {
    name,
    seller_type,
    summary,
    website,
    twitter,
    contact_name,
    contact_phone,
    contact_email,
    number_of_employees,
    public_profile
  } = props;

  return (
    <section styleName={public_profile ? 'styles.full-header' : 'styles.review-header'}>
      <div className="row ">
        <div className="col-sm-8">
          <h1 tabIndex="-1" styleName="styles.heading">{name}</h1>
        </div>
      </div>

      <div className="row">
        <article className="col-xs-12 col-md-8 col-sm-7">
          <div className="row">
            <Badges badges={seller_type} />
          </div>

          <div className="seller-profile__summary">
            <p>{summary}</p>
          </div>

          <div className="row" styleName="styles.meta-row">
            <div className="col-xs-12 col-sm-3">
              <h4>Company Size</h4>
            </div>
            <div className="col-xs-12 col-sm-8 col-sm-push-1">
              <p>{number_of_employees}</p>
            </div>
          </div>

          <div className="row" styleName="styles.meta-row">
            <div className="col-xs-12 col-sm-3">
              <h4>Website</h4>
            </div>
            <div className="col-xs-12 col-sm-8 col-sm-push-1">
              <p><a href={website} rel="external">{website}</a></p>
            </div>
          </div>

          {twitter && (
            <div className="row" styleName="styles.meta-row">
              <div className="col-xs-12 col-sm-3">
                <h4>Twitter</h4>
              </div>
              <div className="col-xs-12 col-sm-8 col-sm-push-1">
                <p><a href={twitter} rel="external">{twitter}</a></p>
              </div>
            </div>
          )}

          {/* 
            public_profile has three possible values
            1. Seller previewing/reviewing their profile in signup phase (public_profile=undefined)
            2. Buyer viewing seller profile (public_profile=true)
            3. Seller viewing their own profile (public_profile=false)
          */}

          {typeof public_profile === 'undefined' && (
            <div className="row" styleName="styles.meta-row">
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
          )}
        </article>

        {public_profile && (
          <article className="col-xs-12 col-sm-4 col-sm-push-1 col-md-3 col-md-push-1">
            <div className="seller-profile__tile" styleName="tile">
              <span className="seller-profile__tile-title" styleName="tile-title">Business contact</span>
              <b>{contact_name}</b>
              <p>{contact_phone}</p>
              <a href={`mailto:${contact_email}`} role="button">Email seller</a>
            </div>
          </article>
        )}

        {public_profile === false && (
          <article className="col-xs-12 col-sm-3 col-sm-push-1">
            {/* Hardcoded URL as buyer has no way to generate seller URLs */}
            <a href="/sellers/edit/business-details" role="button">Update profile</a>
          </article>
        )}

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