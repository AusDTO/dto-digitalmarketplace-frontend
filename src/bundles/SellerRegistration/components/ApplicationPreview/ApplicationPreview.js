import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import { Body, ReviewHeader, PrivateInfo } from '../../../../shared/SellerProfile';

const ApplicationPreview = ({ header, body, privateInfo, onClick }) => (
  <div>
      {onClick && <div className="row">
      <div className="callout--calendar-event col-sm-8 col-xs-12">
        <h3>Preview your profile</h3>
        <p>Buyers will see your business information previewed below. If the information is correct, continue to the final step to submit your application or continue editing.</p>
        <Link to="/submit">{({ href }) => (
            <a
              href={href}
              role="button"
              onClick={onClick}
            >Save and continue</a>
          )
        }</Link>
          <Link  to="/review">Go back and edit</Link>
      </div>
    </div>}
    <ReviewHeader 
      {...header}
    />
    <div className="row">
      <div className="col-sm-8 col-xs-12">
        <Body {...body} />
          {!onClick && <PrivateInfo {...privateInfo} />}
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ application }, { documentsUrl, caseStudyUrl, onClick }) => {
    const {
      name,
      seller_type,
      summary,
      website,
      representative,
      email,
      phone,
      contact_email,
      contact_phone,
      contact_name,
      services: provides,
      case_studies,
      linkedin,
      abn,
      address,
      interstate,
      documents,
      number_of_employees,
      local_government_experience,
      state_government_experience,
      federal_government_experience,
      other_panels,
      structual_changes,
      investigations,
      legal_proceedings,
      insurance_claims,
      conflicts_of_interest,
      other_circumstances,
      structual_changes_details,
      investigations_details,
      legal_proceedings_details,
      insurance_claims_details,
      conflicts_of_interest_details,
      other_circumstances_details,
      documents_url = '../documents/',
      case_study_url
    } = application;

    let caseStudyLink = null;
    if (typeof case_study_url !== 'undefined') {
      caseStudyLink = ({id, children}) => (<a href={`${case_study_url}${id}`}>{children}</a>);
    } else {
      caseStudyLink = ({id, children}) => (<b>{children}</b>);
    }

    return {
        header: {
          name,
          seller_type,
          summary,
          website,
          contact_email,
          contact_phone,
          contact_name
        },
        body: {
          provides,
          case_studies,
          linkedin,
          abn,
          address,
          interstate,
          representative,
          email,
          phone,
          website,
          contact_email,
          contact_phone,
          contact_name,
          CaseStudyLink: caseStudyLink,
          documents,
          documentsUrl: documents_url
        },
        privateInfo: {
            case_studies,
            number_of_employees,
            local_government_experience,
            state_government_experience,
            federal_government_experience,
            other_panels,
            structual_changes,
            investigations,
            legal_proceedings,
            insurance_claims,
            conflicts_of_interest,
            other_circumstances,
            structual_changes_details,
            investigations_details,
            legal_proceedings_details,
            insurance_claims_details,
            conflicts_of_interest_details,
            other_circumstances_details
        },
        onClick
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(ApplicationPreview);