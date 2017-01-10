import React from 'react';

const FinishProfile = ({onClick}) => (
    <div>
        <h1>Profile changes saved!</h1>

        <a href="/sellers">Back to dashboard</a>
    </div>
);

FinishProfile.defaultProps = {
    onClick: () => {
    },
}

FinishProfile.propTypes = {
    onClick: React.PropTypes.func
};

export default FinishProfile;