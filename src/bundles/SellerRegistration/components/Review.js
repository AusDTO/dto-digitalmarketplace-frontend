import React from 'react';
import {connect} from 'react-redux';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import ApplicationPreview from './ApplicationPreview'
import ConnectedLink from './ConnectedLink';
import View from '../../CaseStudy/components/View';

const Review = ({supplierCode, match, caseStudyForm, ...rest}) => (
    <Switch>
        <Route path={match.url} exact render={() => (
            <div>
                <h1 tabIndex="-1">Preview your new profile</h1>
                {supplierCode ? (<span><p>Take a moment to preview your profile — this is what assessors and government buyers will see in the Digital Marketplace.</p>
                    <p>Once you’re happy we can email a link to this application to your authorised representative so they can complete the legal agreement step.</p></span>)
                :(<span><p>Take a moment to preview your new seller profile. This what government buyers (and assessors, if you’re offering new services) will see in the Digital Marketplace.</p>
                        <p>If the information is correct, you can continue to the legal disclosures and agreement.</p></span>) }

                <p>
                    <Link role="button" to={`${match.url}/profile`}>Preview your profile</Link>
                </p>
            </div>
        )}/>
        <Route 
            exact
            path={`${match.url}/profile`}
            render={(routerProps) => (
                <ApplicationPreview {...routerProps} {...rest}  />
            )}
        />

        {/* Slight duplication but need to reconfigure the return link. */}
        <Route path={`${match.url}/profile/case-study/:id`} render={({ match: subMatch }) => {
          const currentStudy = caseStudyForm.case_studies[subMatch.params.id];
          return (
            <div>
              {currentStudy.title
                ? <View
                    {...currentStudy}
                    returnLink={<p><ConnectedLink to={`${match.url}/profile`}>Return to Profile</ConnectedLink></p>}
                  />
                : <Redirect to={`${match.url}/profile`} />
              }
            </div>
          )
        }} />
    </Switch>
);

const mapStateToProps = (state, { caseStudyForm }, ownProps) => {
    return {
        ...ownProps,
        supplierCode: (state.application && state.application.supplierCode),
        caseStudyForm
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Review);