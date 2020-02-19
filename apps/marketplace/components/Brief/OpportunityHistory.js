import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import AUheading from '@gov.au/headings/lib/js/react.js'

import PageHeader from 'marketplace/components/PageHeader/PageHeader'

import styles from '../../main.scss'

const EditSummary = props => {
  const { edit } = props

  return (
    <div className={styles.marginTop2}>
      <AUheading level="2" size="xs">
        {format(edit.editedAt, 'DD MMMM YYYY [,] h[:]mma')}
      </AUheading>
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