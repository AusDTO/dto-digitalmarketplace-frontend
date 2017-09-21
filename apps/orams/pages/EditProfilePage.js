import React, { Component } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import NotFound from 'shared/NotFound'
import formProps from 'shared/formPropsSelector'
import { loadProfile } from 'orams/actions/profileActions'
import BusinessDetailsForm from 'orams/components/BusinessDetailsForm'
import BusinessInfoForm from 'orams/components/BusinessInfoForm'
import YourInfoForm from 'orams/components/YourInfoForm'
import ToolsForm from 'orams/components/ToolsForm'
import AwardsForm from 'orams/components/AwardsForm'
import SubmitStepForm from 'orams/components/Submit'
import FinishProfile from 'orams/components/FinishProfile'
import LocalNav from 'shared/LocalNav'

class EditProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  steps = [
    {
      id: 'profile',
      label: 'Business basics',
      component: BusinessDetailsForm,
      pattern: '/orams/edit-profile',
      formKey: 'businessDetailsForm'
    },
    {
      id: 'business',
      label: 'Business details',
      component: BusinessInfoForm,
      pattern: '/orams/edit-profile/business-info',
      formKey: 'businessInfoForm'
    },
    {
      id: 'info',
      label: 'Contacts',
      component: YourInfoForm,
      pattern: '/orams/edit-profile/your-info',
      formKey: 'yourInfoForm'
    },
    { id: 'tools', label: 'Methods', component: ToolsForm, pattern: '/orams/edit-profile/tools', formKey: 'toolsForm' },
    {
      id: 'awards',
      label: 'Recognition',
      component: AwardsForm,
      pattern: '/orams/edit-profile/awards',
      formKey: 'awardsForm'
    }
  ]

  render() {
    const { match } = this.props
    return (
      <main>
        <div className="row">
          <LocalNav className="col-xs-12 col-sm-3" navClassName="step-navigation" id="main-navigation">
            {this.steps.map(({ pattern, label, formKey, id }, i) => {
              const isActive = location.pathname === pattern
              return (
                <li key={i}>
                  <Link
                    to={pattern}
                    onClick={() => actions.navigateToStep(pattern)}
                    className={classNames({ 'is-active is-current': isActive })}
                  >
                    <span>
                      {label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </LocalNav>
          <article className="col-xs-12 col-sm-8 col-sm-push-1">
            <Switch>
              <Route exact path={match.url} render={() => <BusinessDetailsForm onSubmit={this.onSubmitClicked} />} />

              <Route
                path={`${match.url}/business-info`}
                render={() => <BusinessInfoForm onSubmit={this.onSubmitClicked} />}
              />

              <Route path={`${match.url}/your-info`} render={() => <YourInfoForm onSubmit={this.onSubmitClicked} />} />

              <Route path={`${match.url}/tools`} render={() => <ToolsForm onSubmit={this.onSubmitClicked} />} />

              <Route path={`${match.url}/awards`} render={() => <AwardsForm onSubmit={this.onSubmitClicked} />} />

              <Route path={`${match.url}/profile-finish`} render={() => <SubmitStepForm />} />

              <Route component={NotFound} />
            </Switch>
          </article>
        </div>
      </main>
    )
  }
}

EditProfilePage.propTypes = {}

const mapResetStateToProps = state => ({})

const mapResetDispatchToProps = dispatch => ({})

export default withRouter(connect(mapResetStateToProps, mapResetDispatchToProps)(EditProfilePage))
