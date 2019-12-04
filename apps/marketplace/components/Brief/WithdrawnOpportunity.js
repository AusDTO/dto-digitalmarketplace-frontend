import React from 'react'
import PropTypes from 'prop-types'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import Feedback from 'marketplace/components/Feedback/Feedback'
import { rootPath } from 'marketplace/routes'

import styles from '../../main.scss'

const WithdrawnOpportunity = props => {
  const { app, brief, handleSubmit, setFocus } = props

  return (
    <React.Fragment>
      <AUpageAlert as="success" setFocus={setFocus}>
        <h1 className="au-display-lg">
          <strong>
            {brief.title} ({brief.id}) was withdrawn successfully
          </strong>
        </h1>
        <div className={styles.marginTop2}>
          <AUbutton link={`${rootPath}/brief/${brief.id}/download-responses`}>Download seller responses</AUbutton>
        </div>
      </AUpageAlert>
      <br />
      <Feedback
        app={app}
        handleSubmit={handleSubmit}
        difficultyQuestion="How did you find updating your opportunity?"
        commentQuestion="How would you improve this experience?"
        objectAction="closed_opportunity"
      />
    </React.Fragment>
  )
}

WithdrawnOpportunity.defaultProps = {
  app: {},
  handleSubmit: () => {},
  setFocus: () => {}
}

WithdrawnOpportunity.propTypes = {
  app: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired
}

export default WithdrawnOpportunity
