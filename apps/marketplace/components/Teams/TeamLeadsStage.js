import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheadings from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

import styles from './TeamLeadsStage.scss'

const teamLeadNameDescription = (
  <span>
    Team leads must already have a Digital Marketplace account in their name that ends in{' '}
    <span className={styles.bold}>@humanservices.gov.au</span>
  </span>
)

const TeamLeadsStage = props => (
  <Form model={props.model}>
    <AUheadings level="1" size="xl">
      Team leads
    </AUheadings>
    <div className={styles.teamLeadPermissions}>
      <p className={styles.bold}>Team leads can:</p>
      <ul className={styles.permissionList}>
        <li>Add and remove members</li>
        <li>Specify what each member can do</li>
        <li>Create other team leads</li>
      </ul>
    </div>
    <Textfield
      defaultValue={props[props.model].emailAddress}
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
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamLeadsStage)
