import React from 'react'
import PropTypes from 'prop-types'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import Feedback from 'marketplace/components/Feedback/Feedback'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const ClosedOpportunity = props => {
  const { app, brief, onFeedbackSubmit, setFocus } = props

  return (
    <React.Fragment>
      <AUpageAlert as="success" setFocus={setFocus}>
        <h1 className="au-display-lg">
          <strong>
            {brief.title} ({brief.id}) was closed successfully
          </strong>
        </h1>
        <div className={styles.marginTop2}>
          <AUbutton link={`${rootPath}/brief/${brief.id}/download-responses`}>Download seller responses</AUbutton>
        </div>
      </AUpageAlert>
      <br />
      <Feedback
        app={app}
        handleSubmit={onFeedbackSubmit}
        difficultyQuestion="How did you find updating your opportunity?"
        commentQuestion="How would you improve this experience?"
        objectAction="closed_opportunity"
      />
    </React.Fragment>
  )
}

ClosedOpportunity.defaultProps = {
  app: {},
  brief: {},
  onFeedbackSubmit: () => {},
  setFocus: () => {}
}

ClosedOpportunity.propTypes = {
  app: PropTypes.object.isRequired,
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  onFeedbackSubmit: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired
}

export default ClosedOpportunity
