import React from 'react';
import isEmpty from 'lodash/isEmpty';

import Badges from '../Badges';
//import Icon from '../Icon';

import './Card.css';

const Card = ({ title, link, badges = {}, description, products = {}, services = {} }) => {
    // calculate badges
    badges = Object.assign({}, {product: !isEmpty(products)}, badges);

    return (
        <a href={link}>
          <section className="card" styleName="card">
            <article>
              <h3>
                <span>{title}</span>
              </h3>
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
            </article>

              {!isEmpty(services) && (
                  <div styleName="services">
                      {Object.keys(services).map((service, i) => (
                          <span key={i}>{service}</span>
                      ))}
                  </div>
              )}
          </section>
        </a>
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