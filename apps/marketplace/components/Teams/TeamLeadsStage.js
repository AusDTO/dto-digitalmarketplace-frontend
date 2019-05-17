import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

import commonStyles from './TeamStages.scss'

const teamLeadNameDescription = (
  <span>
    Team leads must already have a Digital Marketplace account in their name that ends in{' '}
    <span className={commonStyles.bold}>@humanservices.gov.au</span>
  </span>
)

const TeamLeadsStage = props => (
  <Form model={props.model}>
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
    <Textfield
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

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamLeadsStage)
