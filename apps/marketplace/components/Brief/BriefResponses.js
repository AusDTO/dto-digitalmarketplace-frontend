import React from 'react'
import PropTypes from 'prop-types'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import styles from './BriefResponses.scss'

const getActions = (status, briefId, briefResponseId) => {
  let actions = <span />
  switch (status) {
    case 'draft':
      actions = (
        <React.Fragment>
          <a href={`${rootPath}/brief/${briefId}/specialist2/respond/${briefResponseId}`}>Edit draft</a>
          <a href={``}>
            <span className={styles.deleteLink}>Delete draft</span>
          </a>
        </React.Fragment>
      )
      break
    case 'submitted':
      actions = (
        <React.Fragment>
          <a href={`${rootPath}/brief/${briefId}/specialist2/respond/${briefResponseId}`}>Edit application</a>
          <a href={``}>
            <span className={styles.deleteLink}>Delete application</span>
          </a>
        </React.Fragment>
      )
      break
    default:
      break
  }
  return actions
}

const BriefResponses = props => (
  <React.Fragment>
    <div className="row">
      <div className="col-xs-12">
        <article role="main">
          <AUheadings level="1" size="xl">
            Edit or add candidates
          </AUheadings>
          <table className={`${styles.resultListing} col-xs-12`}>
            <thead>
              <tr className={styles.headingRow}>
                <th scope="col" className={styles.colName}>
                  Candidate
                </th>
                <th scope="col" className={styles.colDate}>
                  Date submitted
                </th>
                <th scope="col" className={styles.colAction}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {props.responses.map(response => (
                <tr key={`item.${response.id}`}>
                  <td className={styles.colName}>{`${response.specialistGivenNames} ${response.specialistSurname}`}</td>
                  <td className={styles.colDate}>
                    {response.submitted_at ? (
                      format(response.submitted_at, 'D-MM-YYYY')
                    ) : (
                      <span className={styles.notsubmitted}>Not submitted</span>
                    )}
                  </td>
                  <td className={styles.colAction}>{getActions(response.status, props.brief.id, response.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        {props.brief.numberOfSuppliers && props.responses.length < parseInt(props.brief.numberOfSuppliers, 10) && (
          <a href={`${rootPath}/brief/${props.brief.id}/specialist2/respond`} className="au-btn">
            Add another candidate
          </a>
        )}
        <a href={`${rootPath}/digital-marketplace/opportunities/${props.brief.id}`} className="au-btn au-btn--tertiary">
          Return to opportunity
        </a>
      </div>
    </div>
  </React.Fragment>
)

BriefResponses.defaultProps = {
  responses: [],
  brief: {}
}

BriefResponses.propTypes = {
  responses: PropTypes.array.isRequired,
  brief: PropTypes.object.isRequired
}

export default BriefResponses
