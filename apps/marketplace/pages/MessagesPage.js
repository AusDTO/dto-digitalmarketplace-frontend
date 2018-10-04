import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parse, stringify } from 'qs'
import { withRouter } from 'react-router-dom'
import { getSupplierMessages } from 'marketplace/actions/messagesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'
import PageAlert from '@gov.au/page-alerts'

class MessagesPage extends Component {
  constructor(props) {
    super(props)
    console.log(props.location)
    let qs = parse(props.location.search.substr(1))
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
            <h3 class="au-display-lg">The following requires your attention</h3>
            <br />
            {errors.length > 0 && (
              <div>
                <PageAlert as="error">
                  <h3 class="au-display-md">Profile errors</h3>
                  <ul>
                    {errors.map(i => {
                      return <li key={i.message}>{i.message}</li>
                    })}
                  </ul>
                </PageAlert>
                <br />
              </div>
            )}
            {warnings.length > 0 && (
              <div>
                <PageAlert as="warning">
                  <h3 class="au-display-md">Warnings</h3>
                  <ul>
                    {warnings.map(i => {
                      return <li key={i.message}>{i.message}</li>
                    })}
                  </ul>
                </PageAlert>
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
