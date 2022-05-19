import React from 'react';
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty';

import Badges from '../Badges';

import styles from './SellerProfile.css'; // eslint-disable-line no-unused-vars

const ReviewHeader = (props) => {

  const {
    abn,
    name,
    seller_type,
    summary,
    website,
    twitter,
    contact_name,
    contact_phone,
    contact_email,
    linkedin,
    public_profile
  } = props;

  const hasContactDetails = ![contact_email, contact_name, contact_phone].filter(isEmpty).length;

  return (
    <section styleName={public_profile ? 'styles.full-header' : 'styles.review-header'}>
      <div>
        <div className="row ">
          <div className="col-sm-8">
            <h1 className="au-display-xl" tabIndex="-1" styleName="styles.heading">{name}</h1>
          </div>
        </div>

        <div className="row">
          <article className="col-xs-12 col-md-8 col-sm-7">
            <div className="row" styleName="styles.badges-row">
              <Badges badges={seller_type} />
            </div>

            <div styleName="styles.seller-profile-summary">
              <p>{summary}</p>
            </div>

            {abn && (
            <div className="row" styleName="styles.meta-row">
              <div className="col-xs-12 col-sm-3">
                <h2 className="au-display-lg">ABN</h2>
              </div>
              <div className="col-xs-12 col-sm-8 col-sm-push-1">
                <p><a href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${abn}`} target="_blank" rel="external noopener noreferrer" styleName="external-link">{abn}</a></p>
              </div>
            </div>
            )}

            <div className="row" styleName="styles.meta-row">
              <div className="col-xs-12 col-sm-3">
                <h2 className="au-display-lg">Website</h2>
              </div>
              <div className="col-xs-12 col-sm-8 col-sm-push-1">
                <p><a href={website} target="_blank" rel="external noopener noreferrer" styleName="external-link">{website}</a></p>
              </div>
            </div>

            {twitter && (
              <div className="row" styleName="styles.meta-row">
                <div className="col-xs-12 col-sm-3">
                  <h2 className="au-display-lg">Twitter</h2>
                </div>
                <div className="col-xs-12 col-sm-8 col-sm-push-1">
                  <p><a href={twitter} target="_blank" rel="external noopener noreferrer" styleName="external-link">{twitter}</a></p>
                </div>
              </div>
            )}

            {linkedin && (
              <div className="row" styleName="styles.meta-row">
                <div className="col-xs-12 col-sm-3">
                  <h2 className="au-display-lg">LinkedIn</h2>
                </div>
                <div className="col-xs-12 col-sm-8 col-sm-push-1">
                  <p><a href={linkedin} target="_blank" rel="external noopener noreferrer" styleName="external-link">{linkedin}</a></p>
                </div>
              </div>
            )}

            {/*
              public_profile has three possible values
              1. Seller previewing/reviewing their profile in signup phase (public_profile=undefined)
              2. Buyer/Seller viewing seller profile (public_profile=true)
              3. Admin viewing the own profile (public_profile=false)
            */}

            {typeof public_profile === 'undefined' && hasContactDetails && (
              <div className="row" styleName="styles.meta-row">
                <div className="col-xs-12 col-sm-3">
                  <h2 className="au-display-lg">Business contact</h2>
                </div>
                <div className="col-xs-12 col-sm-8 col-sm-push-1">
                  <p>
                    {contact_name}<br/>
                    {contact_phone}<br/>
                    <a href={`mailto:${contact_email}`} styleName="external-link">{contact_email}</a>
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
                <a href={`mailto:${contact_email}`} className="button" styleName="external-link white external-link-hover">Email seller</a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

ReviewHeader.defaultProps = {
  seller_type: {}
}

ReviewHeader.propTypes = {
  abn: PropTypes.string,
  name: PropTypes.string,
  seller_type: PropTypes.objectOf(PropTypes.bool),
  summary: PropTypes.string,
  website: PropTypes.string,
  twitter: PropTypes.string,
  linkedin: PropTypes.string,
  contact_email: PropTypes.string,
  contact_phone: PropTypes.string,
  contact_name: PropTypes.string,
}

export default ReviewHeader;
