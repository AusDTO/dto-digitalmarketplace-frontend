import React from 'react'
import {connect} from 'react-redux'

import styles from './Code.css'

class Code extends React.Component {

    render() {


        return (
            <div styleName="code">
                <section styleName="full-header">
                    <div className="row">
                        <div className="col-sm-5 col-md-push-1">
                            <h1 tabIndex="-1">Common components</h1>

                        </div>
                    </div>
                    <div className="row">
                        <article className="col-sm-5 col-md-push-1">
                            <img styleName="illustration" src="/static/media/open_source_illustration.png" alt=""/>
                        </article>
                        <div className="col-md-5 col-md-push-1 col-sm-6 col-sm-push-1">
                        <p styleName="summary">An open source library for building Australian Government
                            services</p>
                            <h3 style={{marginTop: "32px"}}> New to open source projects?</h3>
                            <a href="/contact-us"
                               role="button" style={{marginTop: "8px"}}>Get in touch</a>
                        </div>
                    </div>
                </section>
                <section >
                    <div >
                        <h2 style={{textAlign: "center"}}>Explore code</h2>
                        <p  styleName="code-text">Reduce cost, effort and risk by re-using tried and tested open source
                            projects to deliver digital services.</p>
                    </div>
                    <div className="row">
                        <article role="main" styleName="center">

                            <ul styleName="tiles">
                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank" href="https://github.com/AusDTO/citizenship-appointment-client">Appointment
                                                booking service</a>
                                        </h3>
                                        <p>The booking service enables users to book or reschedule an appointment for a
                                            citizenship test.<br/><br/>
                                            <a rel="external" target="_blank" href="https://citizenship-appointment-beta.herokuapp.com/login">View
                                                demo</a></p>
                                    </article>
                                </li>
                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank"
                                               href="https://github.com/govCMS/consultation">Bushfire Attack Level
                                                Computation Software</a>
                                        </h3>
                                        <p>An ESRI ArcGIS toolbox to calculate severity of exposure to bushfire
                                            attack<br/><br/>
                                            <a rel="external" target="_blank"
                                               href="https://geoscienceaustralia.github.io/BAL/docs/userguide/examples.html">View
                                                demo</a></p>
                                    </article>
                                </li>

                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank" href="https://github.com/govCMS/govCMS">GovCMS</a>
                                        </h3>
                                        <p>Online content management system built for the new digital
                                            government<br/><br/>
                                            <a rel="external" target="_blank" href="https://www.govcms.gov.au/">View
                                                demo</a></p>
                                    </article>
                                </li>
                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank"
                                               href="https://github.com/govCMS/govcms-ckan">GovCMS-CKAN</a>
                                        </h3>
                                        <p>A Drupal module to integrate with CKAN datasources such as
                                            data.gov.au<br/><br/>
                                            <a rel="external" target="_blank"
                                               href="https://soe.environment.gov.au/theme/drivers/topic/economic-activity-driver-environmental-change">View
                                                demo</a></p>
                                    </article>
                                </li>
                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank"
                                               href="https://github.com/govCMS/consultation">GovCMS consultation
                                                module</a>
                                        </h3>
                                        <p>The consultation module was initally built by the Department of
                                            Communications and the Arts and contributed back to the govCMS
                                            community<br/><br/>
                                            <a rel="external" target="_blank"
                                               href="https://www.communications.gov.au/have-your-say">View demo</a></p>
                                    </article>
                                </li>
                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank"
                                               href="https://github.com/actgov/Mobile-Canberra">Mobile Canberra</a>
                                        </h3>
                                        <p>A powerful platform for showing points of interest and services on a map for
                                            both Android and iOS<br/><br/>
                                            <a rel="external" target="_blank"
                                               href="https://github.com/actgov/Mobile-Canberra#mobile-canberra">View
                                                demo</a></p>
                                    </article>
                                </li>
                                <li>
                                    <article>
                                        <h3>
                                            <a rel="external" target="_blank" href="https://github.com/govau/uikit">UI-kit</a>
                                        </h3>
                                        <p>A design guide for building Australian Government services with UI-Kit CSS
                                            framework.<br/><br/>
                                            <a rel="external" target="_blank" href="https://github.com/govau/uikit">View
                                                demo</a></p>
                                    </article>
                                </li>
                            </ul>
                        </article>
                    </div>

                    <div>
                        <article role="main" styleName="center">
                            <h3 style={{textAlign: "center",  fontSize: "24px"}}>Can't find the code you're looking for?</h3>
                            <p style={{textAlign: "center", fontSize: "20px"}}>
                                <a href="/contact-us"
                                   role="button">Ask us a question</a></p>
                        </article>
                    </div>

                    <div className="row">
                        <article role="main" styleName="center">
                            <div styleName="fine">The use of brand names or products listed does not imply endorsement
                                by the Digital Marketplace
                                or discrimination against similar products not mentioned. This is listing is provided
                                ‘as is’ and without any express
                                or implied warranties, including, without limitation, the implied warranties of
                                merchantability and fitness for a particular purpose.
                            </div>
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
