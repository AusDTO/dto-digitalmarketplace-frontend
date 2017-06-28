import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import startCase from 'lodash/startCase';
import Icon from '../../../../shared/Icon';
import isEmpty from 'lodash/isEmpty'

import './SubmitConfirmation.css'

class SubmitConfirmation extends React.Component {

    render() {
        const {
            opportunityUrl,
            domain,
            closingDate,
            briefTitle,
            briefLot,
            previewUrl,
            profileUrl,
            initial,        // arrives via brief response check that found no casestudies
            inReview,       // supplier arrives after initiating a casestudy assessment
            isRecruiter,
            created         // if an assessment has been created
        } = this.props;

        return (
            <section>
                {((inReview || !initial) &&
                    <span>
                        <h1>
                            <span styleName="callout-heading">You have been prioritised for assessment</span>
                        </h1>

                        <span styleName="assessment-progress-wrapper">
                            <span styleName="assessment-progress-item">
                                <img src="/static/media/completed.svg" alt="Domain Selected" width="32" />
                                <div styleName="status-connector-line-complete"></div>
                                <p>Completed</p>
                                <p>Demonstrate your experience in your seller profile</p>
                            </span>
                            <span styleName="assessment-progress-item">
                                <img src="/static/media/in-progress.svg" alt="Domain Assessment" width="32" />
                                <div styleName="status-connector-line-progress"></div>
                                <p>To do</p>
                                <p><b>We're assessing your expertise</b></p>
                            </span>
                            <span styleName="assessment-progress-item">
                                <img src="/static/media/to-do.svg" alt="Domain Assessment" width="32" />
                                <p>Up next</p>
                                <p>You're ready to respond to briefs</p>
                            </span>
                        </span>

                        <p>We are reviewing your profile and expertise,
                            and will let you know soon if you're approved to offer {domain} on the Digital Marketplace.
                        </p>
                        
                        <p>If we can confirm your expertise before the opportunity closes on
                            <b> {format(new Date(closingDate), 'Do MMMM YYYY')}</b>, you’ll be invited to apply.
                        </p>
                        
                        <p>While you wait you can prepare your response
                            using our Google sheets template.
                        </p>

                        <p styleName="footer-link">
                            <a href={previewUrl} download>
                                Download brief response template</a>
                        </p>
                    </span>
                )}
                {(initial &&
                    <span>
                        <h1>
                            <span styleName="callout-heading">Have you got experience in {domain}?</span>
                        </h1>

                        <span styleName="assessment-progress-wrapper">
                            <span styleName="assessment-progress-item">
                                <img src="/static/media/in-progress.svg" alt="Domain Selected" width="32"/>
                                <div styleName="status-connector-line-progress"></div>
                                <p>To do</p>
                                <p><b>Demonstrate your experience in your seller profile</b></p>
                            </span>
                            <span styleName="assessment-progress-item">
                                <img src="/static/media/to-do.svg" alt="Domain Assessment" width="32"/>
                                <div styleName="status-connector-line-progress"></div>
                                <p>Up next</p>
                                <p>We're assessing your expertise</p>
                            </span>
                            <span styleName="assessment-progress-item">
                                <img src="/static/media/to-do.svg" alt="Domain Assessment" width="32"/>
                                <p>Up next</p>
                                <p>You're ready to respond to briefs</p>
                            </span>
                        </span>

                        {(
                            created && <p>We are reviewing your profile and expertise,
                            and will let you know soon if you're approved to offer {domain} on the Digital Marketplace.</p>
                        )}
                        
                        <p>
                            If we can confirm your expertise before the opportunity closes on
                            <b> {format(new Date(closingDate), 'Do MMMM YYYY')}</b>, you’ll be invited to apply.
                        </p>
                    
                        {(
                            !isRecruiter && <p>While you wait you can prepare your response
                             using our Google sheets template.</p>
                        )}
                        {(
                            isRecruiter && <p>If you're successful but the opportunity has
                            closed, you won't need to be reassessed for {domain} opportunties in future.</p>
                        )}
                        <p styleName="footer-link">
                            <a href={profileUrl} role="button">
                                Edit your profile</a>
                        </p>
                    </span>
                )}
            </section>
        )
    }
}

SubmitConfirmation.propTypes = {
    opportunityUrl: PropTypes.string.isRequired,
    domain: PropTypes.string,
    closingDate: PropTypes.string.isRequired,
    briefTitle: PropTypes.string,
    briefLot: PropTypes.string,
    previewUrl: PropTypes.string,
    profileUrl: PropTypes.string,
    unassessedDomains: PropTypes.object,
    assessedDomains: PropTypes.object,
    created: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.form_options,
        ...ownProps
    }
}

export default connect(mapStateToProps)(SubmitConfirmation)
