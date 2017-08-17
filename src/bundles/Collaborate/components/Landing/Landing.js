import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import styles from './Landing.css'

class Landing extends React.Component {
    static defaultProps = {
        seller_count: 466
    }

    static propTypes = {
        seller_count: PropTypes.number
    };
    render() {
        let {seller_count} = this.props;

        let domains =
            {
                "User research and Design": 124,
                "Strategy and Policy": 151,
                "Agile delivery and Governance": 134,
                "Software engineering and Development": 152,
                "Change, Training and Transformation": 109,
                "Marketing, Communications and Engagement": 91,
                "Cyber security": 84,
                "Data science": 100,
                "Emerging technologies": 99
            };
        let maxDomain = 152;
        return (
            <div className="landing">

                <h1 styleName="styles.title" style={{textAlign: "center"}}>Smart cities</h1>
                <p styleName="styles.uikit-display-3">Connect and collaborate to improve the liveability,
                    productivity and sustainability of Australian communities.</p>


                <div styleName="styles.map">
                    <img src="/static/media/map.png" alt="Map of councils and Marketplace sellers across Australia"/>

                    <div styleName="styles.mapOverlay">
                        <span>
                           <strong styleName="styles.pop" >106</strong> <div style={{display: "inline-block"}}> Future Ready
                                councils</div>
                            <br/>
                            <strong styleName="styles.pop" style={{color: '#870f48'}}>{seller_count}</strong> <article style={{display: "inline"}}>
                            <a href="/search/sellers">Marketplace sellers</a></article>
                        </span>
                        <br/><br/>
                        <div>
                            <p style={{marginBottom: "0px"}}>Got an idea, pilot or<br/> live project to share?</p>
                            <a href="/collaborate/project/new" role="button">Add your project</a><br/>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 style={{textAlign: "center"}}>Council collaboration</h2>
                    <p style={{textAlign: "center"}}>Connect and learn from councils building smart communities<br/>
                        and digital services in user-centred, data informed ways.</p>
                    <ul styleName="styles.cardList">
                        <li>
                            <figure>
                                <img src="/static/media/5d_data_modelling.jpg"
                                     alt="Computer model of suburban street" width="260"/>
                            </figure>
                            <article style={{padding: "10px"}}>
                                <h3>
                                    <a href="/collaborate/project/6">5D Data Modelling</a>
                                </h3>
                                <p>Ipswich City Council</p>
                                <div><span styleName="styles.stage">Discovery</span></div>
                            </article>
                        </li>
                        <li>
                            <figure>
                                <img src="/static/media/asset_management_casey.jpg"
                                     alt="Map of asset locations" width="260"/>
                            </figure>
                            <article style={{padding: "10px"}}>
                                <h3>
                                    <a href="/collaborate/project/2">Finding value in data</a>
                                </h3>
                                <p>City of Casey
                                    Council</p>
                                <div><span styleName="styles.stage">Discovery</span></div>
                            </article>
                        </li>
                        <li>
                            <figure>
                                <img src="/static/media/smart_lighting_adelaide.jpg"
                                     alt="Street lamp with attached sensor" width="260"/>
                            </figure>
                            <article style={{padding: "10px"}}>
                                <h3>
                                    <a href="/collaborate/project/3">Smart City Lighting Pilot</a>
                                </h3>
                                <p>Adelaide City
                                    Council</p>
                                <div><span styleName="styles.stage">Pilot</span></div>
                            </article>
                        </li>
                        <li>
                            <figure>
                                <img src="/static/media/sunshine_coast_automated_waste.jpg"
                                     alt="Diagram of underground tubes transporting waste" width="260"/>
                            </figure>
                            <article style={{padding: "10px"}}>
                                <h3>
                                    <a href="/collaborate/project/1">Underground waste collection</a>
                                </h3>
                                <p>Sunshine Coast
                                    Council</p>
                                <div><span styleName="styles.stage">In build</span></div>
                            </article>
                        </li>
                        <li>
                            <figure>
                                <img src="/static/media/smart_hub.jpg"
                                     alt="Illustration of the location of the smart hub building" width="260"/>
                            </figure>
                            <article style={{padding: "10px"}}>
                                <h3>
                                    <a href="/collaborate/project/7">The Smart Hub</a>
                                </h3>
                                <p>Rockhampton Regional Council</p>
                                <div><span styleName="styles.stage">Live</span></div>
                            </article>
                        </li>
                        <li>
                            <figure>
                                <img src="/static/media/rpv_trial.png"
                                     alt="Remotely piloted aircraft" width="260"/>
                            </figure>
                            <article style={{padding: "10px"}}>
                                <h3>
                                    <a href="/collaborate/project/8">UAV shark surveillance</a>
                                </h3>
                                <p>Lake Macquarie City Council</p>
                                <div><span styleName="styles.stage">Pilot</span></div>
                            </article>
                        </li>
                    </ul>
                    <p style={{textAlign: "center"}}><a href="/collaborate/project/new" role="button">Add a project</a>
                    </p>
                </div>
                <div style={{paddingTop: "12px"}}>
                    <h2 style={{textAlign: "center"}}> Build smart city know how</h2>
                    <p style={{textAlign: "center"}}> The Future Ready series brings people together to work through
                        <br/>urban
                        challenges, take ideas forward and learn from each other.</p>
                    <ul className="list-vertical">
                        <li style={{borderTop: "0"}} styleName="styles.calendarColOne" >
                            <article>
                                <table className="calendar-table" style={{marginTop: 0}}>
                                    <tbody>

                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-08-03">Thursday <span>3</span> August</time>
                                        </th>
                                        <td> Global smart city perspectives <span className="date-info">Learn from leading smart city experts. Ask questions of the best in the business. <br/> <a
                                            href="https://attendee.gotowebinar.com/register/8643785756793183235"
                                            rel="external" target="blank">Register for webinar</a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-08-10">Thursday <span>10</span> August</time>
                                        </th>
                                        <td> Hobart masterclass <span className="date-info">Gain valuable insights into using digital technology to proactively engage citizens in building smart cities. <br/> <a
                                            href="https://www.eventbrite.com.au/e/be-a-smart-city-community-engagement-customer-service-masterclass-tickets-35952923161"
                                            rel="external" target="blank">Register for the masterclass</a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-08-16">Wednesday <span>16</span> August</time>
                                        </th>
                                        <td> Global smart city perspectives <span className="date-info">Learn from leading smart city experts. Ask questions of the best in the business. <br/> <a
                                            href="https://attendee.gotowebinar.com/register/1759344332566794755"
                                            rel="external" target="blank">Register for webinar</a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-08-17">Thursday <span>17</span> August</time>
                                        </th>
                                        <td> Adelaide masterclass <span className="date-info">Learn how to shape a culture of innovation in your council and community.<br/> <a
                                            href="https://www.eventbrite.com.au/e/be-a-smart-city-thinking-smart-creating-a-culture-of-innovation-tickets-35953128776"
                                            rel="external" target="blank">Register for the masterclass</a></span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </article>
                        </li>
                        <li styleName="styles.calendarColTwo" style={{borderTop: "0"}}>
                            <article>
                                <table className="calendar-table" style={{marginTop: 0}}>
                                    <tbody>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-08-31">Thursday <span>31</span> August</time>
                                        </th>
                                        <td> Darwin masterclass <span className="date-info">Explore how to fund smart city projects, select and manage partners and improve procurement.<br/> <a
                                            href="https://www.eventbrite.com.au/e/be-a-smart-city-smart-financing-funding-and-procurement-tickets-35953323358"
                                            rel="external" target="blank">Register for the masterclass</a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-09-12">Tuesday <span>12</span> September</time>
                                        </th>
                                        <td> Global smart city perspectives <span className="date-info">Learn from leading smart city experts. Ask questions of the best in the business. <br/> <a
                                            href="https://attendee.gotowebinar.com/register/9195896724587921923"
                                            rel="external" target="blank">Register for webinar</a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-09-27">Wednesday <span>27</span> September</time>
                                        </th>
                                        <td> Global smart city perspectives <span className="date-info">Learn from leading smart city experts. Ask questions of the best in the business. <br/> <a
                                            href="https://attendee.gotowebinar.com/register/2278966930784001027"
                                            rel="external" target="blank">Register for webinar</a></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" styleName="styles.day">
                                            <time dateTime="2017-09-28">Thursday <span>28</span> September</time>
                                        </th>
                                        <td> Canberra masterclass <span className="date-info">Urban Data and Governance.<br/> <a
                                            href="https://www.eventbrite.com.au/e/be-a-smart-city-urban-data-and-governance-tickets-35953434691"
                                            rel="external" target="blank">Register for the masterclass</a></span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </article>

                        </li>
                    </ul>
                </div>
                <section styleName="styles.fund">
                    <h2> Fund your smart city project</h2>
                    <p>
                        The $50 million <a
                        href="https://www.business.gov.au/~/media/business/smart-cities-and-suburbs/smart-cities-and-suburbs-program-guidelines-round-one-PDF"
                        rel="external" target="blank">Smart Cities and Suburbs Program</a> supports local
                        governments, private companies, academia and not-for-profits to collaboratively deliver <a
                        href="https://s3-ap-southeast-2.amazonaws.com/ehq-production-australia/4eb02b0d21864be00a86c40f5e0b558aa3022cae/documents/attachments/000/054/266/original/Example_smart_city_projects.pdf?1492569019"
                        rel="external" target="blank">innovative smart city projects.</a></p>
                    <p><a
                        href="https://www.business.gov.au/assistance/smart-cities-and-suburbs-program">Applications
                    </a> for round one are open until 30 June 2017. <br/>
                        For program support call <a href="tel:132846" rel="external" target="blank">13 28 46</a></p>
                </section>
                <div  style={{paddingTop:"12px"}}>
                <h2 style={{textAlign: "center"}}> Find partners on the Digital Marketplace</h2>
                <p styleName="styles.partners" style={{textAlign: "center"}}>The Digital Marketplace has been created so local council buyers can
                    access digital expertise quickly and easily. Find expertise to create smarter communities and
                    deliver better digital services.</p>

                <p styleName="styles.chartContainer">
                    {Object.keys(domains).map((domain, i) => {
                        let count = domains[domain];
                        let url_domain = domain.replace(/\s+/g, '%20')
                        return (<a styleName="styles.chart" key={i} href={`/search/sellers/?role=${url_domain}`}>
                            <span
                                style={{width: (typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : (count / maxDomain) * 100 + "%")}}
                            ><strong>{count}</strong> in {domain}</span></a>)
                    })}
                </p>
                </div>
                <div className="row" style={{padding: "0 10px"}}>

                    <div style={{textAlign: "center"}}>
                        <h2>Join the Digital Marketplace</h2>
                        <div style={{textAlign: "center"}} className="col-xs-12 col-md-4 col-md-push-2">
                            <h3>Need digital products or services for government?</h3>
                            <p>Our buyers are from across local, state, territory and federal government.</p>
                            <p><a href="/signup" role="button" style={{color: "white"}}>Join as a buyer</a></p>
                        </div>
                        <div style={{textAlign: "center"}} styleName="styles.becomeASeller"
                             className="col-xs-12 col-md-4 col-md-push-2">
                            <div>
                                <h3>Offer digital products <br/>or services to government</h3>
                                <p>Access more digital opportunities across all levels of government.</p>
                                <p><a href="/become-a-seller" role="button" style={{color: "white"}}>Become a seller</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        seller_count: state.form_options.seller_count,
        ...ownProps
    };
};

export default connect(mapStateToProps)(Landing);
