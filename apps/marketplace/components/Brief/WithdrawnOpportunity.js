import React from 'react'
import PropTypes from 'prop-types'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import Feedback from 'marketplace/components/Feedback/Feedback'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const WithdrawnOpportunity = props => {
  const { app, brief, isOpenToAll, onFeedbackSubmit, setFocus } = props

  return (
    <React.Fragment>
      <AUpageAlert as="success" setFocus={setFocus}>
        <h1 className="au-display-lg">
          <strong>
            &apos;{brief.title}&apos; ({brief.id}) was withdrawn successfully
          </strong>
        </h1>
        <div className={styles.marginTop2}>
          <p>
            The reason for withdrawal is now displayed on the{' '}
            <a href={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>opportunity page</a>.{' '}
            {isOpenToAll
              ? 'Sellers who have drafted or submitted responses to this opportunity have been notified'
              : 'Invited sellers have been notified'}
            .
          </p>
        </div>
      </AUpageAlert>
      <br />
      <Feedback
        app={app}
        handleSubmit={onFeedbackSubmit}
        difficultyQuestion="How did you find updating your opportunity?"
        commentQuestion="How would you improve this experience?"
        objectAction="withdrew_opportunity"
      />
    </React.Fragment>
  )
}

WithdrawnOpportunity.defaultProps = {
  app: {},
  brief: {},
  isOpenToAll: false,
  onFeedbackSubmit: () => {},
  setFocus: () => {}
}

WithdrawnOpportunity.propTypes = {
  app: PropTypes.object.isRequired,
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  isOpenToAll: PropTypes.bool.isRequired,
  onFeedbackSubmit: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired
}

export default WithdrawnOpportunity
