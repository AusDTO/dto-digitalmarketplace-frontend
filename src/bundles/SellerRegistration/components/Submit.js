import React from 'react';
import {connect} from 'react-redux';

const Submit = ({submitUrl, applicationValid, onClick, name}) => (
    <div>
        <h1 tabIndex="-1">Almost there...</h1>
        <h2>Your declaration</h2>
        <p>I am an authorised representative of <strong>{name}</strong></p>
        <p>There are no petitions, claims, actions, judgements or decisions which may adversely affect 
            my organisation’s performance.
        </p>
        <p> To the best of my knowledge this information is true and correct.
        </p>
        <p>I understand this application can be rejected for incomplete, false or misleading information.
        </p>
        <p>
            {applicationValid 
                ? <a role="button" href={submitUrl}>Submit your application</a>
                : <button disabled="disabled">Submit your application</button>
            }
        </p>
    </div>
);

Submit.defaultProps = {
    onClick: () => {},
    submitUrl: '#'
}

Submit.propTypes = {
    submitUrl: React.PropTypes.string,
    onClick: React.PropTypes.func,
    applicationValid: React.PropTypes.bool,
    name: React.PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        submitUrl: state.form_options.submit_url,
        applicationValid: ownProps.applicationValid,
        name: ownProps.name
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Submit);