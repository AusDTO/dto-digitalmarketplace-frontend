import React from 'react';
import PropTypes from 'prop-types'
import Row from "./Row";
import questions from '../../bundles/SellerRegistration/components/DisclosuresForm/questions';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import startCase from 'lodash/startCase';

import './SellerProfile.css';

const documentTitle = {
    financial: 'Financial Statement',
    liability: 'Public Liability Insurance',
    workers: 'Workers Compensation Insurance'
};

const govExperienceTitle = {
    no_experience: "None yet",
    local: "Local government",
    state: "State/territory government",
    federal: "Federal/Commonwealth government",
    international: "International government"
}

const PrivateInfo = (props) => {
    const {
        documents = {},
        documentsUrl,
        case_studies = {},
        number_of_employees,
        government_experience,
        other_panels,
        signed_agreements = [],
        recruiter_info = {},
        pricing = {},
        all_domains = []
    } = props;

    let price_statuses = {};
    all_domains.forEach(d => price_statuses[d.domain_name] = d.price_status);

    return (
        <article styleName="privateInfo">
            <h3 className="au-display-md"> PRIVATE INFORMATION FOR DIGITAL MARKETPLACE ASSESSMENT PURPOSES ONLY </h3>
            <Row title="Case Study Referees" show={true}>
                {case_studies && Object.keys(case_studies).map((study, i) => {
                    const {title, referee_name, refereeName, referee_email, refereeEmail, referee_position, refereePosition} = case_studies[study];
                    return (<div key={i}>Case Study: "{title}" <br/> Referee: {referee_name || refereeName}
                        ({referee_position || refereePosition}) {referee_email || refereeEmail}
                        <hr/>
                    </div>)
                })
                }
            </Row>
            <Row title="Business Details" show={true}>
                Number of Employees: {number_of_employees}<br/>
                Government experience: <ul>
                {government_experience && Object.keys(government_experience).map((key, i) => {
                    return (<li key={i}>{govExperienceTitle[key]}</li>)
                })
                }
            </ul>
                {other_panels && <p>Other panels: {other_panels}</p>}
            </Row>
            <Row title="Disclosures" show={true}>
                {questions && Object.keys(questions).map((key, i) => {
                    const question = questions[key];
                    const answer = props['disclosures'][key];
                    const details = props['disclosures'][key + "_details"];
                    return (<p key={i}><b>{question}</b> {answer} - {details}</p>)
                })}
            </Row>
            <Row title="Master Agreement" show={!isEmpty(signed_agreements)}>
                {signed_agreements.map((sa, i) => {
                    const { htmlUrl, pdfUrl, signedAt, user } = sa
                    return (<div key={i}><a href={htmlUrl ? htmlUrl : pdfUrl}>Master Agreement</a> signed
                        at {format(new Date(signedAt), 'YYYY-MM-DD HH:mm')} by {user.name} ({user.emailAddress})
                        <hr/>
                    </div>)
                })}
            </Row>
            <Row title="Documents" show={!isEmpty(documents)}>
                <table className="content-table" styleName="content-table">
                    <thead>
                    <tr>
                        <th>Document type </th>
                        <th>Expiry</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(documents).map((key, val) => {
                        const {filename, expiry, application_id, noWorkersCompensation} = documents[key];
                        const url = application_id ? `/admin/application/${application_id}/documents/` : documentsUrl
                        return (
                            <tr key={val}>
                                <td>
                                    {key == 'workers' && noWorkersCompensation
                                        ? documentTitle[key]
                                        : <a href={`${url}${filename}`}>{documentTitle[key]}</a>
                                    }
                                </td>
                                <td>
                                    {expiry && format(new Date(expiry), 'DD/MM/YYYY')}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {documents && documents.workers && documents.workers.noWorkersCompensation && 
                    <p>
                        <b>Workers compensation insurance not held by this seller</b>
                    </p>
                }
            </Row>
            <Row title="Recruiter Info" show={!isEmpty(recruiter_info)}>
              {Object.keys(recruiter_info).map((key, i) => {
                return (
                  <div key={i}>
                    <h4 className="au-display-sm">{key}</h4>
                    {Object.keys(recruiter_info[key]).map((subKey, j) => {
                      return (
                        <div key={`${key}-${subKey}`}>
                          {startCase(subKey)}:{recruiter_info[key][subKey]}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </Row>
            <Row title="Pricing" show={!isEmpty(pricing)}>
              {Object.keys(pricing).map((key, i) => {
                return (
                  <div key={key}>{`${key}: $${pricing[key]['maxPrice']} (${price_statuses[key]})`}</div>
                )
              })}
            </Row>
        </article>
    )
};

PrivateInfo.propTypes = {
    documents: PropTypes.object,
    documentsUrl: PropTypes.string,
    case_studies: PropTypes.object,
    number_of_employees: PropTypes.string,
    government_experience: PropTypes.object,
    other_panels: PropTypes.string,
    disclosures: PropTypes.object,
    signed_agreements: PropTypes.array,
    recruiter_info: PropTypes.object,
    pricing: PropTypes.object,
    all_domains: PropTypes.array
};

export default PrivateInfo;
