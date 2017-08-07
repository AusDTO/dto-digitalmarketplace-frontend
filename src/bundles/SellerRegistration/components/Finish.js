import React from 'react';
import PropTypes from 'prop-types'

const Finish = ({onClick}) => (
    <div>
        <h1 tabIndex="-1">That is it for now!</h1>
        <p>
            We are just putting the finishing touches on our improved Terms of Service and Marketplace Master
            Agreement.</p>
        <p> Once they are ready, we will contact you for your agreement. Then we can put your updated seller profile
            live.</p>
        <a href="/digital-service-professionals/opportunities">View latest opportunities</a>
    </div>
);

Finish.defaultProps = {
    onClick: () => {
    },
}

Finish.propTypes = {
    onClick: PropTypes.func
};

export default Finish;