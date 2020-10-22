import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'

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
                        <div className="col-sm-5 col-sm-push-1">
                          <DocumentTitle title="Shared model library - Digital Marketplace">
                            <h1 tabIndex="-1">Shared model library</h1>
                          </DocumentTitle>
                            <p styleName="summary">A library of open source code from across government ready to use in
                                your project.</p>

                        </div>
                        <div className="col-sm-5 col-sm-push-1">
                            <img styleName="illustration" src="/static/media/open_source_illustration.png" alt="Phone and tablet showing data visualisation with desktop browser showing online form"/>
                        </div>
                    </div>
                </section>
                <section >
                    <div className="row" styleName="newTo">
                        <article className="col-md-7 col-sm-12 col-md-push-1" styleName="code-text">


                            <h2 className="au-display-lg"> New to open source?</h2>
                            You can reduce cost, effort and risk by re-using tried and tested open source projects to
                            build digital services.<br/>
                            <br/>
                            Making source code open is criteria 8 in the <a href="https://www.dta.gov.au/standard/"
                                                                            rel="external noopener noreferrer" target="_blank">Digital
                            Service Standard</a>
                            You can learn how to <a href="https://opensource.guide/" rel="external noopener noreferrer" target="_blank">launch
                            and grow your project</a> or contact us if you would like some help.<br/>

                            <a href="mailto:marketplace@dta.gov.au?subject=Open source projects"
                               className="button">Get in touch</a>
                        </article>
                    </div>
                    <div className="row" styleName="explore">
                      <h2 className="au-display-lg"><center>Browse library</center></h2>

                        <article role="main" styleName="center">

                            <ul styleName="tiles">
                                {data.map((item, i) =>
                                    <li key={i}
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
                                            <h3 className="au-display-md">
                                                <a rel="external noopener noreferrer" target="_blank" href={item.url}
                                                   onClick={(e) => e.stopPropagation()}>{item.name}</a>
                                            </h3>
                                            <p><b>Description: </b>{item.description}<br/><br/>
                                                <b>Uses: </b>{item.uses}<br/><br/>
                                                <a rel="external noopener noreferrer" target="_blank" href={item.demo_url}
                                                   onClick={(e) => e.stopPropagation()}>View
                                                    demo</a></p>
<img src={item.icon}/>
                                        </article>
                                    </li>
                                )}

                            </ul>
                            <div styleName="fine">The use of brand names or products listed does not imply endorsement
                                by the Digital Marketplace
                                or discrimination against similar products not mentioned. This is listing is provided
                                ‘as is’ and without any express
                                or implied warranties, including, without limitation, the implied warranties of
                                merchantability and fitness for a particular purpose.
                            </div>
                        </article>

                    </div>

                    <div>
                        <article role="main" styleName="what">
                            <h2 >What features will help your team? </h2>
                            <p>
                                Let us know what you would like to see in the library<br/>
                                <a href="mailto:marketplace@dta.gov.au?subject=Feedback"
                                   className="button">Get in touch</a></p>
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

export default connect(mapStateToProps)(Code);
