import React from 'react';
import Row from './Row';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';

const Body = (props) => {
  const {
    evaluated,
    provides,
    case_studies = {},
    contact_name,
    contact_phone,
    contact_email,
    representative,
    email,
    phone,
    website,
    linkedin,
    abn,
    address,
    interstate,
    documents,
    CaseStudyLink = () => null,
    documentsUrl
  } = props;

  const documentTitle = {
    financial: 'Financial Statement',
    liability: 'Public Liability Insurance',
    workers: 'Workers Compensation Insurance'
  };

  return (
    <article className="seller-profile">
      <Row title="Evaluated for" show={evaluated}>
        <div className="seller-profile__evaluated-badges">
        </div>
      </Row>

      <Row title="Provides" show={provides}>
        <div className="seller-profile__provides-badges">
          {provides && Object.keys(provides).map((service, i) => (
            <span key={i}>{service}</span>
          ))}
        </div>
      </Row>

      <Row title="Case studies" show={!isEmpty(case_studies)}>
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
      <Row title="For opportunities" show={contact_name || contact_phone || contact_email}>
        <h4>Contact</h4>
        <p>{contact_name}</p>
        
        <h4>Phone</h4>
        <p>{contact_phone}</p>
        
        <h4>Email</h4>
        <p><a href={`mailto:${contact_email}`}>{contact_email}</a></p>
      </Row>

      <Row title="Company Details" show={true}>
        <h4>Business Representative</h4>
        <p>
            <span>{representative}</span><br/>
            { email && <span><a href={`mailto:${email}`}>{email}</a><br/></span>}
            { phone && <span>{phone}<br/></span>}
        </p>

        <p>
          <a href={website} rel="external" target="_blank">Website</a>
        </p>

        {linkedin && (
          <p>
            <a href={linkedin} rel="external">Linkedin Profile</a>
          </p>
        )}

        {!isEmpty(address) && (
          <div>
            <h4>Main Address</h4>
            <p>
              <span>{address.address_line}</span><br/>
              <span>{address.suburb}</span><br/>
              <span>{address.state} {address.postal_code}</span>
            </p>
          </div>
        )}

        {interstate && (
          <p>
            <b>This seller is able work interstate</b>
          </p>
        )}

        <h4>ABN</h4>
        <p>
          <a href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${abn}`} rel="external" target="_blank">{abn}</a>
        </p>
      </Row>

      <Row title="Documents" show={!isEmpty(documents)}>
          {!isEmpty(documents) && Object.keys(documents).map((key, val) => {
            const { filename, expiry } = documents[key];
            return (
              <div key={val}>
                <a href={`${documentsUrl}${filename}`}>
                  {documentTitle[key]}
                </a>
                <p>
                  {expiry && (<small>Expires {format(new Date(expiry), 'Mo MMM YYYY')}</small>)}
                </p>
              </div>
            )
          })}
      </Row>
    </article>
  )
};

Body.propTypes = {
  evaluated: React.PropTypes.object,
  provides: React.PropTypes.object,
  documents: React.PropTypes.object,
  case_studies: React.PropTypes.object,
  representative: React.PropTypes.string,
  email: React.PropTypes.string,
  phone: React.PropTypes.string,
  website: React.PropTypes.string,
  linkedin: React.PropTypes.string,
  abn: React.PropTypes.string,
  interstate: React.PropTypes.bool,
  address: React.PropTypes.shape({
    address_line: React.PropTypes.string,
    suburb: React.PropTypes.string,
    state: React.PropTypes.string,
    postalCode: React.PropTypes.string
  }),
  CaseStudyLink: React.PropTypes.func,
  documentsUrl: React.PropTypes.string,
  contact_email: React.PropTypes.string,
  contact_phone: React.PropTypes.string,
  contact_name: React.PropTypes.string,
};

export default Body;