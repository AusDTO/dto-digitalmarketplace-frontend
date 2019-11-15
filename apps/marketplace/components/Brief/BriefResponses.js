import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import styles from './BriefResponses.scss'

class BriefResponses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteAlert: false,
      idToDelete: 0
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
  }

  getActions(status, briefId, briefResponseId) {
    let actions = <span />
    switch (status) {
      case 'draft':
        actions = (
          <React.Fragment>
            <a href={`${rootPath}/brief/${briefId}/specialist2/respond/${briefResponseId}`}>Edit draft</a>
            <a href={``} className={styles.deleteLink} onClick={e => this.handleDeleteClick(e, briefResponseId)}>
              Delete draft
            </a>
          </React.Fragment>
        )
        break
      case 'submitted':
        actions = (
          <React.Fragment>
            <a href={`${rootPath}/brief/${briefId}/specialist2/respond/${briefResponseId}`}>Edit application</a>
            <a href={``} className={styles.deleteLink} onClick={e => this.handleDeleteClick(e, briefResponseId)}>
              Delete application
            </a>
          </React.Fragment>
        )
        break
      default:
        break
    }
    return actions
  }

  getCandidateNameByResponseId(id) {
    let name = ''
    const response = this.props.responses.find(r => r.id === id)
    if (response) {
      name = `${response.specialistGivenNames} ${response.specialistSurname}`
    }
    return name
  }

  handleDeleteClick(e, briefResponseId) {
    e.preventDefault()
    this.setState({
      showDeleteAlert: true,
      idToDelete: briefResponseId
    })
  }

  toggleDeleteAlert() {
    this.setState(prevState => ({
      showDeleteAlert: !prevState.showDeleteAlert
    }))
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-xs-12">
            <article role="main">
              {this.state.showDeleteAlert && this.state.idToDelete > 0 && (
                <div className={styles.deleteAlert}>
                  <AUpageAlert as="warning">
                    <AUheadings level="2" size="md">
                      Are you sure you want to delete {this.getCandidateNameByResponseId(this.state.idToDelete)}&apos;s
                      application?
                    </AUheadings>
                    <AUbutton onClick={() => this.props.onBriefResponseDelete(this.state.idToDelete)}>
                      Yes, delete application
                    </AUbutton>
                    <AUbutton as="secondary" onClick={this.toggleDeleteAlert}>
                      Do not delete application
                    </AUbutton>
                  </AUpageAlert>
                </div>
              )}
              <AUheadings level="1" size="xl">
                Edit or add candidates
              </AUheadings>
              {this.props.responses.length > 0 && (
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
                    {this.props.responses.map(response => (
                      <tr key={`item.${response.id}`}>
                        <td
                          className={styles.colName}
                        >{`${response.specialistGivenNames} ${response.specialistSurname}`}</td>
                        <td className={styles.colDate}>
                          {response.submitted_at ? (
                            format(response.submitted_at, 'D-MM-YYYY')
                          ) : (
                            <span className={styles.notsubmitted}>Not submitted</span>
                          )}
                        </td>
                        <td className={styles.colAction}>
                          {this.getActions(response.status, this.props.brief.id, response.id)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {this.props.responses.length === 0 && <p>You do not have any responses for this brief.</p>}
            </article>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.props.brief.numberOfSuppliers &&
              this.props.responses.length < parseInt(this.props.brief.numberOfSuppliers, 10) && (
                <a href={`${rootPath}/brief/${this.props.brief.id}/specialist2/respond`} className="au-btn">
                  Add {this.props.responses.length > 0 ? 'another' : 'a'} candidate
                </a>
              )}
            <a
              href={`${rootPath}/digital-marketplace/opportunities/${this.props.brief.id}`}
              className="au-btn au-btn--tertiary"
            >
              Return to opportunity
            </a>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

BriefResponses.defaultProps = {
  responses: [],
  brief: {},
  onBriefResponseDelete: () => {}
}

BriefResponses.propTypes = {
  responses: PropTypes.array.isRequired,
  brief: PropTypes.object.isRequired,
  onBriefResponseDelete: PropTypes.func
}

export default BriefResponses
