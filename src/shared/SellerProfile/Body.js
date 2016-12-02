import React from 'react';

const Row = ({ title, children, show }) => {
  let test = show;
  if (typeof show === 'function') {
    test = show();
  }

  if (!test) {
    return null;
  }

  return (
    <div className="row seller-profile__row">
      <div className="col-sm-3"><b>{title}</b></div>
      <div className="col-sm-8 col-sm-1-push">{children}</div>
    </div>
  )
}

const Body = (props) => {
  const {
    evaluated,
    provides,
    casestudies = {},
    representative,
    website,
    linkedin,
    abn,
    address
  } = props;

  return (
    <article>
      <Row title="Evaluted for" show={evaluated}>

      </Row>

      <Row title="Provides" show={provides}>
        <div>
          {Object.keys(provides).map((service, i) => (
            <span className="badge--default" key={i}>{service}</span>
          ))}
        </div>
      </Row>

      <Row title="Case studies" show={Object.keys(casestudies).length}>
        <ul className="list-vertical">
        {Object.keys(casestudies).map((study, i) => {
          const { title, service, client } = casestudies[study];
          return (
            <li key={i}>
              <article>
                <h3><a href="#href">{title}</a></h3>
                <div className="meta">
                  <span>{service}</span>
                </div>
                <p>{client}</p>
              </article>
            </li>
          )
        })}
        </ul>
      </Row>

      <Row title="Company Details" show={true}>
        <b>Business Representative</b><br/>
        <p>{representative}</p>

        <b>Website</b><br/>
        <p><a href={website} rel="external">{website}</a></p>

        <b>Linkedin Profile</b><br/>
        <p><a href={linkedin} rel="external">{linkedin}</a></p>

        <b>Main Address</b><br/>
        <p>
          <span>{address.address_line}</span><br/>
          <span>{address.suburb}</span><br/>
          <span>{address.state} {address.postal_code}</span>
        </p>

        <b>ABN</b><br/>
        <p>{abn}</p>
      </Row>
    </article>
  )
};

Body.propTypes = {
  evaluated: React.PropTypes.object,
  provides: React.PropTypes.object,
  casestudies: React.PropTypes.object,
  representative: React.PropTypes.string,
  website: React.PropTypes.string,
  linkedin: React.PropTypes.string,
  abn: React.PropTypes.string,
  address: React.PropTypes.shape({
    address_line: React.PropTypes.string,
    suburb: React.PropTypes.string,
    state: React.PropTypes.string,
    postalCode: React.PropTypes.string
  })
};

export default Body;