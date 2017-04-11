import React from 'react';
import Row from './Row';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';
import {newline} from '../../helpers';

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
        addresses,
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

            <Row title="Areas of expertise" show={!isEmpty(assessed) || !isEmpty(unassessed)}>

                {!isEmpty(assessed) && (
                    <div className="seller-profile__evaluated-badges" styleName="badges evaluated-badges">
                        <p styleName="bold">Assessed for</p>
                        {assessed.map((service, i) => (
                            <span key={i}>{service} <Icon value="assessed-tick-nostroke" size={14}/></span>
                        ))}
                    </div>
                )}

                {!isEmpty(unassessed) && (
                    <div className="seller-profile__provides-badges" styleName="badges provides-badges">
                        <p styleName="bold">Experience in</p>
                        {unassessed.map((service, i) => (
                            <span key={i}>{service}</span>
                        ))}
                    </div>
                )}

                {isEmpty(assessed || !isEmpty(unassessed)) && (
                <SimpleAccordion title="Learn about assessments">
                  <span styleName="accordionPaddTopp">
                    These areas of expertise have not yet been formally assessed by the DTA.  They will be assessed once the seller expresses interest in a matching opportunity.

                  </span>
                </SimpleAccordion>
                )}

            </Row>

            <Row title="Case studies" marginBot="true" show={!isEmpty(case_studies)}>
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
                                    <h3><CaseStudyLink id={study}>{title}</CaseStudyLink></h3>
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
                The products below are not assessed or endorsed by the Digital Marketplace.
            </span>
            </SimpleAccordion>

            <hr styleName="productHr" />

                {Object.keys(products).map((key, i) => {
                    const product = products[key];
                    if (!isEmpty(product)) {
                        return (
                            <div key={`product.${i}`}>
                                <div className="col-xs-12">
                                    <h3 styleName="product-heading">
                                        <a style={{display: 'inline'}} href={product.website} target="_blank"
                                           rel="external">{product.name}</a>
                                    </h3>
                                    <p className="freetext">
                                        {newline(product.summary)}
                                    </p>
                                    <p>
                                        <a style={{display: 'inline'}} href={product.pricing} target="_blank"
                                           rel="external">Product pricing</a>
                                    </p>
                                    <p>
                                        <a style={{display: 'inline'}} href={product.support} target="_blank"
                                           rel="external">Product support</a>
                                    </p>
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
                    { phone && <span>{phone}<br/></span>}
                    { email && <span><a href={`mailto:${email}`}>{email}</a><br/></span>}

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
                            <a href={`https://abr.business.gov.au/SearchByAbn.aspx?SearchText=${abn}`} rel="external"
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
                        <p styleName="bold-noMargin">Main Address </p>

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
                        const {filename, expiry} = documents[key];
                        if (key != 'financial') {
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
                        }
                    })}
                    </tbody>
                </table>

                <p className="callout">The above documents have been provided by the seller. They are available upon request, contact marketplace@digital.gov.au.</p>

            </Row>


        </article>
    )
};

Body.propTypes = {
    evaluated: React.PropTypes.object,
    provides: React.PropTypes.object,
    documents: React.PropTypes.object,
    documentsUrl: React.PropTypes.string,
    case_studies: React.PropTypes.object,
    representative: React.PropTypes.string,
    email: React.PropTypes.string,
    phone: React.PropTypes.string,
    website: React.PropTypes.string,
    linkedin: React.PropTypes.string,
    abn: React.PropTypes.string,
    addresses: React.PropTypes.array,
    CaseStudyLink: React.PropTypes.func,
    contact_email: React.PropTypes.string,
    contact_phone: React.PropTypes.string,
    contact_name: React.PropTypes.string,
};

export default Body;
