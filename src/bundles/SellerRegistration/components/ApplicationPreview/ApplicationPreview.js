import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import ConnectedLink from '../ConnectedLink';
import isEmpty from 'lodash/isEmpty';

import { Body, ReviewHeader, PrivateInfo } from '../../../../shared/SellerProfile';

import apppreview from './application-preview.css'; // eslint-disable-line no-unused-vars

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
    <div className="row" styleName="apppreview.center">
      <div className="col-sm-8 col-xs-12">
        <Body {...body} />
        {!onClick && privateInfo.disclosures && <PrivateInfo {...privateInfo} />}
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ application }, { documentsUrl, onClick, ...rest }) => {
    let {
      name,
      seller_type,
      summary,
      website,
      contact_email,
      contact_phone,
      contact_name,
      services: provides,
      case_studies,
      travel: interstate,
      number_of_employees,
      local_government_experience,
      state_government_experience,
      federal_government_experience,
      other_panels,
      disclosures,
      documents_url = '../documents/',
      case_study_url,
      ...body
    } = application;

    let caseStudyLink = null;
    if (typeof case_study_url !== 'undefined') {
      caseStudyLink = ({id, children}) => (<a href={`${case_study_url}${id}`}>{children}</a>);
    } else {
      caseStudyLink = ({id, children}) => (
        <ConnectedLink to={`${rest.pathname}/case-study/${id}`}>{children}</ConnectedLink>
      );
    }

    // FIXME this is a workaround, somehow python returns empty case studies as a list.
    // Either there is bad data floating around or something is turning empty objects
    // into an array.
    // Body expects object not array.
    if (Array.isArray(case_studies) && isEmpty(case_studies)) {
      case_studies = {};
    }

    return {
        header: {
          name,
          seller_type,
          summary,
          website,
          contact_email,
          contact_phone,
          contact_name,
          number_of_employees
        },
        body: {
          provides,
          case_studies,
          interstate,
          CaseStudyLink: caseStudyLink,
          documentsUrl: documents_url,
          ...body
        },
        privateInfo: (disclosures ? {
            case_studies,
            number_of_employees,
            local_government_experience,
            state_government_experience,
            federal_government_experience,
            other_panels,
            disclosures
        } : {}),
        onClick
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(ApplicationPreview);