import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

const AboutTeamStage = props => {
  const { formButtons, model, onSubmit, onSubmitFailed } = props

  return (
    <Form model={model} onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
      <AUheading level="1" size="xl">
        Name and email
      </AUheading>
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
        validators={{}}
      />
      <Textfield
        defaultValue={props[model].emailAddress}
        description="All communications about opportunities in this team will be copied to this email address."
        htmlFor="emailAddress"
        id="emailAddress"
        label="Team email address (optional)"
        maxLength={100}
        model={`${model}.emailAddress`}
        name="emailAddress"
        placeholder=""
        validators={{}}
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
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(AboutTeamStage)