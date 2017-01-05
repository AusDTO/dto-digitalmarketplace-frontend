import React from 'react';
import Row from "./Row";
import questions from '../../bundles/SellerRegistration/components/DisclosuresForm/questions';

const PrivateInfo = (props) => {
  const {
      case_studies = {},
        number_of_employees,
        local_government_experience,
        state_government_experience,
        federal_government_experience,
        other_panels
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
            const answer = props[key];
            const details = props[key + "_details"];
            return (<p key={i}><b>{question}</b> {answer} - {details}</p>)
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
    structual_changes: React.PropTypes.string,
    investigations: React.PropTypes.string,
    legal_proceedings: React.PropTypes.string,
    insurance_claims: React.PropTypes.string,
    conflicts_of_interest: React.PropTypes.string,
    other_circumstances: React.PropTypes.string,
    structual_changes_details: React.PropTypes.string,
    investigations_details: React.PropTypes.string,
    legal_proceedings_details: React.PropTypes.string,
    insurance_claims_details: React.PropTypes.string,
    conflicts_of_interest_details: React.PropTypes.string,
    other_circumstances_details: React.PropTypes.string
};

export default PrivateInfo;