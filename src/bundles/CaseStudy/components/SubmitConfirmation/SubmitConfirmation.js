import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import format from 'date-fns/format';

import './SubmitConfirmation.css'

class SubmitConfirmation extends React.Component {

    render() {
        const {
            briefLot,
            closingDate,
            previewUrl,
            profileUrl,
            initial,        // arrives via brief response check that found no casestudies
            inReview,       // supplier arrives after initiating a casestudy assessment
            isRecruiter,
            created         // if an assessment has been created
        } = this.props;

        // domain will be undefined for training briefs because they don't have an area of expertise
        const domain = briefLot == 'training' ? 'Training, Learning and Development' : this.props.domain

        return (
            <section>
                {((inReview || !initial) &&
                    <span>
                        <h1 className="au-display-xl">
                            <span styleName="callout-heading">You have been prioritised for assessment</span>
                        </h1>
                        <p>
                            Before you can respond to this brief we need to assess your expertise in {domain}.
                        </p>

                        <p>
                            You’ll be able to apply if we can confirm your expertise before the opportunity closes on
                            <b> {format(new Date(closingDate), 'Do MMMM YYYY')}</b>.
                        </p>

                        {!['rfx', 'training2', 'atm'].includes(briefLot) && (
                            <React.Fragment>
                                <p>While you wait, you can prepare your response by downloading the template.</p>
                                <p styleName="footer-link">
                                    {briefLot == 'training' ? (
                                        <a class="au-btn" href="/static/media/documents/Training_opportunities_questions_for_sellers.docx" download>
                                            Download response template (DOCX)
                                        </a>
                                    ) : (
                                        <a class="au-btn" href={previewUrl} download>
                                            Download response template (XLSX)
                                        </a>
                                    )}
                                </p>
                            </React.Fragment>
                        )}
                    </span>
                )}
                {(initial &&
                    <span>
                        <h1 className="au-display-xl">
                            <span styleName="callout-heading">Have you got experience in {domain}?</span>
                        </h1>

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
                            <a href={profileUrl} className="button">
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
