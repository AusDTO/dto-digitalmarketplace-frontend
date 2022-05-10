import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ConnectedLink from '../ConnectedLink';
import isEmpty from 'lodash/isEmpty';
import { Form } from 'react-redux-form';
import SubmitForm    from '../../../../shared/form/SubmitForm';

import {Body, ReviewHeader, PrivateInfo} from '../../../../shared/SellerProfile';
import {AppChanges} from '../../../ApplicationsAdmin/components/AppChanges/AppChanges';
import formProps from '../../../../shared/reduxModules/formPropsSelector';

import styles from './ApplicationPreview.css'; // eslint-disable-line no-unused-vars

const ApplicationPreview = ({header, body, privateInfo, onClick, model, form, onSubmit, csrfToken}) => (
  <div>
    {onClick && <div className="row">
      {header.type === 'edit' ?
        <div className="callout--calendar-event col-sm-8 col-xs-12">
          <b styleName={"styles.au-display-lg"}>Preview your updated profile</b>
          <Form model={model}
                    action={`/sellers/application/submit/${header.id}`}
                    method="post"
                    id="submit"
                    component={SubmitForm}
                    valid={true}
                    onSubmit={onSubmit}
              >
            <p>Once you submit these updates we will review the changes before updating your profile on the Digital Marketplace.</p>
            <input type="hidden" name="csrf_token" id="csrf_token" value={csrfToken}/>
            <button disabled="disabled">Submit updates</button>
            <Link to="/update">Go back and edit</Link>
          </Form>
        </div>
      :
        <div className="callout--calendar-event col-sm-8 col-xs-12">
          <b>Preview your profile</b>
          <p>Please review your profile, if correct, continue to the legal disclosures and agreement.
            Check for punctuation, spelling mistakes and grammatical errors.
          </p>
          <Link
            to="/submit"
            className="button"
            onClick={(e) => onClick(e)}>
            Continue to next step
          </Link>
          <Link to="/review">Go back and edit</Link>
        </div>
      }
    </div>}
    <div>
      {!onClick && <AppChanges body={body}/>}
    </div>
    <ReviewHeader
      {...header}
    />
    <div styleName="styles.seller-profile-container">
      <div className="row" styleName={body.public_profile ? 'styles.center' : ''}>
        <div className="col-sm-8 col-xs-12">
          <Body {...body} />
          {!onClick && privateInfo.disclosures && <PrivateInfo {...privateInfo} />}
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, {documentsUrl, onClick, ...rest}) => {
  let {
    id,
    type,
    abn,
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
    candidates,
    labourHire,
    digital_marketplace_panel,
    dsp_panel,
    pricing,
    ...body
  } = state.application;

  let assessed = state.application.assessed_domains || domains.assessed || [];
  let unassessed = domains.unassessed;
  let all_domains = domains.all || [];
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

  // filter out services that have been de-selected
  assessed = assessed.filter(key => Object.keys(services).includes(key))

  let providedCandidates = false;
  if (candidates &&
    candidates.active_candidates &&
    candidates.database_size &&
    candidates.margin &&
    candidates.markup &&
    candidates.placed_candidates
  ) {
    providedCandidates = true;
  }

  // calculate badges
  seller_type = Object.assign({}, {
    product: !isEmpty(state.application.products),
    recruiter_only: recruiter === 'yes',
    consultant_only: recruiter === 'no',
    recruiter_both: recruiter === 'both',
    consultant: recruiter === 'both' || recruiter === 'no',
    labourHire: (recruiter === 'both' || recruiter === 'yes') && providedCandidates
  }, seller_type);

  let caseStudyLink = null;
  if (typeof case_study_url !== 'undefined') {
    caseStudyLink = ({id, children}) => (
      <a href={`${case_study_url}${id}`} target="_blank" rel="external noopener noreferrer">{children}</a>);
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
      id,
      type,
      abn,
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
      id,
      type,
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
      signed_agreements,
      services,
      pricing,
      recruiter,
      labourHire,
      name,
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
        recruiter_info,
        candidates,
        labourHire,
        pricing,
        all_domains
    } : {}),
    onClick,
    csrfToken: state.form_options.csrf_token,
    ...formProps(state, 'ApplicationPreview')
  }
}

export {
  mapStateToProps
}

export {ApplicationPreview as ApplicationPreviewClass};

export default connect(mapStateToProps)(ApplicationPreview);
