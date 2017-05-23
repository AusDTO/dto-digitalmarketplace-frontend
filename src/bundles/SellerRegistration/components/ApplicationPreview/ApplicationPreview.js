import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ConnectedLink from '../ConnectedLink';
import isEmpty from 'lodash/isEmpty';

import {Body, ReviewHeader, PrivateInfo} from '../../../../shared/SellerProfile';
import {AppChanges} from '../../../ApplicationsAdmin/components/AppChanges/AppChanges';

import styles from './ApplicationPreview.css'; // eslint-disable-line no-unused-vars

const ApplicationPreview = ({header, body, privateInfo, onClick}) => (
  <div>
    {onClick && <div className="row">
      <div className="callout--calendar-event col-sm-8 col-xs-12">
        <h3>Preview your profile</h3>
        <p>Buyers will see the information below when they visit your seller profile. If correct, continue to the
          legal
          disclosures and agreement.</p>
        <Link
          to="/submit"
          role="button"
          onClick={(e) => onClick(e)}>
          Continue to next step
        </Link>
        <Link to="/review">Go back and edit</Link>
      </div>
    </div>}
    <div>
      {!onClick && <AppChanges body={body}/>}
    </div>
    <ReviewHeader
      {...header}
    />
    <div className="row" styleName={body.public_profile ? 'styles.center' : ''}>
      <div className="col-sm-8 col-xs-12">
        <Body {...body} />
        {!onClick && privateInfo.disclosures && <PrivateInfo {...privateInfo} />}
      </div>
    </div>
  </div>
);

const mapStateToProps = ({application}, {documentsUrl, onClick, ...rest}) => {
  let {
    name,
    seller_type,
    summary,
    website,
    twitter,
    contact_email,
    contact_phone,
    contact_name,
    services = {},
    domains = {},
    case_studies,
    travel: interstate,
    linkedin,
    number_of_employees,
    government_experience,
    other_panels,
    disclosures,
    documents,
    documents_url = '../documents/',
    case_study_url,
    public_profile,
    signed_agreements,
    recruiter,
    recruiter_info,
    digital_marketplace_panel,
    dsp_panel,
    ...body
  } = application;

  let assessed = application.assessed_domains || domains.assessed || [];
  let unassessed = domains.unassessed;
  // If unassessed is falsy, assume we are on preview
  // Where we just want to show the current selected
  // services. Filter out falsy services and convert
  // to an Array to keep type consistent
  if (!unassessed) {
    unassessed = Object
      .keys(services)
      .filter(key => services[key]);
    if (assessed) {
      unassessed = unassessed.filter(key => !assessed.includes(key));
    }
  }

  // calculate badges
  seller_type = Object.assign({}, {
    product: !isEmpty(application.products),
    recruitment: ((recruiter === 'yes' || recruiter === 'both'))
  }, seller_type);

  let caseStudyLink = null;
  if (typeof case_study_url !== 'undefined') {
    caseStudyLink = ({id, children}) => (
      <a href={`${case_study_url}${id}`} target="_blank" rel="external">{children}</a>);
  } else {
    caseStudyLink = ({id, children}) => (
      <ConnectedLink to={`${rest.match.url}/case-study/${id}`}>{children}</ConnectedLink>
    );
  }

  // FIXME this is a workaround, somehow python returns empty case studies as a list.
  // Either there is bad data floating around or something is turning empty objects
  // into an array.
  // Body expects object not array.
  if (Array.isArray(case_studies)) {
    if (isEmpty(case_studies)) {
      case_studies = {};
    } else {
      // Convert case study array to object format.
      case_studies = case_studies.reduce((cso, study) => {
        cso[study.id] = study;
        return cso;
      }, {});
    }
  }

  return {
    header: {
      name,
      seller_type,
      summary,
      website,
      twitter,
      contact_email,
      contact_phone,
      contact_name,
      linkedin,
      public_profile
    },
    body: {
      assessed,
      unassessed,
      case_studies,
      interstate,
      CaseStudyLink: caseStudyLink,
      documents,
      documentsUrl: documents_url,
      public_profile,
      digital_marketplace_panel,
      dsp_panel,
      ...body
    },
    privateInfo: (disclosures ? {
      documents,
      documentsUrl: documents_url,
      case_studies,
      number_of_employees,
      government_experience,
      other_panels,
      disclosures,
      signed_agreements,
      recruiter_info
    } : {}),
    onClick
  }
}

export {
  mapStateToProps
}

export {ApplicationPreview as ApplicationPreviewClass};

export default connect(mapStateToProps)(ApplicationPreview);
