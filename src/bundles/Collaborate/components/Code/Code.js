import React from 'react'
import {connect} from 'react-redux'

import styles from './Code.css'
import data from './Code.json'

class Code extends React.Component {
    handleClick(event, url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

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
                            <a href="mailto:marketplace@digital.gov.au?subject=Open source projects"
                               role="button" style={{marginTop: "8px"}}>Get in touch</a>
                        </div>
                    </div>
                </section>
                <section >
                    <div >
                        <h2 style={{textAlign: "center"}}>Explore code</h2>
                        <p styleName="code-text">Reduce cost, effort and risk by re-using tried and tested open source
                            projects to deliver digital services.</p>
                    </div>
                    <div className="row">
                        <article role="main" styleName="center">

                            <ul styleName="tiles">
                                {data.map((item, i) =>
                                    <li key={i} style={{backgroundImage: 'url(' + item.icon + ')'}}
                                        role="link"
                                        onClick={(e) => this.handleClick(event, item.url)}
                                        onKeyDown={(e) => {
                                            if (e.keyCode == 13 || e.keyCode == 32) // enter or space
                                            {
                                                this.handleClick(event, item.url)
                                            }
                                        }}
                                        tabIndex="0">
                                        <article>
                                            <h3>
                                                <a rel="external" target="_blank" href={item.url}
                                                   onClick={(e) => e.stopPropagation()}>{item.name}</a>
                                            </h3>
                                            <p>{item.description}<br/><br/>
                                                <a rel="external" target="_blank" href={item.demo_url}
                                                   onClick={(e) => e.stopPropagation()}>View
                                                    demo</a></p>

                                        </article>
                                    </li>
                                )}

                            </ul>
                        </article>
                    </div>

                    <div>
                        <article role="main" styleName="center">
                            <h3 styleName="what-else" style={{
                                textAlign: "center",
                                fontSize: "24px"
                            }}>What else would you like to see?</h3>
                            <p style={{textAlign: "center", fontSize: "20px"}}>
                                <a href="mailto:marketplace@digital.gov.au?subject=Feedback"
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
