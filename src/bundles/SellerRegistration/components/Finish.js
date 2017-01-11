import React from 'react';

const Finish = ({onClick}) => (
    <div>
        <h1 tabIndex="-1">That’s it for now!</h1>
        <p>
            We’re just putting the finishing touches on our improved Terms of Service and Marketplace Master
            Agreement.</p>
        <p> Once they’re ready, we’ll contact you for your agreement. Then we can put your updated seller profile
            live.</p>
        <a href="/digital-service-professionals/opportunities">View latest opportunities</a>
    </div>
);

Finish.defaultProps = {
    onClick: () => {
    },
}

Finish.propTypes = {
    onClick: React.PropTypes.func
};

export default Finish;