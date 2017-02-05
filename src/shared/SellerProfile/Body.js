import React from 'react';
import Row from './Row';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import SimpleAccordion  from '../SimpleAccordion';
import Alert            from '../Alert';
import Icon             from '../Icon';

import './SellerProfile.css';

const Body = (props) => {
  const {
    assessed = [],
    unassessed = [],
    case_studies = {},
    representative,
    email,
    phone,
    number_of_employees,
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
    prices = [],
    products = {},
    CaseStudyLink = () => null,
  } = props;

  const documentTitle = {
    financial: 'Financial Statement',
    liability: 'Public Liability Insurance',
    workers: 'Workers Compensation Insurance'
  };

  return (
    <article className="seller-profile" styleName={public_profile ? 'full-profile' : ''}>

      <Row title="Services" show={!isEmpty(assessed) || !isEmpty(unassessed)}>

        {!isEmpty(assessed) && (
          <div className="seller-profile__evaluated-badges" styleName="badges evaluated-badges">
            <h4>Approved</h4>
            {assessed.map((service, i) => (
              <span key={i}>{service} <Icon value="completed" size={14} /></span>
            ))}
          </div>
        )}

        {!isEmpty(unassessed) && (
          <div className="seller-profile__provides-badges" styleName="badges provides-badges">
            <h4>To be assessed</h4>
            {unassessed.map((service, i) => (
              <span key={i}>{service}</span>
            ))}
          </div>
        )}

        <p>
          <a href="">Learn about assessments</a>
        </p>
        
      </Row>

      <Row title="Case studies" show={!isEmpty(case_studies)}>
        <ul className="list-vertical" styleName="case-study-list">
        {Object.keys(case_studies).map((study, i) => {
          const { title, service, client } = case_studies[study];
          const isEvaluted = get(assessed, service); 
          const badgeStyleName = isEvaluted ? 'evaluated-badges' : 'provides-badges';
          return (
            <li key={i}>
              <article>
                {/*
                  CaseStudyLink is a configurable prop.
                  Since it will point to different areas in different flows. 
                */}
                <h3><CaseStudyLink id={study}>{title}</CaseStudyLink></h3>
                <p>{client}</p>
                <div styleName={`badges ${badgeStyleName}`}>
                  {isEvaluted ? (
                    <span>{service} <Icon value="completed" size={14} /></span>
                  ) : (
                    <span>{service}</span>
                  )}
                </div>
              </article>
            </li>
          )
        })}
        </ul>
      </Row>

      <Row title="Digital products" show={!isEmpty(products)}>
        <Alert type="info">
          The products below are not assessed or endorsed by the Digital Marketplace. 
        </Alert>

        {Object.keys(products).map((key, i) => {
          const product = products[key];
          return (
            <div key={`product.${i}`}>
              <div className="col-xs-12">
                <h3 styleName="product-heading">
                  <a style={{ display: 'inline' }} href={product.website} rel="external">{product.name}</a>
                </h3>
              </div>
              <div className="col-xs-12 col-sm-7">
                <p className="freetext">
                  {product.summary}
                </p>
              </div>
              <div className="col-xs-12 col-sm-5">
                <p>
                  <a style={{ display: 'inline' }} href={product.pricing} rel="external">Product pricing</a>
                </p>
                <p>
                  <a style={{ display: 'inline' }} href={product.support} rel="external">Product support</a>
                </p>
              </div>
            </div>
          )
        })}
      </Row>

      <Row title="Pricing" show={!isEmpty(prices)}>
        <SimpleAccordion title="Reveal rate card for services">
          <table className="content-table" styleName="content-table">
            <thead>
              <tr>
                <th>Roles</th>
                <th>Day rates</th>
              </tr>
            </thead>
            <tbody>
              {prices.map(({ service_role = {}, hourly_rate }, i) => (
                <tr key={i}>
                  <td>{service_role.name}</td>
                  <td>${hourly_rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleAccordion>
      </Row>

      <Row title="How we work" show={tools || methodologies || technologies}>
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

        {number_of_employees && (
          <div>
            <h4>Company size</h4>
            <p>{number_of_employees}</p>
          </div>
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

        {abn && (
          <div>
            <h4>ABN</h4>
            <p>
              <a href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${abn}`} rel="external" target="_blank">{abn}</a>
            </p>
          </div>
        )}

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

      <Row title="Awards" show={!isEmpty(awards)}>
        {awards.map((award, i) => (
          <p key={i}>{award}</p>
        ))}
      </Row>

      <Row title="Documents" show={!isEmpty(documents)}>
        <table className="content-table" styleName="content-table">
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
                    {expiry && format(new Date(expiry), 'DD/MM/YYYY')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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