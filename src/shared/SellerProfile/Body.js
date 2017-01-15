import React from 'react';
import Row from './Row';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';

import profile from './profile.css'; // eslint-disable-line no-unused-vars

const Body = (props) => {
  const {
    evaluated,
    provides,
    case_studies = {},
    representative,
    email,
    phone,
    linkedin,
    abn,
    address,
    documents = {},
    documentsUrl,
    tools,
    methodologies,
    technologies,
    awards = [],
    certifications = [],
    boards = [],
    public_profile,
    CaseStudyLink = () => null,
  } = props;

  const documentTitle = {
    financial: 'Financial Statement',
    liability: 'Public Liability Insurance',
    workers: 'Workers Compensation Insurance'
  };

  return (
    <article className="seller-profile" styleName={public_profile ? 'profile.full-profile' : 'profile.full-profile'}>
      <Row title="Approved services" show={evaluated}>
        <div className="seller-profile__evaluated-badges">
        </div>
      </Row>

      <Row title="To be assessed" show={provides}>
        <div className="seller-profile__provides-badges" styleName="provides-badges">
          {provides && Object.keys(provides).map((service, i) => (
            <span key={i}>{service}</span>
          ))}
        </div>
      </Row>

      <Row title="Case studies" show={!isEmpty(case_studies)}>
        <ul className="list-vertical" styleName="profile.case-study-list">
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
                <p>{client}</p>
                <p>{service}</p>
              </article>
            </li>
          )
        })}
        </ul>
      </Row>

      <Row title="Approach" show={tools || methodologies || technologies}>
        {methodologies && (
          <div>
            <h4>Methodology</h4>
            <p className="freetext">{methodologies}</p>
          </div>
        )}
        
        {tools && (
          <div>
            <h4>Tools</h4>
            <p className="freetext">{tools}</p>
          </div>
        )}
        
        {technologies && (
          <div>
            <h4>Programming Lanuages</h4>
            <p className="freetext">{technologies}</p>
          </div>
        )}
      </Row>

      <Row title="Company Details" show={true}>
        <h4>Authorised representative</h4>
        <p>
            <span>{representative}</span><br/>
            { email && <span><a href={`mailto:${email}`}>{email}</a><br/></span>}
            { phone && <span>{phone}<br/></span>}
        </p>

        {linkedin && (
          <p>
            <a href={linkedin} rel="external">View Linkedin Profile</a>
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

        <h4>ABN</h4>
        <p>
          <a href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${abn}`} rel="external" target="_blank">{abn}</a>
        </p>

        {!isEmpty(certifications) && (
          <div>
            <h4>Certifications</h4>
            {certifications.map((certification, i) => (
              <p key={i}>{certification}</p>
            ))}
          </div>
        )}

        {!isEmpty(boards) && (
          <div>
            <h4>Boards and commitees</h4>
            {boards.map((board, i) => (
              <p key={i}>{board}</p>
            ))}
          </div>
        )}
      </Row>

      <Row title="Documents" show={!isEmpty(documents)}>
        <table className="content-table" styleName="profile.document-table">
          <thead>
            <tr>
              <th>Document type</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(documents).map((key, val) => {
              const { filename, expiry } = documents[key];
              return (
                <tr key={val}>
                  <td>
                    {public_profile ? 
                      documentTitle[key] 
                    : (
                      <a href={`${documentsUrl}${filename}`}>
                      {documentTitle[key]}
                      </a>
                    )}
                  </td>
                  <td>
                    {expiry && format(new Date(expiry), 'MM/DD/YYYY')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Row>

      <Row title="Awards" show={!isEmpty(awards)}>
        {awards.map((award, i) => (
          <h4 key={i}>{award}</h4>
        ))}
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