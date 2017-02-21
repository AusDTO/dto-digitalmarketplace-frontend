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
                    To become a registered seller and offer your services or software products to government you need to
                    tell us about your business. </p>
                <p> The information you share will be used to create your seller profile. If you offer services it will also be used to confirm you meet the <a
                        href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a> when when you express interest in opportunities.</p>
                <p> It may take more than one visit to complete this application. But don’t worry, your information will
                    be saved automatically if
                    you need to come back later.
                </p>
                <h2>You'll need</h2>
                <ul>
                    <li>Your basic business information</li>
                    <li>Recent financial records or a viability statement from your accountant</li>
                    <li>Proof of relevant insurance cover</li>
                </ul>
                <h2>You'll be asked to</h2>
                <ul>
                    <li>Share details about services or products you wish to provide</li>
                    <li> Provide case studies and referees to support your application</li>
                    <li>Accept the Digital Marketplace Master Agreement<br/>
                        <a href="agreement.pdf">Download Digital Marketplace Master Agreement PDF</a></li>
                </ul>
                The terms and conditions for this application are available in our <a href="http://tenders.gov.au">open invitation to join the Digital Marketplace</a>.
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
    supplierCode: React.PropTypes.number,
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