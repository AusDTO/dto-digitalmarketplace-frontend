import React from 'react'
import {connect} from 'react-redux'

import styles from './Code.css'

class Code extends React.Component {

    render() {


        return (
            <div>
                <section styleName="full-header">
                    <div className="row">
                        <div className="col-sm-5 col-sm-push-1">
                            <h1 tabIndex="-1">Common components</h1>
                        </div>
                    </div>
                    <div className="row">
                        <article className="col-sm-5 col-sm-push-1 col-xs-7">

                            <p styleName="summary">An open source library for building Australian Government services</p>

                        </article>
                        <article className="col-md-3 col-md-push-2 col-sm-push-2">

                           picture here
                        </article>

                    </div>

                </section>
                <section >

                    <div className="row">
                        <article role="main" className="col-md-10 col-md-push-1 col-xs-12 col-sm-push-1">

                    <ul styleName="tiles">
                        <li>
                            <article>
                                <h3>
                                    <a rel="external" target="_blank" href="https://github.com/govCMS/govCMS">Appointment booking service</a>
                                </h3>
                                <p>The booking service enables users to book or reschedule an appointment for a citizenship test.<br/><br/>
                                    <a rel="external" target="_blank" href="https://www.govcms.gov.au/">View demo</a></p>
                            </article>
                        </li>
                        <li>
                            <article>
                                <h3>
                                    <a rel="external" target="_blank" href="https://github.com/govCMS/consultation">Bushfire Attack Level Computation Software</a>
                                </h3>
                                <p>An ESRI ArcGIS toolbox to calculate severity of exposure to bushfire attack<br/><br/>
                                    <a rel="external" target="_blank" href="https://geoscienceaustralia.github.io/BAL/docs/userguide/examples.html">View demo</a></p>
                            </article>
                        </li>

                    <li>
                        <article>
                            <h3>
                                <a rel="external" target="_blank" href="https://github.com/govCMS/govCMS">GovCMS</a>
                            </h3>
                            <p>Online content management system built for the new digital government<br/><br/>
                            <a rel="external" target="_blank" href="https://www.govcms.gov.au/">View demo</a></p>
                        </article>
                    </li>
                        <li>
                        <article>
                            <h3>
                                <a rel="external" target="_blank" href="https://github.com/govCMS/govcms-ckan">GovCMS-CKAN</a>
                            </h3>
                            <p>A Drupal module to integrate with CKAN datasources such as data.gov.au<br/><br/>
                                <a rel="external" target="_blank" href="https://soe.environment.gov.au/theme/drivers/topic/economic-activity-driver-environmental-change">View demo</a></p>
                        </article>
                        </li>
                        <li>
                        <article>
                            <h3>
                                <a rel="external" target="_blank" href="https://github.com/govCMS/consultation">GovCMS consultation module</a>
                            </h3>
                            <p>The consultation module was initally built by the Department of Communications and the Arts and contributed back to the govCMS community<br/><br/>
                                <a rel="external" target="_blank" href="https://www.communications.gov.au/have-your-say">View demo</a></p>
                        </article>
                    </li>
                        <li>
                            <article>
                                <h3>
                                    <a rel="external" target="_blank" href="https://github.com/actgov/Mobile-Canberra">Mobile Canberra</a>
                                </h3>
                                <p>A powerful platform for showing points of interest and services on a map for both Android and iOS<br/><br/>
                                    <a rel="external" target="_blank" href="https://github.com/actgov/Mobile-Canberra#mobile-canberra">View demo</a></p>
                            </article>
                        </li>
                        <li>
                            <article>
                                <h3>
                                    <a rel="external" target="_blank" href="https://github.com/govCMS/govCMS">UI-kit</a>
                                </h3>
                                <p>A design guide for building Australian Government services with UI-Kit CSS framework.<br/><br/>
                                    <a rel="external" target="_blank" href="https://www.govcms.gov.au/">View demo</a></p>
                            </article>
                        </li>
                </ul>
                        </article>
                    </div>
                        <div className="row">
                            <article role="main" className="col-sm-8 col-sm-push-2  col-xs-12 col-sm-push-1">
                            <div styleName="fine">The use of brand names or products listed does not imply endorsement by the Digital Marketplace
                                or discrimination against similar products not mentioned. This is listing is provided ‘as is’ and without any express
                                or implied warranties, including, withouth limitation, the implied warranties of merchantability and fitness for a particular purpose.</div>
                    </article>

                    </div>
                </section>
            </div>

        )
    }
}

const mapStateToProps = ({}, ownProps) => {
    return {
        ...ownProps
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Code);
