import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { requestAccess } from 'marketplace/actions/teamActions'
import { rootPath } from 'marketplace/routes'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

import styles from '../main.scss'

const mapToDisplay = p => p.replace(/_/g, ' ')

class RequestionAccessPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      errorMessage: '',
      saved: false,
      permission: null
    }
  }

  componentWillMount() {
    const permission = this.props.match.params.permission
    this.setState({
      permission
    })
  }

  onRequestAccessClick() {
    this.setState({
      loading: true
    })
    this.props.request(this.state.permission).then(response => {
      let errorMessage = null
      if (response.status === 200) {
        this.setState({
          saved: true
        })
      } else {
        errorMessage = response.errorMessage
        window.scrollTo(0, 0)
      }
      this.setState({
        loading: false,
        errorMessage
      })
    })
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorFullPage />
    }

    return (
      <DocumentTitle title="Ask a question - Digital Marketplace">
        <React.Fragment>
          {this.state.errorMessage && (
            <div className="row">
              <div className="col-sm-push-2 col-sm-8 col-xs-12">
                <AUpageAlert as="error">{this.state.errorMessage}</AUpageAlert>
              </div>
            </div>
          )}
          {this.state.saved ? (
            <div className="row">
              <div className="col-sm-push-2 col-sm-8 col-xs-12">
                <AUpageAlert as="success">
                  <React.Fragment>
                    <AUheading level="4" size="md">
                      {`Thank you, your request for access has been submitted successfully`}.
                    </AUheading>
                    <p>
                      <a href={`${rootPath}/buyer-dashboard`} className="au-btn">
                        Return to dashboard
                      </a>
                    </p>
                  </React.Fragment>
                </AUpageAlert>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-push-2 col-sm-8 col-xs-12">
                <article role="main">
                  <h1 className="au-display-xl">You need permission to proceed.</h1>
                  <p>
                    You currently do not have permission to <b>{mapToDisplay(this.state.permission)}</b>. Request access
                    from the team lead to view it.
                  </p>
                  <br />
                  <AUbutton as="primary" className={styles['space-right']} onClick={e => this.onRequestAccessClick(e)}>
                    Request access
                  </AUbutton>
                  <a href={`${rootPath}/buyer-dashboard`}>Return to dashboard</a>
                </article>
              </div>
            </div>
          )}
        </React.Fragment>
      </DocumentTitle>
    )
  }
}

const mapResetDispatchToProps = dispatch => ({
  request: p => dispatch(requestAccess(p))
})

export default withRouter(connect(null, mapResetDispatchToProps)(RequestionAccessPage))
