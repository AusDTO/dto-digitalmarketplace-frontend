import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import UserSelect from '../UserSelect/UserSelect'

import commonStyles from './TeamStages.scss'

const TeamLeadNameDescription = props => (
  <span>
    Team leads must already have a Digital Marketplace account in their name that ends in{' '}
    <span className={commonStyles.bold}>@{props.domain}</span>
  </span>
)

const TeamLeadsStage = props => {
  const teamLeadNameDescription = <TeamLeadNameDescription domain={props[props.model].domain} />

  return (
    <Form model={props.model} onSubmit={props.onSubmit} onSubmitFailed={props.onSubmitFailed}>
      <AUheading level="1" size="xl">
        Team leads
      </AUheading>
      <div className={commonStyles.stageContentContainer}>
        <p className={commonStyles.bold}>Team leads can:</p>
        <ul className={commonStyles.stageList}>
          <li>Add and remove members</li>
          <li>Specify what each member can do</li>
          <li>Create other team leads</li>
        </ul>
      </div>
      <UserSelect
        defaultValue={props[props.model].teamLeadName}
        description={teamLeadNameDescription}
        htmlFor="teamLeadName"
        id="teamLeadName"
        label="Team lead name"
        maxLength={100}
        model={`${props.model}.teamLeadName`}
        name="teamLeadName"
        placeholder=""
        validators={{}}
      />
      {props.formButtons}
    </Form>
  )
}

TeamLeadsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamLeadsStage)
