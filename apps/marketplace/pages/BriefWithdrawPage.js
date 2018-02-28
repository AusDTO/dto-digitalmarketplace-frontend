/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import BriefWithdrawForm from 'marketplace/components/Brief/BriefWithdrawForm'

class BriefWithdrawPage extends Component {

  render() {
    const { match } = this.props

    return (
      <div className="brief-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() =>
              <BriefWithdrawForm
                match={match}
                {...this.props}
                {...this.state}
              />}
          />

        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BriefWithdrawPage))
