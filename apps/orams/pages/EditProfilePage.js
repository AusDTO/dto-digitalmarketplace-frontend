/* eslint-disable */
import React, { Component } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import classNames from 'classnames'
import { connect } from 'react-redux'
import NotFound from 'shared/NotFound'
import { updateProfile } from 'orams/actions/profileActions'
import BusinessDetailsForm from 'orams/components/BusinessDetailsForm'
import BusinessInfoForm from 'orams/components/BusinessInfoForm'
import PricingDetailsForm from 'orams/components/PricingDetailsForm'
import YourInfoForm from 'orams/components/YourInfoForm'
import ToolsForm from 'orams/components/ToolsForm'
import AwardsForm from 'orams/components/AwardsForm'
import LocalNav from 'shared/LocalNav'
import { uniqueID } from 'shared/utils/helpers'

class EditProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitClicked: null,
      profileUpdated: null
    }
  }

  onSubmitClicked = () => {
    this.setState({
      submitClicked: new Date().valueOf()
    })
  }

  handleSubmit = model => {
    this.props.updateProfile(model)
    window.scrollTo(0, 0)
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
      id: 'info',
      label: 'Contacts',
      component: YourInfoForm,
      pattern: '/orams/edit-profile/your-info',
      formKey: 'yourInfoForm'
    },
    {
      id: 'pricing',
      label: 'Pricing',
      component: PricingDetailsForm,
      pattern: '/orams/edit-profile/edit-pricing',
      formKey: 'pricingDetailsForm'
    }
  ]

  render() {
    const { match } = this.props
    return (
      <main>
        <div className="row">
          <LocalNav className="col-xs-12 col-sm-3" navClassName="step-navigation" id="main-navigation">
            {this.steps.map(({ pattern, label }, id = uniqueID()) => {
              const isActive = location.pathname === pattern
              return (
                <li key={id}>
                  <Link to={pattern} className={classNames({ 'is-active is-current': isActive })}>
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
              <Route
                exact
                path={match.url}
                render={() => <BusinessDetailsForm handleSubmit={this.handleSubmit} profileUpdated />}
              />
              <Route
                path={`${match.url}/business-info`}
                render={() => <BusinessInfoForm handleSubmit={this.handleSubmit} profileUpdated />}
              />} />
              <Route
                path={`${match.url}/your-info`}
                render={() => <YourInfoForm handleSubmit={this.handleSubmit} />}
              />} />
              <Route
                path={`${match.url}/tools`}
                render={() => <ToolsForm handleSubmit={this.handleSubmit} profileUpdated />}
              />} />
              <Route
                path={`${match.url}/awards`}
                render={() => <AwardsForm handleSubmit={this.handleSubmit} profileUpdated />}
              />} />
              <Route
                path={`${match.url}/edit-pricing`}
                render={() => <PricingDetailsForm handleSubmit={this.handleSubmit} profileUpdated {...this.props} />}
              />} />
              <Route component={NotFound} />
            </Switch>
          </article>
        </div>
      </main>
    )
  }
}

EditProfilePage.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  updateProfile: model => dispatch(updateProfile(model))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfilePage))
