import React from 'react';
import {connect} from 'react-redux';

const Start = ({supplierCode, signup, onClick}) => {
    if (supplierCode) {
        return (
            <div>
                <h1>Get ready for tomorrow’s Marketplace</h1>
                <p>
                    In 2017, we’ll be giving you the opportunity to offer lots more services, digital products and
                    showcase your expertise in a streamlined environment.
                </p><p>
                You can begin adding more to your seller profile in anticipation of these changes now. It doesn’t matter
                if you don’t complete all your profile updates in one session, we’ll save as you go.
            </p>
                <p>
                    <a role="button" href={signup} onClick={onClick}>Start Now </a>
                </p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Joining the Marketplace</h1>
                <p>
                    Sign up to the Digital Marketplace so buyers can find your business and you can apply for new
                    opportunities.
                </p>
                <p>
                    It takes around 30 minutes to complete and your information is saved automatically. 24 hours later,
                    your profile will be visible to government buyers.
                </p>
                <h2>You'll need:</h2>
                <ul>
                    <li>Your basic business information, for example</li>
                    <li>A financial viability statement from your accountant</li>
                    <li>Proof of worker’s compensation and public liability insurance</li>
                </ul>
                <h2>You'll be asked to provide:</h2>
                <ul>
                    <li>Proof of successful projects and past client contact details that will be assessed against <a
                        href="/assessment-criteria" target="_blank" rel="external">evaluation criteria</a></li>
                </ul>
                <p>
                    <a role="button" href={signup} onClick={onClick}>Start Now </a>
                </p>
                All activity on the Digital Marketplace is subject to our <a href="/terms-of-use">Terms of Use.</a>
            </div>
        )
    }
}

Start.defaultProps = {
    onClick: () => {
    },
    signup: '#',
    supplierCode: '1'
}

Start.propTypes = {
    signup: React.PropTypes.string,
    supplierCode: React.PropTypes.string,
    onClick: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return ownProps
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Start);