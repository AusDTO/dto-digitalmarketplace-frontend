import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

import { Body, ReviewHeader } from '../../../../shared/SellerProfile';

const ApplicationPreview = ({ header, body, onClick }) => (
  <div>
    <div className="row">
      <div className="callout--calendar-event col-sm-8 col-xs-12">
        <h3>Preview your profile</h3>
        <p>Buyers will see your company information previewed below. If the information is correct, continue to the final step to submit your application or continue editing.</p>
        <Link to="/submit">{({ href }) => (
            <a
              href={href}
              role="button"
              onClick={onClick}
            >Continue to submit</a>
          )
        }</Link>
      </div>
    </div>
    <ReviewHeader 
      {...header}
      continueLink={<Link role="button" to="/review">Continue Editing</Link>}
    />
    <div className="row">
      <div className="col-sm-8 col-xs-12">
        <Body {...body} />
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ application }, { onClick }) => {
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
      documents
    } = application;

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
          documents,
          CaseStudyLink: ({id, children}) => (<b>{children}</b>)
          //CaseStudyLink: ({id, children}) => (
          //  <Link to={`/case-study/view/${id}`}>{children}</Link>
          //)
        },
        onClick
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(ApplicationPreview);