import React from 'react';
import {connect} from 'react-redux';

const Start = ({supplierCode, signup, onClick}) => {
    if (supplierCode) {
        return (
            <div>
                <h1>Do more in the Digital Marketplace</h1>
                <p>With our latest release you can now offer more services, add more content and products to showcase
                    your expertise to buyers.</p>
                <p>To offer new services you’ll need to add case studies and references to confirm you meet <a
                    href="/assessment-criteria" target="_blank" rel="external">our standard</a>.</p>
                <p>It will take around 30 minutes — or more if you need to write new case studies.</p>
                <p>Don’t worry, your information will be saved automatically as you go.</p>
                <h2>You'll need</h2>
                <li> Your basic business information</li>
                <li> A financial viability statement from your accountant</li>
                <li> Current worker’s compensation and public liability insurance documents</li>
                <li> Case studies and references</li>
                <li> To accept the new Marketplace Master Agreement.</li>
                <p>
                    <a role="button" href={signup} onClick={onClick}>Start Now </a>
                </p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Joining the Digital Marketplace</h1>
                <p>
                    To become a registered seller you need to tell us about your business.</p>
                <p> The information you share will be used to create your seller profile, and later to confirm you meet
                    the <a
                        href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a> to apply for
                    opportunities.</p>
                <p> It will take at least 30 minutes. But don’t worry, your information will be saved automatically if
                    you need to come back later.
                </p>
                <h2>You'll need:</h2>
                <ul>
                    <li>Your basic business information</li>
                    <li>A financial viability statement from your accountant</li>
                    <li>Proof of worker’s compensation and public liability insurance</li>
                </ul>
                <h2>You'll be asked to:</h2>
                <ul>
                    <li>Create case studies about past projects and references</li>
                    <li>Accept the Marketplace Master Agreement</li>
                </ul>
                <p>
                    <a role="button" href={signup} onClick={onClick}>Start now </a>
                </p>
            </div>
        )
    }
}

Start.defaultProps = {
    onClick: () => {
    },
    signup: '#'
}

Start.propTypes = {
    signup: React.PropTypes.string,
    supplierCode: React.PropTypes.string,
    onClick: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        onClick: ownProps.onClick,
        signup: ownProps.signup,
        supplierCode: state.application.supplierCode,
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Start);