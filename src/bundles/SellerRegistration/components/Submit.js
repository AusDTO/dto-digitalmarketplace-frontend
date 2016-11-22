import React from 'react';
import {connect} from 'react-redux';

const Submit = ({submitUrl, applicationValid, onClick}) => (
    <div>
        <h1>I declare that:</h1>
        <ol>
            <li>To the best of my knowledge the answers submitted are correct.</li>
            <li>I understand that the information will be used to access my organisations ability to be invited to join
                the Digital Service Panel.
            </li>
            <li>I understand that the DTO may reject this application if there is a failure to answer all relevant
                questions fully or provide false or misleading information.
            </li>
            <li>There are no petitions, claims, actions, judgements or decisions which may adversly affect the companies
                performance.
            </li>
        </ol>
        <p>
            {applicationValid 
                ? <a role="button" href={submitUrl}>Submit Application</a>
                : <button disabled="disabled">Submit Application</button>
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
    applicationValid: React.PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    return {
        submitUrl: state.form_options.submit_url,
        applicationValid: ownProps.applicationValid
    }
}

export {
    mapStateToProps
}

export default connect(mapStateToProps)(Submit);