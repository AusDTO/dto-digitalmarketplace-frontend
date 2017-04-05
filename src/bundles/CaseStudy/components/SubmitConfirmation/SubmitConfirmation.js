import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import startCase from 'lodash/startCase';
import Icon from '../../../../shared/Icon';

import './SubmitConfirmation.css'

class SubmitConfirmation extends React.Component {

    render() {
        const {
            opportunityUrl,
            domain,
            closingDate
        } = this.props;

        return (
            <section>
                <h1><Icon value="complete-tick" size={30}/><span styleName="callout-heading">Your assessment is underway</span></h1>
                <p>We will check that it meets our <a href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a> as soon as
                possible.</p>
                <h3>What happens next?</h3>
                <p>If we can confirm your expertise before the opportunity closes on <b>{format(new Date(closingDate), 'Do MMMM YYYY')}</b>, you’ll be invited to apply.</p>
                <p>If you’re successful but the opportunity has closed, you won’t need to be reassessed for {startCase(domain)} opportunities in future.</p>
                <p>If your case study doesn’t meet our assessment criteria we will give you feedback.</p>
                <p styleName="footer-link"><a href={opportunityUrl}> Return to opportunities</a></p>
            </section>
        )
    }
}

SubmitConfirmation.propTypes = {
    opportunityUrl: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    closingDate: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.form_options,
        ...ownProps
    }
}

export default connect(mapStateToProps)(SubmitConfirmation)
