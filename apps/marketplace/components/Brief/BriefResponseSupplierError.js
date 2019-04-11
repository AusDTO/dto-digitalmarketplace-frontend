import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'


export class BriefResponseSupplierError extends Component {
  formatMessage = (item, row) => {
    const { message, links } = item

    let messages = [message]
    if (links) {
      Object.keys(links).forEach(link => {
        const temp = []
        messages.forEach(m => {
          if (m.split) {
            m.split(`{${link}}`).forEach((v, i, a) => {
              temp.push(v)
              if (a.length !== i + 1) {
                temp.push(
                  <a key={`${row}.link.${link}`} href={links[link]}>
                    {link}
                  </a>
                )
              }
            })
          } else {
            temp.push(m)
          }
        })
        messages = temp
      })
    }
    return messages
  }

  render() {
    const {
      app
    } = this.props

    return <div className="row">
      <DocumentTitle title="Before you can apply - Digital Marketplace">
        <div className="col-sm-push-2 col-sm-8 col-xs-12">
          <h2 className="au-header__heading">Before you can apply</h2>
          <br />
          <article role="main">
            <AUpageAlert as="error">
              <h4 className="au-display-sm">Please update your profile with:</h4>
              <ul>
                {Array.isArray(app.errorMessage) &&
                  app.errorMessage.map((err, i) => {
                    return <li key={i}>{this.formatMessage(err, i)}</li>
                  })}
              </ul>
            </AUpageAlert>
            <br />
            <a href="/sellers/edit" className="au-btn">
              Update your profile
          </a>
          </article>
        </div>
      </DocumentTitle>
    </div>
  }
}


const mapStateToProps = state => ({
  app: state.app
})


export default connect(mapStateToProps)(BriefResponseSupplierError)
