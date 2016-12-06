import React from 'react';

const Row = ({ title, children, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="row seller-profile__row">
      <div className="col-sm-3"><b>{title}</b></div>
      <div className="col-sm-8 col-sm-push-1">{children}</div>
    </div>
  )
}

const Body = (props) => {
  const {
    evaluated,
    provides,
    case_studies = {},
    representative,
    website,
    linkedin,
    abn,
    address,
    CaseStudyLink
  } = props;

  return (
    <article className="seller-profile">
      <Row title="Evaluted for" show={evaluated}>
        <div className="seller-profile__evaluated-badges">
          {/*Object.keys(evaluated).map((service, i) => (
            <span key={i}>{service}</span>
          ))*/}
        </div>
      </Row>

      <Row title="Provides" show={provides}>
        <div className="seller-profile__provides-badges">
          {Object.keys(provides).map((service, i) => (
            <span key={i}>{service}</span>
          ))}
        </div>
      </Row>

      <Row title="Case studies" show={Object.keys(case_studies).length}>
        <ul className="list-vertical">
        {Object.keys(case_studies).map((study, i) => {
          const { title, service, client } = case_studies[study];
          return (
            <li key={i}>
              <article>
                {/*
                  CaseStudyLink is a configurable prop.
                  Since it will point to different areas in different flows. 
                */}
                <h3><CaseStudyLink id={study}>{title}</CaseStudyLink></h3>
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
  case_studies: React.PropTypes.object,
  representative: React.PropTypes.string,
  website: React.PropTypes.string,
  linkedin: React.PropTypes.string,
  abn: React.PropTypes.string,
  address: React.PropTypes.shape({
    address_line: React.PropTypes.string,
    suburb: React.PropTypes.string,
    state: React.PropTypes.string,
    postalCode: React.PropTypes.string
  }),
  CaseStudyLink: React.PropTypes.func.isRequired
};

export default Body;