import React from 'react';
import {connect} from 'react-redux';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import ApplicationPreview from './ApplicationPreview'
import ConnectedLink from './ConnectedLink';
import View from '../../CaseStudy/components/View';
import PageAlert from '@gov.au/page-alerts';

import styles from './SellerRegistration.css';
import review from './Review.css';

const Review = ({supplierCode, match, caseStudyForm, applicationErrors, ...rest}) => (
    <Switch>
        <Route path={match.url} exact render={() => (
            <div id="preview-link" styleName="styles.content">
                <h1 className="au-display-xl" styleName="review.preview-heading" tabIndex="-1">Preview your new profile</h1>
                {supplierCode ? (<p>Take a moment to preview your profile — this is what assessors and government buyers will see in the Digital Marketplace.</p>)
                :(<span><p>Take a moment to preview your new seller profile. This is what government buyers (and assessors, if you are offering new services) will see in the Digital Marketplace.</p></span>) }
                {applicationErrors && applicationErrors.length > 0 ? (
                <PageAlert as='error'>
                    <h3> Application Errors</h3>
                    <ul>
                        {applicationErrors.map(ae => (
                            <li>{ae.message}</li>
                        ))}
                    </ul>
                </PageAlert>) : (
                <p>
                    <Link className="button" to={`${match.url}/profile`}>Preview your profile</Link>
                </p>)}
                
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
              {!isEmpty(currentStudy) && !isEmpty(currentStudy.title)
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

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        supplierCode: (state.application && state.application.supplier_code),
        caseStudyForm: state.caseStudyForm,
        applicationErrors: state.application_errors
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Review);