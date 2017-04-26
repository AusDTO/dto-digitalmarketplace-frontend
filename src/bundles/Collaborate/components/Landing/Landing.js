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


import './Landing.css'
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
                    fillColor: (has(cityData, feature.properties.LGA_NAME16) ? '#00ff00' : '#800026'),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            }

            map = (<react_leaflet.Map bounds={bounds} scrollWheelZoom={false}>
                <react_leaflet.TileLayer
                    url='//tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>,
                    under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.
                    Data by <a href="http://openstreetmap.org">OpenStreetMap</a>,
                    under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                />
                <react_leaflet.GeoJSON data={lgaData} style={style} onEachFeature={onEachFeature}/>
            </react_leaflet.Map>)
        } else {
            map = (<span>no map</span>)
        }
        var domains =
            ["Strategy and policy", "User research and design", "Agile delivery and governance",
                "Software engineering and development", "Support and operations", "Content and publishing",
                "Change, training and transformation", "Marketing, communications and engagement", "Cyber security",
                "Data science", "Emerging technologies"]
        return (
            <div>

                <h1>Smart Cities and Suburbs program</h1>
                <p>Improve the liveability, productivity and sustainability of Australian cities, suburbs and towns with grants of up to $5 million.</p>

                <h2>Who is getting involved?</h2>
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
                        <span className="see-more">107</span> councils<br/>
                        <span className="see-more">48</span> projects<br/>
                        <br/>
                        <div>
                            <a href="/collaborate/project/new" role="button">Add a council project</a><br/>
                        </div>
                    </div>
                </div>
                <div style={{
                    height: '400px'
                }}></div>
                <h2>What types of initiatives are eligible?</h2>
                <p>See indicative examples that may be eligible for funding under round one of the program. Activities should align with one or more of the <a href="#z" rel="external" target="blank">four program priority areas.</a></p>
                <ul className="list-vertical--fourths">
                    <li>
                        <figure>
                            <img src="https://www.adelaidesmartcitystudio.com/site/assets/files/1025/proj-light.jpg"
                                 alt="cat" width="260" height="150"/>
                        </figure>
                        <article>
                            <h3>
                                <a href="#z">Smart City Lighting Pilot</a>
                            </h3>
                            <p>By Adelaide City Council</p>
                        </article>
                    </li>
                    <li>
                        <figure>
                            <img src="https://www.adelaidesmartcitystudio.com/site/assets/files/1025/proj-light.jpg"
                                 alt="cat" width="260" height="150"/>
                        </figure>
                        <article>
                            <h3>
                                <a href="#z">Smart City Lighting Pilot</a>
                            </h3>
                            <p>By Adelaide City Council</p>
                        </article>
                    </li>
                    <li>
                        <figure>
                            <img src="https://www.adelaidesmartcitystudio.com/site/assets/files/1025/proj-light.jpg"
                                 alt="cat" width="260" height="150"/>
                        </figure>
                        <article>
                            <h3>
                                <a href="#z">Smart City Lighting Pilot</a>
                            </h3>
                            <p>By Adelaide City Council</p>
                        </article>
                    </li>
                    <li>
                        <figure>
                            <img src="https://www.adelaidesmartcitystudio.com/site/assets/files/1025/proj-light.jpg"
                                 alt="cat" width="260" height="150"/>
                        </figure>
                        <article>
                            <h3>
                                <a href="#z">Smart City Lighting Pilot</a>
                            </h3>
                            <p>By Adelaide City Council</p>
                        </article>
                    </li>
                </ul>

                <p style={{textAlign: "center"}}><a className="see-more" href="#z">Browse projects</a></p>

                <h2 style={{textAlign: "center"}}> New to smart cities and smart technology? </h2>
               <p> Future Ready is a smart cities incubator series that uses collaboration, connection and co-learning to grow smart city capability.
                On-site and virtual activities bring people together to work through urban challenges, take ideas forward and learn from each other.
                   Future Ready is open to all.</p>
                <ul className="list-vertical">
                    <li>
                        <article>
                            <table className="calendar-table">
                                <tbody>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-05">Friday <span>5</span> May</time>
                                    </th>
                                    <td>Fast-start induction
                                        <span className="date-info">Webinar</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-11">Thursday <span>11</span> May</time>
                                    </th>
                                    <td>Global smart city perspectives <span className="date-info">Webinar</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-17">Wednesday <span>17</span> May</time>
                                    </th>
                                    <td>Masterclass <span className="date-info">Brisbane</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </article>
                    </li>
                    <li>
                        <article>
                            <table className="calendar-table">
                                <tbody>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-18">Thursday <span>18</span> May</time>
                                    </th>
                                    <td>A conversation with ...<span className="date-info">Webinar</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-22">Monday <span>22</span> May</time>
                                    </th>
                                    <td>Masterclass <span className="date-info">Sydney</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-05-29">Monday <span>29</span> May</time>
                                    </th>
                                    <td>Co-learning lab<span className="date-info">Adelaide</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </article>

                    </li>
                </ul>

                <h2 style={{textAlign: "center"}}> Find partners on the Digital Marketplace</h2>
                <p> Eligible projects must involve at least one local government agency or body, and <a href="https://marketplace.service.gov.au/search/sellers">one private sector organisation</a> during the life of the project.</p>

                <C3Chart size={{height: 470}}
                         data={{
                             columns: [["unsubmitted", 178, 216, 239, 242, 143, 120, 191, 121, 123, 105, 151], ["completed", 104, 92, 106, 123, 80, 69, 80, 68, 53, 58, 63]],
                             type: 'bar',
                             groups: [["unsubmitted", "completed"]],
                             colors: {
                                 completed: '#224a61',
                                 unsubmitted: '#5BCBE3'
                             },
                             labels: true,
                             onmouseover: function (d) {
                                 this.focus(d.id);
                             }
                         }}
                         legend={{
                             hide: true
                         }}
                         tooltip={{
                             show: false
                         }}
                         axis={{
                             rotated: true,
                             y: {
                                 show: false
                             },
                             x: {
                                 tick: {
                                     width: 370,
                                     fit: true,
                                     culling: false,
                                     format: function (x) {
                                         /* if (domains[x].length > (window.innerWidth < 768 ? 10 : 15)) {
                                          return (" " + domains[x]).substr(0, (window.innerWidth < 768 ? 10 : 15)) + '…';
                                          } else {*/
                                         return domains[x];
                                         //å}
                                     }
                                 }
                             }
                         }}/>


                <h2 style={{textAlign: "center"}}> Timeline</h2>
                <ul className="list-vertical--fourths">
                    <li>
                        <article>
                            <h3>
                                12 Date
                            </h3>
                            <p>Event Start</p>
                            <p>Incubation package</p>
                        </article>
                    </li>
                    <li>
                        <article>
                            <h3>
                                12 Date
                            </h3>
                            <p>Round 1 close</p>
                            <p>Deployment of ready projects</p>
                        </article>
                    </li>
                    <li>
                        <article>
                            <h3>
                                12 Date
                            </h3>
                            <p>Incubation package ends</p>
                        </article>
                    </li>
                </ul>

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
