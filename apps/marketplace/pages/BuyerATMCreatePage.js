import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createATMBrief } from 'marketplace/actions/briefActions'
import { rootPath } from 'marketplace/routes'
import { hasPermission } from 'marketplace/components/helpers'
import LoadingIndicatorFullPage from 'shared/LoadingIndicatorFullPage/LoadingIndicatorFullPage'

export class BuyerATMCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      briefId: 0
    }
  }

  componentDidMount() {
    this.props.createATMBrief().then(response => {
      if (response.status === 200) {
        this.setState({
          briefId: parseInt(response.data.id, 10)
        })
      }
    })
  }

  render() {
    const { isPartOfTeam, isTeamLead, teams } = this.props

    if (!hasPermission(isPartOfTeam, isTeamLead, teams, 'create_drafts')) {
      return <Redirect to={`${rootPath}/request-access/create_drafts`} />
    }

    if (this.state.briefId) {
      return <Redirect to={`${rootPath}/brief/${this.state.briefId}/overview/atm`} />
    }

    return <LoadingIndicatorFullPage />
  }
}

const mapStateToProps = state => ({
  csrfToken: state.app.csrfToken,
  teams: state.app.teams,
  isTeamLead: state.app.isTeamLead,
  isPartOfTeam: state.app.isPartOfTeam
})

const mapDispatchToProps = dispatch => ({
  createATMBrief: () => dispatch(createATMBrief())
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerATMCreatePage)
