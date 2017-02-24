import React from 'react';
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

const PrivateInfo = (props) => {
    const {
        documents = {},
        documentsUrl,
        case_studies = {},
        number_of_employees,
        local_government_experience,
        state_government_experience,
        federal_government_experience,
        other_panels,
        signed_agreements = [],
        recruiter_info = {}
    } = props;
    return (
        <article className="private-info" style={{border: 'red 5px solid'}}>
            <h3> PRIVATE INFORMATION FOR DIGITAL MARKETPLACE ASSESSMENT PURPOSES ONLY </h3>
            <Row title="Case Study Referees" show={true}>
                {case_studies && Object.keys(case_studies).map((study, i) => {
                    const {title, referee_name, referee_email, referee_position} = case_studies[study];
                    return (<div key={i}>Case Study: "{title}" <br/> Referee: {referee_name}
                        ({referee_position}) {referee_email}
                        <hr/>
                    </div>)
                })
                }
            </Row>
            <Row title="Business Details" show={true}>
                Number of Employees: {number_of_employees}<br/>
                {local_government_experience && <p>Local Government Experience ✓</p>}
                {state_government_experience && <p>State Government Experience ✓</p>}
                {federal_government_experience && <p>Federal Government Experience ✓</p>}
                {other_panels && <p>Other panels: {other_panels}</p>}
            </Row>
            <Row title="Disclosures" show={true}>
                {Object.keys(questions).map((key, i) => {
                    const question = questions[key];
                    const answer = props['disclosures'][key];
                    const details = props['disclosures'][key + "_details"];
                    return (<p key={i}><b>{question}</b> {answer} - {details}</p>)
                })}
            </Row>
            <Row title="Master Agreement" show={!isEmpty(signed_agreements)}>
                {signed_agreements.map((agreement, i) => {
                    const {version, url, name, email_address, signed_at} = agreement;
                    return (<div key={i}>Agreement: <a href={url}>{version}</a> <br/> {name} ({email_address}) signed
                        at {format(new Date(signed_at), 'YYYY-MM-DD HH:mm')}
                        <hr/>
                    </div>)
                })}
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
                        const {filename, expiry} = documents[key];
                        return (
                            <tr key={val}>
                                <td>
                                    <a href={`${documentsUrl}${filename}`}>
                                        {documentTitle[key]}
                                    </a>
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
            <Row title="Recruiter Info" show={!isEmpty(recruiter_info)}>
            {console.log(recruiter_info)}
            {Object.keys(recruiter_info).map((key, i) => {
                return (
                    <div>
                    <h4>{key}</h4> 
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
        </article>
    )
};

PrivateInfo.propTypes = {
    documents: React.PropTypes.object,
    documentsUrl: React.PropTypes.string,
    case_studies: React.PropTypes.object,
    number_of_employees: React.PropTypes.string,
    local_government_experience: React.PropTypes.bool,
    state_government_experience: React.PropTypes.bool,
    federal_government_experience: React.PropTypes.bool,
    other_panels: React.PropTypes.string,
    disclosures: React.PropTypes.object,
    signed_agreements: React.PropTypes.array,
    recruiter_info: React.PropTypes.object,
};

export default PrivateInfo;