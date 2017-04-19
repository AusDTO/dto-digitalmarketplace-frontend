import React from 'react';
import isEmpty from 'lodash/isEmpty';

import Badges from '../Badges';
//import Icon from '../Icon';

import './Card.css';

const Card = ({ title, link, badges = {}, description, products = {}, services = {}, supplier,pricing, case_study_service, view }) => {
    // calculate badges
    badges = Object.assign({}, {product: !isEmpty(products)}, badges);

    return (
      <section className="card" styleName="card">
        <article>
          <h3>
            <span>
              {view === "products" ?
                <a href={link} target="_blank" rel="external">{title}</a> :
                <a href={link} target="_blank">{title}</a> }
            </span>
          </h3>

          {view !== 'sellers' &&<div styleName="author">
            <a href={supplier.profile_url}>{supplier.name}</a>
          </div>}

            {!isEmpty(badges) && (
                <div styleName="badges">
                  <Badges badges={badges}/>
                </div>
            )}
          <p styleName="description">{description}</p>
            {/* TODO refactor when products exists
             <div className="products">
             <Icon value="product" size={18} /> <strong>Digital products:</strong> CMS
             </div>
             */}
          {view === "products" && <div styleName="product-links">
               <span>
                 <a href={pricing} target="_blank" rel="external" styleName="product-link-item">Product pricing</a>
               </span>
            <span>
                 <a href={supplier.support_url} target="_blank" rel="external" styleName="product-link-item">Product support</a>
               </span>
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
  title: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,

  badges: React.PropTypes.object,
  services: React.PropTypes.object,
  products: React.PropTypes.object
};

export default Card;