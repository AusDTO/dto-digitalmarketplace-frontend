import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import TeamTable from './TeamTable'

import commonStyles from './TeamStages.scss'

const ReviewTeamStage = props => {
  const { formButtons, model, onSubmit, onSubmitFailed } = props
  const team = props[model]

  return (
    <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
      <AUheading level="1" size="xl">
        Review
      </AUheading>
      <AUheading level="2" size="lg">
        {team.name}
      </AUheading>
      <TeamTable teamLeads={team.teamLeads} teamMembers={team.teamMembers} />
      <AUheading level="2" size="lg">
        What happens next
      </AUheading>
      <div className={commonStyles.stageContentContainer}>
        <ul className={commonStyles.stageList}>
          <li>We will email each member to sign in with the email you have provided.</li>
          <li>Members will see any current opportunities created by other team members.</li>
          <li>Members will see all new opportunities created by other team members.</li>
        </ul>
      </div>
      {formButtons}
    </Form>
  )
}

ReviewTeamStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

ReviewTeamStage.propTypes = {
  formButtons: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(ReviewTeamStage)
