import React from 'react';
import PropTypes from 'prop-types'
import Row from './Row';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';
import { mapAustraliaState, newline, validURL } from '../../helpers';

import SimpleAccordion  from '../SimpleAccordion';
import Icon             from '../Icon';

import './SellerProfile.css';

const Body = (props) => {
  const {
    assessed = [],
    case_studies = {},
    representative,
    email,
    phone,
    number_of_employees,
    abn,
    addresses,
    documents = {},
    labourHire = {},
    tools,
    methodologies,
    technologies,
    awards = [],
    certifications = [],
    boards = [],
    public_profile,
    products = {},
    digital_marketplace_panel,
    dsp_panel,
    recruiter,
    signed_agreements,
    CaseStudyLink = () => null,
  } = props;


  const documentTitle = {
    financial: 'Financial Statement',
    indemnity: 'Professional Indemnity Insurance',
    liability: 'Public Liability Insurance',
    workers: 'Workers Compensation Insurance'
  };

  return (
    <article className="seller-profile" styleName={public_profile ? 'full-profile' : ''}>
      <div styleName="seller-profile-content">
        <Row title="Categories" show>
          {recruiter === 'yes' && (
            <p styleName="nocategories">
              This seller can only respond to ICT Labour Hire opportunities.
            </p>
          )}

          {recruiter === 'both' && isEmpty(assessed) && (
            <React.Fragment>
              <p styleName="nocategories">
                This seller has not yet been approved in any Professional Services and Consulting categories.
              </p>
              <p styleName="nocategories">
                This seller can respond to ICT Labour Hire opportunities.
              </p>
            </React.Fragment>
          )}

          {recruiter === 'no' && isEmpty(assessed) && (
            <p styleName="nocategories">
              This seller has not yet been approved in any Professional Services and Consulting categories.
            </p>
          )}

          {(recruiter === 'both' || recruiter === 'no') && !isEmpty(assessed) && (
            <span><div className="seller-profile__evaluated-badges" styleName="badges evaluated-badges">
              {assessed.map((service, i) => (
                <span key={i}>{service}</span>
              ))}

                      </div>
                          <p>
                              <b>Transacts on</b><br/>
                            {digital_marketplace_panel &&
                            <span><a
                              href="https://www.tenders.gov.au/?event=public.son.view&SONUUID=4E10C3C3-99F9-34E1-61CDE299C229AAEF"
                              rel="external noopener noreferrer" target="_blank">SON3413842 Digital Marketplace Panel</a><br/></span>
                            }

                            {dsp_panel && <a
                              href="https://www.tenders.gov.au/?event=public.son.view&SONUUID=ACD40659-0FEB-07D3-291A8F6C6FAB4184"
                              rel="external noopener noreferrer" target="_blank">SON3364729 Digital Services Professionals</a>}
                          </p>

                      </span>

          )}

          {recruiter === 'both' && !isEmpty(assessed) && (
            <p styleName="nocategories">
              This seller can respond to ICT Labour Hire opportunities.
            </p>
          )}

        </Row>

        <Row title="Case studies" marginBot="true" show={!isEmpty(case_studies)}>
          <div styleName="visibility-message">
            <Icon value="notvisible" size={30} />
            <strong>
              Case studies are only visible to seller accounts within your organisation. Buyers cannot access case studies.
            </strong>
          </div>
          <ul className="list-vertical" styleName="case-study-list">
            {Object.keys(case_studies).map((study, i) => {
              const {title, service, client} = case_studies[study];
              const isEvaluated = assessed.includes(service);
              const badgeStyleName = isEvaluated ? 'evaluated-badges' : 'provides-badges';
              return (
                <li key={i}>
                  <article>
                    {/*
                                      CaseStudyLink is a configurable prop.
                                      Since it will point to different areas in different flows.
                                      */}
                    <h3 className="au-display-md"><CaseStudyLink id={study}>{title}</CaseStudyLink></h3>
                    <p>{client}</p>
                    <div styleName={`badges ${badgeStyleName}`}>
                      {isEvaluated ? (
                        <span>{service} <Icon value="assessed-tick-nostroke" size={14}/></span>
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

          <SimpleAccordion title="Learn more" show={isEmpty(public_profile) || public_profile !== false}>
                <span styleName="accordionPaddTopp">
                    These products are not assessed or endorsed by the Digital Marketplace.
              </span>
          </SimpleAccordion>

          <hr styleName="productHr"/>

          {Object.keys(products).map((key, i) => {
            const product = products[key];
            if (!isEmpty(product)) {
              return (
                <div key={`product.${i}`} styleName="product">
                  <div className="col-xs-12">
                    {validURL(product.website) && (
                      <h3 className="au-display-md" styleName="product-heading">
                        <a  href={product.website} target="_blank"
                          rel="external noopener noreferrer">{product.name}</a>
                      </h3>
                    )}
                    <p className="freetext">
                      {newline(product.summary)}
                    </p>
                    {validURL(product.pricing) && (
                      <p>
                        <a  href={product.pricing} target="_blank"
                          rel="external noopener noreferrer">Product pricing</a>
                      </p>
                    )}
                    {validURL(product.support) && (
                      <p>
                        <a  href={product.support} target="_blank"
                          rel="external noopener noreferrer">Product support</a>
                      </p>
                    )}
                  </div>
                  {i < Object.keys(products).length - 1 && (<hr styleName="productHr"/>)}
                </div>
              )
            }
          })}
        </Row>

        <Row title="How we work" show={tools || methodologies || technologies}>
          {methodologies && (
            <div>

              <p styleName="bold-noMargin">Methodology</p>
              <p className="freetext">{newline(methodologies)}</p>

            </div>
          )}

          {tools && (
            <div>
              <p styleName="bold-noMargin">Tools</p>
              <p className="freetext">{newline(tools)}</p>

            </div>
          )}

          {technologies && (
            <div>
              <p styleName="bold-noMargin">Technologies</p>
              <p className="freetext">{newline(technologies)}</p>

            </div>
          )}
        </Row>


        <Row title="Company Details" show={true}>
          <p styleName="bold-noMargin">Authorised representative</p>
          <p>
            <span>{representative}</span><br/>
            {phone && <span>{phone}<br/></span>}
            {email && <span><a href={`mailto:${email}`}>{email}</a><br/></span>}

          </p>

          {number_of_employees && (
            <div>
              <p styleName="bold-noMargin">Number of employees</p>
              <p>{number_of_employees}</p>
            </div>
          )}

          {abn && (
            <div>
              <p styleName="bold-noMargin">ABN</p>
              <p>
                <a href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${abn}`} rel="external noopener noreferrer"
                  target="_blank">{abn}</a>
              </p>
            </div>
          )}

          {!isEmpty(certifications) && (
            <div>
              <p styleName="bold-noMargin">Accreditations</p>
              <ul>
                {certifications.map((certification, i) => (
                  <li key={i}>{certification}</li>
                ))}
              </ul>
            </div>
          )}

          {!isEmpty(boards) && (
            <div>

              <p styleName="bold-noMargin">Industry engagement</p>

              <ul>
                {boards.map((board, i) => (
                  <li key={i}>{board}</li>
                ))}
              </ul>
            </div>
          )}
        </Row>

        <Row title="Location" show={!isEmpty(addresses)}>

          {!isEmpty(addresses) && (
            <div>
              <p styleName="bold-noMargin">Main address </p>

              {Object.keys(addresses)
                .map((key, i) => {
                  if (!isEmpty(addresses[key])) {
                    return (

                      <p key={i}>

                        <span>{addresses[key].address_line}</span><br/>
                        <span>{addresses[key].suburb}</span><br/>
                        <span>{addresses[key].state} {addresses[key].postal_code}</span>
                      </p>


                    )
                  }
                })}

            </div>
          )}


        </Row>


        <Row title="Recognition" show={!isEmpty(awards)}>
          <p styleName="bold-noMargin">Awards</p>
          <ul>
            {awards.map((award, i) => (
              <li key={i}>{award}</li>
            ))}
          </ul>
        </Row>
        <Row title="Labour hire licence" show={!isEmpty(labourHire)}>
          {Object.keys(labourHire).map((key, i) => {
            if (key !== 'sa') {
              return (
                (labourHire[key]['licenceNumber'] || labourHire[key]['expiry']) && (
                  <React.Fragment key={i}>
                    <h4 className="au-display-sm">{mapAustraliaState(key)}</h4>
                    <div>
                      Licence number: {labourHire[key]['licenceNumber']}
                    </div>
                    <div>
                      Expiry: {format(new Date(labourHire[key]['expiry']), 'DD/MM/YYYY')}
                    </div>
                  </React.Fragment>
                )
              )}
            })}
        </Row>
        <Row title="Signed agreement" show={true}>
          {signed_agreements && signed_agreements.map((sa, i) => {
            const { htmlUrl, pdfUrl, signedAt } = sa
            return (
              <React.Fragment key={i}>
                <div>
                  <a href={htmlUrl ? htmlUrl : pdfUrl}>Master Agreement</a>{' '}
                  signed on {format(new Date(signedAt), 'DD/MM/YYYY')}
                </div>
              </React.Fragment>
            )
          })}
        </Row>
        <Row title="Documents provided to the Marketplace" show={!isEmpty(documents)}>
          <table className="content-table" styleName="content-table">
            <thead>
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Expires</th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(documents).map((key, val) => {
              const {expiry} = documents[key];
              return (
                <tr key={val}>
                  <td>
                    {documentTitle[key]}
                  </td>
                  <td className="table-align-right">
                    {expiry && format(new Date(expiry), 'DD/MM/YYYY')}
                  </td>
                </tr>

              )
            })}
            </tbody>
          </table>

          <p className="callout">Please <a href="mailto:marketplace@dta.gov.au">contact us</a> to view seller documents</p>

        </Row>
      </div>
    </article>
  )
};

Body.propTypes = {
    evaluated: PropTypes.object,
    provides: PropTypes.object,
    documents: PropTypes.object,
    documentsUrl: PropTypes.string,
    case_studies: PropTypes.object,
    signed_agreements: PropTypes.array,
    recruiter: PropTypes.string,
    representative: PropTypes.string,
    labourHire: PropTypes.object,
    email: PropTypes.string,
    phone: PropTypes.string,
    website: PropTypes.string,
    linkedin: PropTypes.string,
    abn: PropTypes.string,
    addresses: PropTypes.array,
    CaseStudyLink: PropTypes.func,
    contact_email: PropTypes.string,
    contact_phone: PropTypes.string,
    contact_name: PropTypes.string,
    digital_marketplace_panel: PropTypes.bool,
    dsp_panel: PropTypes.bool
};

export default Body;
