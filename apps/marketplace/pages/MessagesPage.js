import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parse } from 'qs'
import { withRouter } from 'react-router-dom'
import { getSupplierMessages } from 'marketplace/actions/messagesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

class MessagesPage extends Component {
  constructor(props) {
    super(props)
    const qs = parse(props.location.search.substr(1))
    this.supplierCode = qs.supplierCode
    this.next = qs.next
  }

  componentDidMount() {
    this.props.getSupplierMessages(this.supplierCode)
  }

  render() {
    const { currentlySending, data } = this.props
    const errors = data.errors || []
    const warnings = data.warnings || []
    return (
      <div>
        {currentlySending ? (
          <LoadingIndicatorFullPage />
        ) : (
          <div>
            <h3 className="au-display-lg">The following requires your attention</h3>
            <br />
            {errors.length > 0 && (
              <div role="alert" className="au-body au-page-alerts au-page-alerts--error">
                <h3 className="au-display-md">Profile errors</h3>
                <ul>{errors.map(i => <li key={i.message}>{i.message}</li>)}</ul>
                <br />
              </div>
            )}
            {warnings.length > 0 && (
              <div>
                <div role="alert" className="au-body au-page-alerts au-page-alerts--warning">
                  <h3 className="au-display-md">Warnings</h3>
                  <ul>{warnings.map(i => <li key={i.message}>{i.message}</li>)}</ul>
                </div>
                <br />
              </div>
            )}
            <div>
              <a href="/sellers/edit" className="au-btn right-button-margin">
                Update your profile
              </a>
              <a href={`${this.next}`} className="au-btn au-btn--secondary">
                <strong>Continue</strong>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

MessagesPage.defaultProps = {
  currentlySending: false,
  data: {}
}

MessagesPage.propTypes = {
  currentlySending: PropTypes.bool,
  data: PropTypes.object
}

const mapStateToProps = state => ({
  currentlySending: state.messages.currentlySending,
  data: state.messages.data
})

const mapDispatchToProps = dispatch => ({
  getSupplierMessages: supplierCode => dispatch(getSupplierMessages(supplierCode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesPage))
