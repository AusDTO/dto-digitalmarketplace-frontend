import React from 'react';
import {connect} from 'react-redux';
import {flattenStateForms} from '../../ApplicantSignup/redux/helpers.js'

const Review = ({submit, deed, onClick, data}) => (
    <div>
        <div className="callout--calendar-event">
            <h3>Review your profile</h3>
            <p> Buyers will see your business information as a profile, previewed below.
                If the information is correct, continue to the final step to submit your application.
            </p>

        </div>
        <h1>{data.name}</h1>
        <p>{data.summary}</p>
        <hr/>
        <ul className="list-horizontal">
            {data.services &&
                <li>
                    <p>Seller capabilities</p>
                    <article>
                        <footer className="tags">
                            <dl className="visually-hidden">
                                <dt>Capabilities</dt>
                            </dl>
                            {Object.keys(data.services).map((key, val) =>
                                <dd key={val}>
                                    <a className="disabled">{key}</a>
                                </dd>
                            )}
                        </footer>
                    </article>
                </li>
            }
            <li>
                <p>Business Details</p>
                <figure></figure>
                <article>
                    <p>
                        <strong>ABN</strong><br/>
                        { data.abn }
                    </p>

                    {data.website &&
                        <p>
                            <strong>Website</strong><br/>
                            <a href={data.website} target="_blank" rel="external">{ data.website }</a>
                        </p>
                    }

                    {data.linkedin &&
                        <p>
                            <strong>LinkedIn</strong><br/>
                            <a href={data.linkedin} target="_blank" rel="external">{ data.linkedin }</a>
                        </p>
                    }
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
            {data.pricing &&
                <li>
                    <p>Rate card</p>

                    <article>
                        <table className="content-table">
                            <thead>
                            <tr>
                                <th scope="col">Roles</th>
                                <th scope="col">Day rates</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(data.pricing).map((key, val) =>
                                <tr key={val}>
                                    <th scope="row">{key}</th>
                                    <td>{data.pricing[key].minPrice } - {data.pricing[key].maxPrice}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </article>
                </li>
            }
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