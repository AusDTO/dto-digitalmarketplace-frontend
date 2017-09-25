import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ErrorBox from 'marketplace/components/shared/form/ErrorBox'
import NotFound from 'marketplace/components/shared/NotFound'
import formProps from 'marketplace/components/shared/form/formPropsSelector'
import BriefResponseForm from 'marketplace/components/Brief/BriefResponseForm'
import { loadBrief, handleBriefResponseSubmit } from 'marketplace/actions/briefActions'
import BriefResponseSubmitted from 'marketplace/components/Brief/BriefResponseSubmitted'

class BriefPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  componentWillMount() {
    const briefId = this.props.match.params.briefId
    if (briefId.length > 0) {
      this.props.loadInitialData(briefId)
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleBriefResponseSubmit(values) {
    const { brief } = this.props
    this.props.handleBriefResponseSubmit(brief.id, values)
  }

  render() {
    const { loadBriefSuccess, match } = this.props

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
            path={`${match.url}/respond/submitted`}
            component={BriefResponseSubmitted}
            setFocus={setFocus}
            {...this.props}
          />
          <Route
            path={`${match.url}/respond`}
            render={() =>
              <span>
                {loadBriefSuccess
                  ? <BriefResponseForm
                      submitClicked={this.onSubmitClicked}
                      handleSubmit={values => this.handleBriefResponseSubmit(values)}
                      setFocus={setFocus}
                      {...this.props}
                    />
                  : <ErrorBox title="There was a problem loading the brief details" setFocus={setFocus} />}{' '}
              </span>}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

BriefPage.defaultProps = {
  loadInitialData: null,
  handleBriefResponseSubmit: null,
  loadBriefSuccess: null,
  briefResponseSuccess: null
}

BriefPage.propTypes = {
  brief: PropTypes.shape({
    briefSuccess: PropTypes.bool
  }).isRequired,
  model: PropTypes.string.isRequired,
  loadInitialData: PropTypes.func,
  handleBriefResponseSubmit: PropTypes.func,
  loadBriefSuccess: PropTypes.bool,
  briefResponseSuccess: PropTypes.bool
}

const mapResetStateToProps = state => ({
  ...formProps(state, 'briefResponseForm'),
  brief: state.brief.brief,
  app: state.app,
  loadBriefSuccess: state.brief.loadBriefSuccess,
  briefResponseSuccess: state.brief.briefResponseSuccess,
  currentlySending: state.app.currentlySending
})

const mapResetDispatchToProps = dispatch => ({
  handleBriefResponseSubmit: (briefId, model) => dispatch(handleBriefResponseSubmit(briefId, model)),
  loadInitialData: briefId => dispatch(loadBrief(briefId))
})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(BriefPage))
