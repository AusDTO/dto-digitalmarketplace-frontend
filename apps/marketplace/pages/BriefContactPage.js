/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import BriefContactForm from 'marketplace/components/Brief/BriefContactForm'

class BriefContactPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      currentlySending: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  render() {
    const { match, model, currentlySending } = this.props

    let hasFocused = false
    const setFocus = e => {
      if (!hasFocused) {
        hasFocused = true
        e.focus()
      }
    }

    return (
      <div className="brief-page">
        <Switch>
          <Route
            exact
            path={match.url}
            render={() =>
              <BriefContactForm
                submitClicked={this.onSubmitClicked}
                model={model}
                setFocus={this.setFocus}
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
  ...formProps(state, 'briefContactForm'),
  currentlySending: state.app.currentlySending
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BriefContactPage))
