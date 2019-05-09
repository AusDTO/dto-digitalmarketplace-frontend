import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

import commonStyles from './TeamStages.scss'

const TeamMembersStage = props => (
  <Form model={props.model}>
    <AUheading level="1" size="xl">
      Team members
    </AUheading>
    <div className={commonStyles.stageContentContainer}>
      <p>
        Members must already have a Digital Marketplace account in their name that ends in{' '}
        <span className={commonStyles.bold}>@humanservices.gov.au</span>
      </p>
    </div>
    <Textfield
      defaultValue={props[props.model].teamMemberName}
      description=""
      htmlFor="teamMemberName"
      id="teamMemberName"
      label="Name"
      maxLength={100}
      model={`${props.model}.teamMemberName`}
      name="teamMemberName"
      placeholder=""
      validators={{}}
    />
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(TeamMembersStage)
