import React from 'react';
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty';
import { replaceMarkup, validURL } from '../../helpers'

import Badges from '../Badges';

import './Card.css';

const Card = ({title, link, badges = {}, description, products = {}, services = {}, supplier, pricing, case_study_service, view}) => {
  // calculate badges
  badges = Object.assign({}, {product: !isEmpty(products)}, badges);

  return (
      <section className="card" styleName="card">
        <article>
          <h2 className="display-4">
            <span>
              {view === "products" ?
                validURL(link) && <a href={link} target="_blank" rel="external">{title}</a> :
                validURL(link) && <a href={link}>{title}</a> }
            </span>
          </h2>

          {view !== 'sellers' && <div styleName="author">
            by {validURL(supplier.profile_url) && <a href={supplier.profile_url}>{supplier.name}</a>}
          </div>}
          {!isEmpty(badges) && (
            <div styleName="badges">
              <Badges badges={badges}/>
            </div>
          )}
          <p styleName="description">{replaceMarkup(description, '<b>', '<mark>')}</p>
          {view === "products" &&
          <div styleName="product-links">
            <div className="row">
               <span className="col-xs-6 col-sm-6">
                 {validURL(pricing) && <a href={pricing} target="_blank" rel="external" styleName="product-link-item">Product pricing</a>}
               </span>
              <span className="col-xs-6 col-sm-6">
                 {validURL(supplier.support_url) && <a href={supplier.support_url} target="_blank" rel="external" styleName="product-link-item">Product support</a>}
               </span>
            </div>
          </div>
          }
        </article>

        {!isEmpty(services) && view === 'sellers' && (
          <div styleName="services">
            {Object.keys(services).map((service, i) => (
              <span key={i}>{service}</span>
            ))}
          </div>
        )}
        {!isEmpty(services) && view === 'casestudies' && (
          <div styleName="services">
            <span>{case_study_service}</span>
          </div>
        )}
      </section>
  );
};


Card.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  badges: PropTypes.object,
  services: PropTypes.object,
  products: PropTypes.object
};

export default Card;