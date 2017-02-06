import React from 'react';
import {connect} from 'react-redux';
import { Match, Link, Redirect } from 'react-router';

import ApplicationPreview from './ApplicationPreview'
import ConnectedLink from './ConnectedLink';
import View from '../../CaseStudy/components/View';

const Review = ({pathname, caseStudyForm, ...rest}) => (
    <div>
        <Match pattern={pathname} exactly render={() => (
            <div>
                <h1 tabIndex="-1">Preview your new profile</h1>
                <p>Take a moment to preview your profile — this is what assessors and government buyers will see in the Marketplace. </p>
                <p>Once you’re happy we can email a link to this application to your authorised representative so they can complete the legal agreement step.</p>
                <p>
                    <Link to={`${pathname}/profile`}>Preview your profile</Link>
                </p>
            </div>
        )}/>
        <Match 
            pattern={`${pathname}/profile`}
            exactly
            render={(routerProps) => (
                <ApplicationPreview {...routerProps} {...rest}  />
            )}
            component={ApplicationPreview}
        />

        {/* Slight duplication but need to reconfigure the return link. */}
        <Match pattern={`${pathname}/profile/case-study/:id`} render={({ params }) => {
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