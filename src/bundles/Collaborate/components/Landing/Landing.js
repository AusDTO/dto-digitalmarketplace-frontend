import React from 'react'
import {connect} from 'react-redux'

import has from 'lodash/has';

import 'd3';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
if (typeof window !== 'undefined') {
    var leaflet = require('leaflet');
    var react_leaflet = require('react-leaflet');
}

import styles from './Landing.css'
import lgaData from './LGA_2016_AUST.geo5.json';
import cityData from './citydata.json';

class Landing extends React.Component {

    render() {

        const bounds = [[-15.133, 148.000], [-40.050, 137.467]];
        let map;
        if (leaflet && react_leaflet) {

            function onEachFeature(feature, layer) {

                if (feature.properties && feature.properties.LGA_NAME16 && has(cityData, feature.properties.LGA_NAME16)) {
                    layer.bindPopup(cityData[feature.properties.LGA_NAME16]);
                }
            }

            function style(feature) {
                return {
                    fillColor: (has(cityData, feature.properties.LGA_NAME16) ? "#5bcbe3" : '#f0f3f5'),
                    weight: 1,
                    opacity: 1,
                    color: '#999',
                    fillOpacity: 0.7
                };
            }

            map = (<react_leaflet.Map bounds={bounds} scrollWheelZoom={false}>
                <react_leaflet.TileLayer
                    url='//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                    attribution='
                    &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;
        <a href="https://carto.com/attribution">CARTO</a>, &copy; Australian Bureau of Statistics (ABS) under <a href="http://creativecommons.org/licenses/by/2.5/au/">CC-BY 2.5</a>'
                />
                <react_leaflet.GeoJSON data={lgaData} style={style} onEachFeature={onEachFeature}/>
            </react_leaflet.Map>)
        } else {
            map = (<span></span>)
        }
        let domains =
            {"User research and Design": 92, "Strategy and Policy": 104,  "Agile delivery and Governance": 106,
                "Software engineering and Development": 123,
                "Change, training and transformation": 80, "Marketing, Communications and Engagement": 68, "Cyber security": 53,
                "Data science":58, "Emerging technologies":63};
        let maxDomain = 123;
        return (
            <div className="landing">

                <h1 style={{textAlign: "center"}}>Smart cities</h1>
                <p styleName="styles.uikit-display-3">Connect and collaborate to improve the liveability, <br/> productivity and sustainability of Australian communities.</p>


                <div style={{
                    height: '580px', width: "100%", position: "absolute",
                    left: 0
                }}>
                    { map }

                    <div style={{
                        position: "absolute",
                        background: "white",
                        top: "50px",
                        right: "176px",
                        zIndex: 999,
                        padding: "16px",
                        border: "2px grey"
                    }}>
                        <strong styleName="styles.pop" style={{color: '#5bcbe3'}}>107</strong> Future Ready councils<br/>
                        <strong styleName="styles.pop">334</strong> Marketplace sellers<br/>
                    </div>
                </div>
                <div style={{
                    height: '400px'
                }}></div>
                <h2 style={{textAlign: "center"}}>Council collaboration</h2>
                <p style={{textAlign: "center"}}>Connect and learn from councils building smart communities<br/>
                    and digital services in user-centred, data driven ways.</p>
                <ul className="list-vertical--fourths">
                    <li style={{ border: "1px solid #bebebe", boxShadow: "0 2px 6px 0 rgba(0,0,0,0.1)", padding: 0}}>
                        <figure>
                            <img src="/static/media/smart_lighting_adelaide.jpg"
                                 alt="" width="260" height="150"/>
                        </figure>
                        <article style={{padding: "10px"}}>
                            <h3>
                                <a href="/collaborate/project/1">Smart City Lighting Pilot</a>
                            </h3>
                            <p style={{  color: "#717171",fontSize: "87.5%", marginBottom: 0}}>Adelaide City Council</p>
                            <span styleName="styles.stage">Idea</span>
                        </article>
                    </li>
                    <li style={{ border: "1px solid #bebebe", boxShadow: "0 2px 6px 0 rgba(0,0,0,0.1)", padding: 0}}>
                        <figure>
                            <img src="/static/media/asset_management_casey.jpg"
                                 alt="" width="260" height="150"/>
                        </figure>
                        <article style={{padding: "10px"}}>
                            <h3>
                                <a href="/collaborate/project/2">Finding value in data</a>
                            </h3>
                            <p style={{  color: "#717171",fontSize: "87.5%", marginBottom: 0}}>City of Casey Council</p>
                            <span styleName="styles.stage">Discovery</span>
                        </article>
                    </li>
                    <li style={{ border: "1px solid #bebebe", boxShadow: "0 2px 6px 0 rgba(0,0,0,0.1)", padding: 0}}>
                        <figure>
                            <img src="/static/media/smart_lighting_adelaide.jpg"
                                 alt="" width="260" height="150"/>
                        </figure>
                        <article style={{padding: "10px"}}>
                            <h3>
                                <a href="/collaborate/project/3">Smart City Lighting Pilot</a>
                            </h3>
                            <p style={{  color: "#717171",fontSize: "87.5%", marginBottom: 0}}>Adelaide City Council</p>
                            <span styleName="styles.stage">Pilot</span>
                        </article>
                    </li>
                    <li style={{ border: "1px solid #bebebe", boxShadow: "0 2px 6px 0 rgba(0,0,0,0.1)", padding: 0}}>
                        <figure>
                            <img src="/static/media/smart_parking_act.jpg"
                                 alt="" width="260" height="150"/>
                        </figure>
                        <article style={{padding: "10px"}}>
                            <h3>
                                <a href="/collaborate/project/4">Smart Parking</a>
                            </h3>
                            <p style={{  color: "#717171",fontSize: "87.5%", marginBottom: 0}}>ACT Government</p>
                            <span styleName="styles.stage">Live</span>
                        </article>
                    </li>
                </ul>
                <p style={{textAlign: "center"}}> <a href="/collaborate/project/new" role="button">Add a project</a></p>

                <h2 style={{textAlign: "center"}}> Build smart city know how</h2>
               <p style={{textAlign: "center"}}> The Future Ready series brings people together to work through <br/>urban challenges, take ideas forward and learn from each other.</p>
                <ul className="list-vertical">
                    <li style={{borderTop: "0"}}>
                        <article>
                            <table className="calendar-table" style={{marginTop:0}}>
                                <tbody>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-05">Friday <span>5</span> May</time>
                                    </th>
                                    <td>Fast-start induction
                                        <span className="date-info">Getting started with Future Ready. <br/> <a href="https://www.eventbrite.com.au/e/future-ready-webinar-series-welcome-session-tickets-33967354271" rel="external" target="blank">Register for Webinar</a></span>

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-11">Thursday <span>11</span> May</time>
                                    </th>
                                    <td>Global smart city perspectives <span className="date-info">Learn from international smart cities.<br/> <a href="https://www.eventbrite.com.au/e/future-ready-webinar-series-session-2-tickets-33978417361" rel="external" target="blank">Register for Webinar</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-17">Wednesday <span>17</span> May</time>
                                    </th>
                                    <td>Brisbane Masterclass <span className="date-info">Get Smart Cities skills and tools. <br/> <a href="https://www.eventbrite.com.au/e/build-your-smart-city-know-how-brisbane-tickets-33484479981" rel="external" target="blank">Register for workshop</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-18">Thursday <span>18</span> May</time>
                                    </th>
                                    <td>A conversation with ...<span className="date-info">Learn from national and international smart city experts.</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </article>
                    </li>
                    <li style={{borderTop: "0"}}>
                        <article>
                            <table className="calendar-table" style={{marginTop:0}}>
                                <tbody>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-22">Monday <span>22</span> May</time>
                                    </th>
                                    <td>Sydney Masterclass <span className="date-info">Essentials for smart city leaders. <br/> <a href="https://www.eventbrite.com.au/e/build-your-smart-city-know-how-sydney-tickets-33881032079" rel="external" target="blank">Register for workshop</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-29">Monday <span>29</span> May</time>
                                    </th>
                                    <td>Adelaide Co-learning lab<span className="date-info">Learn, collaborate and create. <br/> <a href="http://ascaconference.org.au/future-ready" rel="external" target="blank">Register for workshop</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-06-08">Monday <span>8</span> June</time>
                                    </th>
                                    <td>Melbourne Masterclass <span className="date-info">Get Smart Cities skills and tools. <br/> <a href="https://www.eventbrite.com.au/e/build-your-smart-city-know-how-melbourne-tickets-33881210613" rel="external" target="blank">Register for workshop</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-06-15">Monday <span>15</span> June</time>
                                    </th>
                                    <td>Perth Masterclass <span className="date-info">Get Smart Cities skills and tools. <br/> <a href="https://www.eventbrite.com.au/e/build-your-smart-city-know-how-perth-tickets-33881255748" rel="external" target="blank">Register for workshop</a></span>
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                        </article>

                    </li>
                </ul>

                <section style={{
                    textAlign: "center",
                    background: "#f0f3f5",
                    width: "112%",
                    marginLeft: "-6%",
                    padding: "16px 16px 24px 16px",
                    float: "none"
                }}>
                    <h2> Fund your smart city project</h2>
                    <p>
                        The $50 million <a href="https://www.business.gov.au/~/media/business/smart-cities-and-suburbs/smart-cities-and-suburbs-program-guidelines-round-one-PDF" rel="external" target="blank">Smart Cities and Suburbs Program</a> supports <br/> local governments, private companies, academia and not-for-profits <br/>to collaboratively deliver innovative  <a href="https://s3-ap-southeast-2.amazonaws.com/ehq-production-australia/4eb02b0d21864be00a86c40f5e0b558aa3022cae/documents/attachments/000/054/266/original/Example_smart_city_projects.pdf?1492569019" rel="external" target="blank">smart city projects.</a><br/></p>
                    <p><a href="https://www.business.gov.au/assistance/smart-cities-and-suburbs-program">Applications</a> for round one is open until 30 June 2017. <br/>
                        For program support call <a href="tel:132846" rel="external" target="blank">13 28 46</a></p>
                </section>
                <h2 style={{textAlign: "center"}}> Find a smart city partner</h2>
                <p style={{textAlign: "center"}}>The Digital Marketplace has been created so local council buyers <br/>can access digital expertise quickly and easily.  Find expertise to create <br/>smarter communities and deliver better digital services.</p>

                <p styleName="styles.chartContainer">
                    {Object.keys(domains).map((domain,i) => {
                        let count = domains[domain];
                        return (<a styleName="styles.chart" key={i} href={`/search/sellers/?role=${domain}`}>
                            <span
                                   style={{width: (typeof window !== 'undefined' && window.innerWidth < 768 ? "100%" : (count / maxDomain)*100+"%")}}
                                   ><strong>{count}</strong> in {domain}</span></a>)
                    })}
                </p>
                <article style={{textAlign: "center"}}><p>Are you a digital business offering smart city products or services?<br/>
                    <a href="/become-a-seller">Join the Marketplace now</a></p></article>
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
