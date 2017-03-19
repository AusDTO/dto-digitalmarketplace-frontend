import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class SubmitConfirmation extends React.Component {


    render() {
        const {
            opportunityUrl,
            domain
        } = this.props;

        return (
            <section>
                <h1> Thanks for your case study</h1>

                Your assessment is underway<br/>

                We will check that it meets our <a href="/assessment-criteria">assessment criteria</a> as soon as
                possible.<br/>

                If we can confirm your expertise before the opportunity closes, you’ll be invited to apply.<br/>

                If you’re successful but the opportunity has closed,
                you won’t need to be reassessed for { domain } opportunities in
                future.<br/>
                <p>
                    If your case study doesn’t meet our assessment criteria we will give you feedback.
                    You can then update your information for reassessment, which will commence when you next express
                    interest in a
                    similar opportunity.
                </p>
                <a href={opportunityUrl}> Return to opportunities </a>
            </section>
        )
    }
}

SubmitConfirmation.propTypes = {
    opportunityUrl: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.form_options,
        ...ownProps
    }
}

export default connect(mapStateToProps)(SubmitConfirmation)
