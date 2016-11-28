import React from 'react';
import {connect} from 'react-redux';
import ApplicationPreview from './ApplicationPreview/ApplicationPreview'
import {flattenStateForms} from '../redux/helpers.js'

const Review = ({submit, onClick, data}) => (
    <div>
        <div className="callout--calendar-event">
            <h3>Review your profile</h3>
            <p> Buyers will see your business information as a profile, previewed below.
                If the information is correct, continue to the final step to submit your application.
            </p>

        </div>
        <ApplicationPreview application={data}/>
        <p>
            <a role="button" href={submit} onClick={onClick}>Save & Continue</a>
        </p>
    </div>
);

Review.defaultProps = {
    onClick: () => {
    },
    submit: '#'
}

Review.propTypes = {
    submit: React.PropTypes.string,
    onClick: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        data: flattenStateForms(state)
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Review);