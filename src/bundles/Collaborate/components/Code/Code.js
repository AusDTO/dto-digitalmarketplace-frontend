import React from 'react'
import {connect} from 'react-redux'

import styles from './Code.css'

class Code extends React.Component {

    render() {


        return (

                <main role="main">
                    <header><h1>Common Components</h1></header>
                    <aside className="sidebar" id="nav" style={{float: "left", paddingRight: "30px"}}>
                <nav className="local-nav local-nav-demo" aria-label="main navigation">
                    <h1 className="is-visuallyhidden">Menu</h1>
                    <ul>
                        <li><a href="#a" className="is-active">Current section</a>
                            <ul>
                                <li><a href="#a" className="is-active">Child link (current sub-section)</a>
                                    <ul>
                                        <li><a href="#a">Grandchild link</a></li>
                                        <li><a href="#a" className="is-active">Grandchild link (current page)</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul>
                                <li><a href="#a">Child link</a></li>
                                <li><span className="placeholder-link">Child link (placeholder styling)</span></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                    </aside>
                    <article id="content" className="content-main">
                        <small>The use of brand names or products listed does not imply endorsement by the Digital Marketplace or discrimination against
                            similar products not mentioned. THIS LISTING IS PROVIDED ``AS IS'' AND WITHOUT ANY EXPRESS OR
                            IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
                            WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.</small>
                    <ul className="list-horizontal">
                    <li>
                        <article>
                            <h3>
                                <a href="https://github.com/govCMS/govCMS">govCMS</a>
                            </h3>
                            <p>Online content management system built for the new digital government<br/><br/>
                            <a role="button" href="https://www.govcms.gov.au/">Demo &rsaquo;</a></p>
                        </article>
                    </li>
                        <li>
                        <article>
                            <h3>
                                <a href="https://github.com/govCMS/govcms-ckan">govcms-ckan</a>
                            </h3>
                            <p>A Drupal module to integrate with CKAN datasources such as data.gov.au<br/><br/>
                                <a role="button" href="https://soe.environment.gov.au/theme/drivers/topic/economic-activity-driver-environmental-change">Demo &rsaquo;</a></p>
                        </article>
                        </li>
                        <li>
                        <article>
                            <h3>
                                <a href="https://github.com/govCMS/consultation">govCMS consultation module</a>
                            </h3>
                            <p>The consultation module (also known as "Have Your Say") was initially built by the Department of Communications and the Arts and contributed back to the govCMS community<br/><br/>
                                <a role="button" href="https://www.communications.gov.au/have-your-say">Demo &rsaquo;</a></p>
                        </article>
                    </li>
                        <li>
                            <article>
                                <h3>
                                    <a href="https://github.com/actgov/Mobile-Canberra">Mobile Canberra</a>
                                </h3>
                                <p>A powerful platform for showing points of interest and services on a map for both Android and iOS<br/><br/>
                                    <a role="button" href="https://github.com/actgov/Mobile-Canberra#mobile-canberra">Demo &rsaquo;</a></p>
                            </article>
                        </li>
                        <li>
                            <article>
                                <h3>
                                    <a href="https://github.com/govCMS/consultation">Bushfire Attack Level Computation Software</a>
                                </h3>
                                <p>An ESRI ArcGIS toolbox to calculate severity of exposure to bushfire attack<br/><br/>
                                    <a role="button" href="https://geoscienceaustralia.github.io/BAL/docs/userguide/examples.html">Demo &rsaquo;</a></p>
                            </article>
                        </li>
                </ul>
                    </article>

                </main>

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
