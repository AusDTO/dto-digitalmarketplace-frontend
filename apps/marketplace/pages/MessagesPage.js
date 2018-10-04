import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { parse, stringify } from 'qs'
import { withRouter } from 'react-router-dom'
import { getSupplierMessages } from 'marketplace/actions/messagesActions'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'


class MessagesPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSupplierMessages()
  }

  render() {
    const { currentlySending, data } = this.props
    return (
      <div>
        {'Messages'}
        {currentlySending ? <LoadingIndicatorFullPage /> : data.errors && data.errors.map( i => i.message ) }
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
  getSupplierMessages: () => dispatch(getSupplierMessages()),
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessagesPage))
