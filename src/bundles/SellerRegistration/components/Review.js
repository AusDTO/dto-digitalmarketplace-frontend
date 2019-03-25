import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import ApplicationPreview from './ApplicationPreview'
import ConnectedLink from './ConnectedLink';
import View from '../../CaseStudy/components/View';
import PageAlert from '@gov.au/page-alerts';
import ValidationSummary from './ValidationSummary';
import { showConfirmDiscard } from '../redux/modules/application'

import styles from './SellerRegistration.css';
import review from './Review.css';

const Review = ({
    supplierCode,
    match,
    caseStudyForm,
    applicationErrors,
    applicationId,
    applicationType,
    confirmDiscard,
    showConfirmDiscard,
    ...rest }) => (
        <Switch>
            <Route path={match.url} exact render={() => (
                <div id="preview-link" styleName="styles.content">
                    <h1 className="au-display-xl" styleName="review.preview-heading" tabIndex="-1">Preview and submit</h1>
                    {supplierCode ? (<p>Preview your profile before submitting your updates.</p>)
                        : (<span><p>Take a moment to preview your new seller profile. This is what government buyers (and assessors, if you are offering new services) will see in the Digital Marketplace.</p></span>)}

                    <ValidationSummary applicationErrors={applicationErrors} renderLink={true} title={'There is a problem to fix before you can submit'} />
                    <div>
                        {confirmDiscard &&
                            <PageAlert as='warning'>
                                <h4 tabIndex="-1">Are you sure you want to discard all updates?</h4>
                                <a href={`/sellers/application/${applicationId}/discard`} className="button">Yes</a>
                                <a styleName="review.skip-link"
                                    href="#discard-cancel"
                                    onClick={e => {
                                        e.preventDefault();
                                        showConfirmDiscard(false);
                                    }}>Cancel</a>
                            </PageAlert>
                        }
                        {applicationErrors && applicationErrors.length > 0 ?
                            '' :
                            <Link to={`${match.url}/profile`} className="button">Preview your profile</Link>
                        }
                        {applicationType === 'edit' ?
                            <div styleName="review.skip">
                                <a styleName="review.skip-link"
                                    href="#discard"
                                    onClick={e => {
                                        e.preventDefault();
                                        showConfirmDiscard(true);
                                    }}>Discard all updates</a>
                            </div>
                            : ''}
                    </div>
                </div>
            )} />
            <Route
                exact
                path={`${match.url}/profile`}
                render={(routerProps) => (
                    <ApplicationPreview {...routerProps} {...rest} />
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
        applicationId: (state.application && state.application.id),
        applicationType: (state.application && state.application.type),
        caseStudyForm: state.caseStudyForm,
        applicationErrors: state.application_errors
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        showConfirmDiscard: (show) => {
            return dispatch(showConfirmDiscard(show));
        }
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
