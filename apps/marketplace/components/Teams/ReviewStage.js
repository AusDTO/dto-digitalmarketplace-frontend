import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'

import AUheading from '@gov.au/headings'
import formProps from 'shared/form/formPropsSelector'
import TeamTable from './TeamTable'

import styles from './ReviewStage.scss'
import commonStyles from './TeamStages.scss'

const ReviewStage = props => (
  <Form model={props.model}>
    <AUheading level="1" size="xl">
      Review
    </AUheading>
    <AUheading level="2" size="lg">
      Golden State Warriors
    </AUheading>
    <TeamTable
      teamMembers={[
        { name: 'Steph Curry', email: 'steph@warriors.com' },
        { name: 'Klay Thompson', email: 'klay@warriors.com' },
        { name: 'Kevin Durant', email: 'kd@warriors.com' }
      ]}
    />
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
  </Form>
)

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(ReviewStage)
