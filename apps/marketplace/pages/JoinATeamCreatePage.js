import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { rootPath } from 'marketplace/routes'

const JoinATeamCreatePage = props => (
  <DocumentTitle title="Create a team - Digital Marketplace">
    <div className="row">
      {(props.isPartOfTeam || !props.mustJoinTeam) && <Redirect to={`${rootPath}/buyer-dashboard`} />}
      <div className="col-xs-12">
        <AUheading level="1" size="xl">
          Create a new team
        </AUheading>
        <p>To create a new team, you will need approval from a lead in an existing team.</p>
        <p>
          Please <a href="/contact-us">contact us</a> with your proposed team name and we will request permission on
          your behalf.
        </p>
      </div>
    </div>
  </DocumentTitle>
)

const mapStateToProps = state => ({
  isPartOfTeam: state.app.isPartOfTeam,
  mustJoinTeam: state.app.mustJoinTeam
})

export default withRouter(connect(mapStateToProps)(JoinATeamCreatePage))
