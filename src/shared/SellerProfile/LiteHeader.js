import React from 'react';
import classNames from 'classnames';

const LiteHeader = (props) => {

  const {
    name,
    sellerType,
    summary,
    website,
    email,
    phone,
    representative
  } = props;

  return (
    <section className="row seller-profile__lite-header">
      <article className="col-xs-12 col-sm-6">
        <h1>{name}</h1>

        <div className="seller-profile__badges">
        {Object.keys(sellerType).map((type, i) => (
          <span key={i} className={classNames(
            'badge--default'
          )}>{type}</span>
        ))}
        </div>

        <div className="seller-profile__summary">
          <p>{summary}</p>
        </div>

        <p>
          <a href={website} rel="external">Visit seller's website</a>
        </p>
      </article>
      <article className="col-xs-12 col-sm-5 col-sm-push-1">
        <div className="seller-profile__tile">
          <span className="seller-profile__tile-title">Opportunities contact</span>
          <b>{representative}</b>
          <p>{phone}</p>
          <a href={`mailto:${email}`} role="button">Email seller</a>
        </div>
      </article>
    </section>
  )
}

LiteHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  sellerType: React.PropTypes.objectOf(React.PropTypes.bool),
  summary: React.PropTypes.string.isRequired,
  website: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  phone: React.PropTypes.string.isRequired,
  representative: React.PropTypes.string.isRequired
}

export default LiteHeader;