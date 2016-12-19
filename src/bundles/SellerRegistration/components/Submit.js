import React from 'react';
import {connect} from 'react-redux';

const Submit = ({submitUrl, applicationValid, onClick, name, userEmail, authoriseUrl, email}) => {
    let message;
    const userIsAuthorised = userEmail === email;
    const buttonText = userIsAuthorised ? 'Submit your application' : 'Send email to representative'; 
    const action = userIsAuthorised ? submitUrl : authoriseUrl;
    if (userIsAuthorised) {
        message = (
            <div>
                <p>I am the authorised representative of <strong>{name}</strong></p>
                <p>There are no petitions, claims, actions, judgements or decisions which may adversely affect 
                    my organisation’s performance.
                </p>
                <p> To the best of my knowledge this information is true and correct.
                </p>
                <p>I understand this application can be rejected for incomplete, false or misleading information.
                </p>
            </div>
        )
    }
    else {
        message = (
            <div>
                <p>You are not the authorised representative of <strong>{name}</strong></p>
                <p>A link will be sent to <strong>{email}</strong> to authorise these changes.</p>
            </div>
        )
    }
    return (
        <div>
            <h1 tabIndex="-1">Almost there...</h1>
            <h2>Your declaration</h2>
            { message }
            <form action={action} method="post">
                {applicationValid 
                    ? <button type="submit">{buttonText}</button>
                    : <button disabled="disabled">{buttonText}</button>
                }
            </form>
        </div>
    )
}

Submit.defaultProps = {
    onClick: () => {},
    submitUrl: '#',
    authoriseUrl: '#'
}

Submit.propTypes = {
    submitUrl: React.PropTypes.string,
    authoriseUrl: React.PropTypes.string,
    onClick: React.PropTypes.func,
    applicationValid: React.PropTypes.bool,
    name: React.PropTypes.string,
    email: React.PropTypes.string,
    userEmail: React.PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        submitUrl: state.form_options.submit_url,
        authoriseUrl: state.form_options.authorise_url,
        applicationValid: ownProps.applicationValid,
        name: ownProps.name,
        email: ownProps.email,
        userEmail: state.form_options.user_email
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Submit);