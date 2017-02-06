import React from 'react';
import {connect} from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

import ApplicationPreview from './ApplicationPreview'
import ConnectedLink from './ConnectedLink';
import View from '../../CaseStudy/components/View';

const Review = ({pathname, caseStudyForm, ...rest}) => (
    <div>
        <Route path={pathname} exactly render={() => (
            <div>
                <h1 tabIndex="-1">Preview your new profile</h1>
                <p>Take a moment to preview your profile — this is what assessors and government buyers will see in the Marketplace. </p>
                <p>
                    <Link to={`${pathname}/profile`}>Preview your profile</Link>
                </p>
            </div>
        )}/>
        <Route 
            path={`${pathname}/profile`}
            exactly
            render={(routerProps) => (
                <ApplicationPreview {...routerProps} {...rest}  />
            )}
            component={ApplicationPreview}
        />

        {/* Slight duplication but need to reconfigure the return link. */}
        <Route path={`${pathname}/profile/case-study/:id`} render={({ params }) => {
          const currentStudy = caseStudyForm.case_studies[params.id];
          return (
            <div>
              {currentStudy.title
                ? <View
                    {...currentStudy}
                    returnLink={<p><ConnectedLink to={`${pathname}/profile`}>Return to Profile</ConnectedLink></p>}
                  />
                : <Redirect to={`${pathname}/profile`} />
              }
            </div>
          )
        }} />
    </div>
);

const mapStateToProps = ({ caseStudyForm }, ownProps) => {
    return {
        ...ownProps,
        caseStudyForm
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Review);