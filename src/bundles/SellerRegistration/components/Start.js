import React from 'react';
import {connect} from 'react-redux';
import Icon     from '../../../shared/Icon';

import './Start.css';

const Start = ({supplierCode, signup, onClick, saved}) => {
    return (
        <div>
            {saved && 
                <div className="callout--info">
                    <Icon value="complete-tick" size={20}/><span styleName="callout-heading">Your progress has been saved</span>
                    <p>Click 'continue application' in the header above when you're ready to go on.</p>
                </div>
            }
            {supplierCode &&
                <div>
                    <h1>Do more in the Digital Marketplace</h1>
                    <p>With our latest release you can now offer more services, add more content and products to showcase
                        your expertise to buyers. To make the most of these new features you will need to update your seller
                        profile. </p>
                    <p>By completing this application you are automatically responding to an open approach to market, whose terms and
                        conditions, like other government tenders, are <a href="http://tenders.gov.au" target="_blank" rel="external">publicly available</a>.</p>
                    <p>We recommend adding case studies for services you are already approved to offer. For additional
                        services you will need to provide case studies and referees to confirm you meet our <a
                            href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a>.</p>
                    <p>It may take more than one visit to complete your profile update. But do not worry, your information
                        will be saved as you go.</p>
                    <h2>You will need</h2>
                    <li> Recent financial records or a viability statement from your accountant</li>
                    <li> Proof of current insurance cover</li>
                    <h2>You will be asked to</h2>
                    <ul>
                        <li>Share details about services or products you wish to provide</li>
                        <li> Provide case studies and referees to support your application</li>
                        <li>Accept the Digital Marketplace Master Agreement</li>
                    </ul>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.pdf" target="_blank" rel="external">Download Digital Marketplace Master Agreement PDF</a><br/><br/>
                    <p>
                        <a role="button" href={signup} onClick={onClick}>Start Now </a>
                    </p>
                </div>    
            }
            {!supplierCode &&
                <div>
                    <h1>Joining the Digital Marketplace</h1>
                    <p>
                        To become a registered seller and offer your services or software products to government you need to
                        tell us about your business. </p>
                    <p>By completing this application you are automatically responding to an open approach to market, whose terms and
                        conditions, like other government tenders, are <a href="http://tenders.gov.au" target="_blank" rel="external">publicly available.</a></p>
                    <p> The information you share will be used to create your seller profile. If you offer services it will
                        also be used to confirm you meet the <a
                            href="/assessment-criteria" target="_blank" rel="external">assessment criteria</a> when you
                        express interest in opportunities.</p>
                    <p> It may take more than one visit to complete this application. But do not worry, your information will
                        be saved automatically if
                        you need to come back later.
                    </p>
                    <h2>You will need</h2>
                    <ul>
                        <li>Your basic business information</li>
                        <li>Recent financial records or a viability statement from your accountant</li>
                        <li>Proof of relevant insurance cover</li>
                    </ul>
                    <h2>You will be asked to</h2>
                    <ul>
                        <li>Share details about services or products you wish to provide</li>
                        <li> Provide case studies and referees to support your application</li>
                        <li>Accept the Digital Marketplace Master Agreement</li>
                    </ul>
                    <a href="/static/media/documents/digital-marketplace-master-agreement.pdf" target="_blank" rel="external">Download Digital Marketplace Master Agreement PDF</a><br/><br/>
                    <p>
                        <a role="button" href={signup} onClick={onClick}>Start now </a>
                    </p>
                </div>
            }
        </div>
    )
}

Start.defaultProps = {
    onClick: () => {
    },
    signup: '#'
}

Start.propTypes = {
    signup: React.PropTypes.string,
    supplierCode: React.PropTypes.number,
    onClick: React.PropTypes.func,
    saved: React.PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        onClick: ownProps.onClick,
        signup: ownProps.signup,
        supplierCode: state.application.supplierCode,
        saved: state.application.saved
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Start);
