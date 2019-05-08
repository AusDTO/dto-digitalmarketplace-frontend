import React, { Component } from 'react';
import PropTypes from 'prop-types'
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

class Review extends Component {
    constructor(props) {
      super(props)  
    }

    componentDidUpdate = () => {
        if (this.props.confirmDiscard) {
            window.scrollTo(0, this.discardConfirmRef.offsetTop)
            this.doNotDiscardRef.focus()
        }
    }

    render() {
        const {
            supplierCode,
            match,
            caseStudyForm,
            applicationErrors,
            applicationId,
            applicationType,
            confirmDiscard,
            showConfirmDiscard
        } = this.props
    
       return <Switch>
            <Route path={match.url} exact render={() => (
                <div id="preview-link" styleName="styles.content">
                    <h1 className="au-display-xl" styleName="review.preview-heading" tabIndex="-1">Preview and submit</h1>
                    {confirmDiscard &&
                        <PageAlert as='warning'>
                            <h4 tabIndex="-1" ref={ref => { this.discardConfirmRef = ref }}>Are you sure you want to discard all updates?</h4>
                            <a href={`/sellers/application/${applicationId}/discard`} className="button">Yes, discard all updates</a>
                            <a styleName="review.skip-link"
                                href="#discard-cancel"
                                ref={ref => { this.doNotDiscardRef = ref }}
                                onClick={e => {
                                    e.preventDefault();
                                    showConfirmDiscard(false);
                                }}>Do not discard updates</a>
                        </PageAlert>
                    }
                    { applicationErrors && applicationErrors.length == 0 &&
                    (supplierCode ? (<div styleName="review.blurb">
                            <p>To submit your updates for review, select 'Preview and submit updates' then select 'Submit updates'.</p>
                            <p>The preview page will only show details visible to registered government buyers.</p>
                            <p>If you did not make any changes, or you don't want to keep your saved updates, select 'Discard all updates'.</p>
                        </div>)
                        : (<span><p>Take a moment to preview your new seller profile. This is what government buyers (and assessors, if you are offering new services) will see in the Digital Marketplace.</p></span>))
                    }
                    <ValidationSummary applicationErrors={applicationErrors} renderLink={true} title={'There is a problem to fix before you can submit'} />
                    <div>
                        {applicationErrors && applicationErrors.length > 0 ?
                            '' :
                            <Link to={`${match.url}/profile`} className="button">Preview and submit updates</Link>
                        }
                        {applicationType === 'edit' && !confirmDiscard ?
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
                    <ApplicationPreview {...routerProps} {...this.props} />
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
    
        }

    }

Review.propTypes = {
    supplierCode: PropTypes.number,
    applicationId: PropTypes.number.isRequired,
    applicationType: PropTypes.string,
    caseStudyForm: PropTypes.object,
    applicationErrors: PropTypes.array
}
          

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
