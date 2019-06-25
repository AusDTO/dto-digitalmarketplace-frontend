import React from 'react'

import { AUcheckbox } from '@gov.au/control-input'

import commonStyles from './TeamStages.scss'
import styles from './PermissionsStage.scss'

const PermissionsTable = props => (
  <table className={`${styles.permissionsTable} ${commonStyles.stageTable}`}>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Create drafts</th>
        <th scope="col">Publish opportunities</th>
        <th scope="col">Answer seller questions</th>
        <th scope="col">Download responses</th>
        <th scope="col">Create work orders</th>
        <th scope="col">Download reporting data</th>
      </tr>
    </thead>
    <tbody>
      {Object.values(props.teamMembers).map(teamMember => (
        <tr key={`item.${teamMember}`}>
          <td>{teamMember}</td>
          <td>
            <AUcheckbox
              className={styles.permissionsTableCheckbox}
              id="create-drafts-checkbox"
              label=""
              name="permissions"
            />
          </td>
          <td>
            <AUcheckbox
              className={styles.permissionsTableCheckbox}
              id="publish-opportunities-checkbox"
              label=""
              name="permissions"
            />
          </td>
          <td>
            <AUcheckbox
              className={styles.permissionsTableCheckbox}
              id="answer-seller-questions-checkbox"
              label=""
              name="permissions"
            />
          </td>
          <td>
            <AUcheckbox
              className={styles.permissionsTableCheckbox}
              id="download-responses-checkbox"
              label=""
              name="permissions"
            />
          </td>
          <td>
            <AUcheckbox
              className={styles.permissionsTableCheckbox}
              id="create-work-orders-checkbox"
              label=""
              name="permissions"
            />
          </td>
          <td>
            <AUcheckbox
              className={styles.permissionsTableCheckbox}
              id="download-reporting-data-checkbox"
              label=""
              name="permissions"
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default PermissionsTable
