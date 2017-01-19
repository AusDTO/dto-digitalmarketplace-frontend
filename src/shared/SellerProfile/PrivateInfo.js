import React from 'react';
import Row from "./Row";
import questions from '../../bundles/SellerRegistration/components/DisclosuresForm/questions';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';

const PrivateInfo = (props) => {
  const {
      case_studies = {},
        number_of_employees,
        local_government_experience,
        state_government_experience,
        federal_government_experience,
        other_panels,
        signed_agreements = []
  } = props;
  return (
    <article className="private-info" style={{border: 'red 5px solid'}}>
        <h3> PRIVATE INFORMATION FOR DIGITAL MARKETPLACE ASSESSMENT PURPOSES ONLY </h3>
        <Row title="Case Study Referees" show={true}>
        {case_studies && Object.keys(case_studies).map((study, i) => {
            const { title, referee_name, referee_email, referee_position } = case_studies[study];
            return (<div key={i}>Case Study: "{title}" <br/> Referee: {referee_name} ({referee_position}) {referee_email} <hr/></div>)
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
            const { version, url, name, email_address, signed_at } = agreement;
            return (<div key={i}>Agreement: <a href={url}>{version}</a> <br/> {name} ({email_address}) signed at {format(new Date(signed_at), 'YYYY-MM-DD HH:mm')} <hr/></div>)
        })}
        </Row>

    </article>
  )
};

PrivateInfo.propTypes = {
    case_studies: React.PropTypes.object,
    number_of_employees: React.PropTypes.string,
    local_government_experience: React.PropTypes.bool,
    state_government_experience: React.PropTypes.bool,
    federal_government_experience: React.PropTypes.bool,
    other_panels: React.PropTypes.string,
    disclosures: React.PropTypes.object,
    signed_agreements: React.PropTypes.array
};

export default PrivateInfo;