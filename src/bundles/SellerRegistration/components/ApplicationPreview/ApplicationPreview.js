import React from 'react';

const ApplicationPreview = ({application}) => (
    <div>
        <h1>{application.name}</h1>
        <p> {application.summary}</p>
        <hr/>
        <ul className="list-horizontal">
            {application.services &&
            <li>
                <p>Services</p>
                <article>
                    <footer className="tags">
                        <dl className="visually-hidden">
                            <dt>Capabilities</dt>
                        </dl>
                        {Object.keys(application.services).map((key, val) =>
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
                <article>
                    <p>
                        <strong>ABN</strong><br/>
                        { application.abn }
                    </p>

                    {application.website &&
                    <p>
                        <strong>Website</strong><br/>
                        <a href={application.website} target="_blank" rel="external">{ application.website }</a>
                    </p>
                    }

                    {application.linkedin &&
                    <p>
                        <strong>LinkedIn</strong><br/>
                        <a href={application.linkedin} target="_blank" rel="external">{ application.linkedin }</a>
                    </p>
                    }
                </article>
            </li>
            <li>
                <p>Address</p>
                <article>
                    <p>
                        { application.address.addressLine }<br/>
                        { application.address.suburb }<br/>
                        { application.address.state } { application.address.postalCode }
                    </p>
                </article>
            </li>
            {application.pricing &&
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
                        {Object.keys(application.pricing).map((key, val) =>
                            <tr key={val}>
                                <th scope="row">{key}</th>
                                <td>{application.pricing[key].minPrice } - {application.pricing[key].maxPrice}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </article>
            </li>
            }
        </ul>
    </div>
);


export default ApplicationPreview;