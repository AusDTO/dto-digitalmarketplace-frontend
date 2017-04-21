import React from 'react'
import {connect} from 'react-redux'


import 'd3';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
if (typeof window !== 'undefined') {
var leaflet = require('leaflet');
var react_leaflet = require('react-leaflet');
}


import './Landing.css'

class Landing extends React.Component {

    render() {
        const position = [-35.25, 149.25];
        const bounds = [[-20.133, 148.000], [-40.050, 132.467]];
        let map;
        if (leaflet && react_leaflet)
        {
            const icon = new leaflet.Icon({
                iconUrl: 'http://www.googlemapsmarkers.com/v1/009900/',
                iconSize: [21, 34], // size of the icon
            });
            map = (<react_leaflet.Map bounds={bounds} scrollWheelZoom={false}>
                <react_leaflet.TileLayer
                    url='http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
                />
                <react_leaflet.Marker icon={icon} position={position}>
                    <react_leaflet.Popup>
                        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                    </react_leaflet.Popup>
                </react_leaflet.Marker>
            </react_leaflet.Map>)
        } else {
            map = (<span>no map</span>)
        }
        var domains =
            ["Strategy and policy", "User research and design", "Agile delivery and governance", "Software engineering and development", "Support and operations", "Content and publishing", "Change, training and transformation", "Marketing, communications and engagement", "Cyber security", "Data science", "Emerging technologies"]
        return (
            <div>

                <h1>Smart cities and suburbs</h1>

                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra tristique convallis.</h2>

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
                        <a href="/collaborate/project/new" role="button">Add your councils project</a><br/>
                        </div>
                    </div>
                </div>
                <div style={{
                    height: '400px'
                }}></div>
                <ul className="list-vertical--fourths">
                    <li>
                        <figure>
                            <img src="http://lorempixel.com/260/150/cats/" alt="cat" width="260" height="150"/>
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
                            <img src="http://lorempixel.com/260/150/cats/" alt="cat" width="260" height="150"/>
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
                            <img src="http://lorempixel.com/260/150/cats/" alt="cat" width="260" height="150"/>
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
                            <img src="http://lorempixel.com/260/150/cats/" alt="cat" width="260" height="150"/>
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

                <h2 style={{textAlign: "center"}}> Learn and collaborate </h2>

                <ul className="list-vertical">
                    <li>
                        <article>
                            <table className="calendar-table">
                                <tbody>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-01-01">Sunday <span>1</span> January</time>
                                    </th>
                                    <td>New Year's Day
                                        <span className="date-info"><a href="#eb" rel="external"
                                                                                     target="_blank">Book with eventbrite</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-01-02">Monday <span>2</span> January</time>
                                    </th>
                                    <td>New Year's Day holiday                                        <span className="date-info"><a href="#eb" rel="external"
                                                                                                                                     target="_blank">Book with eventbrite</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-01-26">Thursday <span>26</span> January</time>
                                    </th>
                                    <td>Australia Day                                        <span className="date-info"><a href="#eb" rel="external"
                                                                                                                            target="_blank">Book with eventbrite</a></span></td>
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
                                        <time dateTime="2017-01-01">Sunday <span>1</span> January</time>
                                    </th>
                                    <td>New Year's Day                                        <span className="date-info"><a href="#eb" rel="external"
                                                                                                                             target="_blank">Book with eventbrite</a></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-01-02">Monday <span>2</span> January</time>
                                    </th>
                                    <td>New Year's Day holiday                                        <span className="date-info"><a href="#eb" rel="external"
                                                                                                                                     target="_blank">Book with eventbrite</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">
                                        <time dateTime="2017-01-26">Thursday <span>26</span> January</time>
                                    </th>
                                    <td>Australia Day                                        <span className="date-info"><a href="#eb" rel="external"
                                                                                                                            target="_blank">Book with eventbrite</a></span></td>
                                </tr>
                                </tbody>
                            </table>
                        </article>

                    </li>
                </ul>

                <h2 style={{textAlign: "center"}}> Find partners </h2>

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
