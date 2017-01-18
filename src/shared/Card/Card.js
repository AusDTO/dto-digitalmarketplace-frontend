import React from 'react';
import isEmpty from 'lodash/isEmpty';

import Badges from '../Badges';
import Icon from '../Icon';

import './Card.css';

const Card = ({ title, link, badges = {}, description, products = {}, services = {} }) => (
  <section styleName="card">
    <article>
      <h3>
        <a href={link}>{title}</a>
      </h3>
      {!isEmpty(badges) && (
        <div styleName="badges">
          <Badges badges={badges} />
        </div>
      )}
      <p>{description}</p>
      <div className="products">
        <Icon value="info" size={18} /> <strong>Digital products:</strong> CMS
      </div>
    </article>

    {!isEmpty(services) && (
      <div styleName="services">
        {Object.keys(services).map((service, i) => (
          <span key={i}>{service}</span>
        ))}
      </div>
    )}
  </section>
);

Card.propTypes = {
  title: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,

  badges: React.PropTypes.object,
  services: React.PropTypes.object,
  products: React.PropTypes.object
};

export default Card;