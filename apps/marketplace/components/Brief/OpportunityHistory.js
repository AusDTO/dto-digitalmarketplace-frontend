import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import AUheading from '@gov.au/headings/lib/js/react.js'

import PageHeader from 'marketplace/components/PageHeader/PageHeader'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const DocumentChange = (previous, current) => {
  let message = ''
  const removed = previous.filter(x => !current.includes(x))
  const added = current.filter(x => !previous.includes(x))
  if (removed.length > 0) {
    message += `${removed.join(' and ')} removed`
  }
  if (added.length > 0) {
    if (removed.length > 0) {
      message += ', and '
    }
    message += `${added.join(' and ')} added`
  }
  return <span>{message}</span>
}

const EditSummary = props => {
  const { edit } = props

  return (
    <div className={styles.marginTop2}>
      {(Object.prototype.hasOwnProperty.call(edit, 'title') ||
        Object.prototype.hasOwnProperty.call(edit, 'closingDate')) && (
        <AUheading level="2" size="xs">
          {format(edit.editedAt, 'DD MMMM YYYY [,] h[:]mma')}
        </AUheading>
      )}
      <ul>
        {Object.keys(edit).map(key => {
          if (key === 'title') {
            return (
              <li key={`${edit.editedAt}-${edit.title.newValue}`}>
                Title changed from &apos;{edit.title.oldValue}&apos; to &apos;{edit.title.newValue}&apos;
              </li>
            )
          } else if (key === 'closingDate') {
            return (
              <li key={`${edit.editedAt}-${edit.closingDate.newValue}`}>
                Closing date changed from &apos;{format(edit.closingDate.oldValue, 'DD MMMM YYYY')}&apos; to &apos;
                {format(edit.closingDate.newValue, 'DD MMMM YYYY')}
                &apos;
              </li>
            )
          } else if (['attachments', 'requirementsDocument', 'responseTemplate'].includes(key)) {
            return (
              <li key={`${edit.editedAt}`}>{DocumentChange(edit.attachments.oldValue, edit.attachments.newValue)}</li>
            )
          }

          return null
        })}
      </ul>
    </div>
  )
}

const OpportunityHistory = props => {
  const { brief, edits } = props

  return (
    <React.Fragment>
      <PageHeader actions={[]} organisation={`${brief.title} (${brief.id})`} title="History of updates" />
      {edits.length > 0 && edits.map(edit => <EditSummary edit={edit} key={edit.editedAt} />)}
      {edits.length === 0 && <p>No changes have been made to this opportunity.</p>}
      <div className={styles.marginTop2}>
        <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>Return to opportunity</a>
      </div>
    </React.Fragment>
  )
}

OpportunityHistory.defaultProps = {
  brief: {},
  edits: []
}

OpportunityHistory.propTypes = {
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  edits: PropTypes.arrayOf(
    PropTypes.shape({
      editedAt: PropTypes.string
    })
  )
}

export default OpportunityHistory
