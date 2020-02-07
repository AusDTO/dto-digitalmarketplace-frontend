import React from 'react'
import PropTypes from 'prop-types'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import Feedback from 'marketplace/components/Feedback/Feedback'
import { rootPath } from 'marketplace/routes'

import styles from '../../../main.scss'

const EditedOpportunity = props => {
  const { app, brief, edits, onFeedbackSubmit, setFocus } = props

  return (
    <React.Fragment>
      {edits.onlySellersEdited ? (
        <AUpageAlert as="success" setFocus={setFocus}>
          <h1 className="au-display-lg">
            <strong>
              You have invited new seller/s to submit responses to {brief.title} ({brief.id})
            </strong>
          </h1>
          <div className={styles.marginTop2}>
            <p>You can view all invited sellers by selecting the opportunity on your dashboard.  </p>
          </div>
        </AUpageAlert>
      ) : (
        <AUpageAlert as="success" setFocus={setFocus}>
          <h1 className="au-display-lg">
            <strong>Your opportunity is now updated with the changes you made</strong>
          </h1>
          <div className={styles.marginTop2}>
            <p>Sellers will be able to view previous versions of your updates.</p>
            <div className={styles.marginTop1}>
              <AUbutton link={`${rootPath}/digital-marketplace/opportunities/${brief.id}`}>View opportunity</AUbutton>
            </div>
          </div>
        </AUpageAlert>
      )}
      <br />
      <Feedback
        app={app}
        handleSubmit={onFeedbackSubmit}
        difficultyQuestion="How did you find updating your opportunity?"
        commentQuestion="How would you improve this experience?"
        objectAction="edited_opportunity"
      />
    </React.Fragment>
  )
}

EditedOpportunity.defaultProps = {
  app: {},
  brief: {},
  edits: {
    onlySellersEdited: false
  },
  onFeedbackSubmit: () => {},
  setFocus: () => {}
}

EditedOpportunity.propTypes = {
  app: PropTypes.object.isRequired,
  brief: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  edits: PropTypes.shape({
    onlySellersEdited: PropTypes.bool.isRequired
  }),
  onFeedbackSubmit: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired
}

export default EditedOpportunity
