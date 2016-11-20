import React from 'react';
import {connect} from 'react-redux';
import {flattenStateForms} from '../../ApplicantSignup/redux/helpers.js'

const Review = ({submit, deed, onClick, data}) => (
    <div>
        <div className="callout--calendar-event">
            <h3>Review your profile</h3>
            <p> Buyers will see your company information as a profile, previewed below.
                If the information is correct, continue to the final step to submit your application.
            </p>

        </div>
        <h1>{data.name}</h1>
        <p>{data.summary}</p>
        <hr/>
        <ul className="list-horizontal">
            <li>
                <p>Company Details</p>
                <figure></figure>
                <article>
                    <p>
                        <strong>ABN</strong><br/>
                        { data.abn }
                    </p>

                    {data.website ?
                    <p>
                        <strong>Website</strong><br/>
                        <a href={data.website} target="_blank" rel="external">{ data.website }</a>
                    </p>: null}

                    {data.linkedin ?
                    <p>
                        <strong>LinkedIn</strong><br/>
                        <a href={data.linkedin} target="_blank" rel="external">{ data.linkedin }</a>
                    </p>: null}
                </article>
            </li>
            <li>
                <p>Address</p>
                <figure></figure>
                <article>
                    <p>
                        { data.address.addressLine }<br/>
                        { data.address.suburb }<br/>
                        { data.address.state } { data.address.postalCode }
                    </p>
                </article>
            </li>
        </ul>
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