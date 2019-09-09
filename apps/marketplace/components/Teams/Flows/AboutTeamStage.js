import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'
import { required, validEmail, validGovernmentEmail } from 'marketplace/components/validators'

const AboutTeamStage = props => {
  const { agencyDomains, formButtons, model, onSubmit, onSubmitFailed } = props

  const governmentEmail = team => validGovernmentEmail(team.emailAddress, agencyDomains)
  const governmentEmailMessage = `You must use an email address ending in @${agencyDomains.join(', @')}.`

  const requiredName = team => required(team.name)
  const requiredNameMessage = 'A team name is required.'

  const validTeamEmail = team => validEmail(team.emailAddress)
  const validTeamEmailMessage = 'Please add a valid email address.'

  return (
    <Form
      model={model}
      onSubmit={onSubmit}
      onSubmitFailed={onSubmitFailed}
      validateOn="submit"
      validators={{
        '': {
          requiredName,
          validTeamEmail,
          governmentEmail
        }
      }}
    >
      <AUheading level="1" size="xl">
        Name and email
      </AUheading>
      <ErrorAlert
        model={model}
        messages={{
          requiredName: requiredNameMessage,
          validTeamEmail: validTeamEmailMessage,
          governmentEmail: governmentEmailMessage
        }}
      />
      <Textfield
        defaultValue={props[model].name}
        description=""
        htmlFor="name"
        id="name"
        label="Team name"
        maxLength={100}
        model={`${model}.name`}
        name="name"
        placeholder=""
        validators={{ required }}
        messages={{
          required: requiredNameMessage
        }}
      />
      <Textfield
        defaultValue={props[model].emailAddress}
        description="All communications about opportunities in this team will be sent to the creator of the opportunity and this email address:"
        htmlFor="emailAddress"
        id="emailAddress"
        label="Team email address (optional)"
        maxLength={100}
        model={`${model}.emailAddress`}
        name="emailAddress"
        placeholder=""
        validators={{
          validEmail,
          governmentEmail: teamEmailAddress => validGovernmentEmail(teamEmailAddress, agencyDomains)
        }}
        messages={{
          validEmail: validTeamEmailMessage,
          governmentEmail: governmentEmailMessage
        }}
      />
      {formButtons}
    </Form>
  )
}

AboutTeamStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

AboutTeamStage.propTypes = {
  formButtons: PropTypes.node.isRequired,
  model: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  currentUserEmailAddress: state.app.emailAddress,
  agencyDomains: state.app.agencyDomains
})

export default connect(mapStateToProps)(AboutTeamStage)
