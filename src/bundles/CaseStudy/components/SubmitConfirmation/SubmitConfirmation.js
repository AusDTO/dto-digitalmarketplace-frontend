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
            previewUrl,
            profileUrl,
            unassessedDomains,
            assessedDomains
        } = this.props;

        let hasUnassessed = !isEmpty(unassessedDomains) && Object
            .keys(unassessedDomains)
            .length > 0;
        
        let hasAssessed = !isEmpty(assessedDomains) && assessedDomains;

        return (
            <section>
                {((hasUnassessed || domain) &&
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
                        and will let you know soon if you're approved to be part of the Digital Marketplace.</p>
                        
                        <p>If we can confirm your expertise before the opportunity closes on
                            <b> {format(new Date(closingDate), 'Do MMMM YYYY')}</b>, you’ll be invited to apply.</p>
                    
                        <p>While you wait you can prepare your response
                        to {briefTitle} using our Google sheets template.</p>
                        <p styleName="footer-link">
                            <a href={previewUrl} download>
                                Download brief response template</a>
                        </p>
                    </span>
                )}
                
                {((!hasUnassessed && !hasAssessed) &&
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

                        <p>Before you can apply for this opportunity you need to provide a case
                        study and reference that meets our assessment criteria for {domain}.</p>
                        
                        <p>If we can confirm your expertise before the opportunity closes we will invite you to apply.</p>
                    
                        <p>If successful you can apply for {domain} opportunities in future
                        without the need for further assessment.</p>
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
    previewUrl: PropTypes.string,
    profileUrl: PropTypes.string,
    unassessedDomains: PropTypes.object,
    assessedDomains: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.form_options,
        ...ownProps
    }
}

export default connect(mapStateToProps)(SubmitConfirmation)
