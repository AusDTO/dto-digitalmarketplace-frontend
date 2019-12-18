import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ConfirmActionAlert from 'marketplace/components/Alerts/ConfirmActionAlert'
import format from 'date-fns/format'
import { rootPath } from 'marketplace/routes'
import stylesMain from 'marketplace/main.scss'
import styles from './BriefResponses.scss'

class BriefResponses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDeleteAlert: false,
      idToDelete: 0,
      statusOfResponseToDelete: ''
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
            <a
              href={``}
              className={styles.deleteLink}
              onClick={e => this.handleDeleteClick(e, briefResponseId, status)}
            >
              Delete draft
            </a>
          </React.Fragment>
        )
        break
      case 'submitted':
        actions = (
          <React.Fragment>
            <a href={`${rootPath}/brief/${briefId}/specialist2/respond/${briefResponseId}`}>Edit response</a>
            <a
              href={``}
              className={styles.deleteLink}
              onClick={e => this.handleDeleteClick(e, briefResponseId, status)}
            >
              Withdraw candidate
            </a>
          </React.Fragment>
        )
        break
      default:
        break
    }
    return actions
  }

  getCandidateNameByResponseId(id, useStyle = false) {
    let name = 'Draft candidate'
    const response = this.props.responses.find(r => r.id === id)
    if (response.specialistGivenNames && response.specialistSurname) {
      name = `${response.specialistGivenNames} ${response.specialistSurname}`
    } else if (useStyle) {
      name = <span className={styles.placeHolder}>{name}</span>
    }
    return name
  }

  canSubmitAnotherCandidate() {
    return (
      this.props.brief.numberOfSuppliers &&
      this.props.responses.length < parseInt(this.props.brief.numberOfSuppliers, 10)
    )
  }

  handleDeleteClick(e, briefResponseId, status) {
    e.preventDefault()
    this.setState({
      showDeleteAlert: true,
      idToDelete: briefResponseId,
      statusOfResponseToDelete: status
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
                <ConfirmActionAlert
                  cancelButtonText={
                    this.state.statusOfResponseToDelete === 'submitted'
                      ? 'Do not withdraw application'
                      : 'Do not delete draft'
                  }
                  confirmButtonText={
                    this.state.statusOfResponseToDelete === 'submitted'
                      ? 'Yes, withdraw application'
                      : 'Yes, delete draft'
                  }
                  content={
                    <React.Fragment>
                      {this.state.statusOfResponseToDelete === 'submitted' && (
                        <AUheading level="2" size="md">
                          Are you sure you want to withdraw {this.getCandidateNameByResponseId(this.state.idToDelete)}
                          &apos;s application?
                        </AUheading>
                      )}
                      {this.state.statusOfResponseToDelete === 'draft' && (
                        <AUheading level="2" size="md">
                          Are you sure you want to delete {this.getCandidateNameByResponseId(this.state.idToDelete)}
                          &apos;s draft application?
                        </AUheading>
                      )}
                    </React.Fragment>
                  }
                  handleCancelClick={this.toggleDeleteAlert}
                  handleConfirmClick={() => this.props.onBriefResponseDelete(this.state.idToDelete)}
                  type="warning"
                />
              )}
              <span className={styles.lighter}>
                {this.props.brief.title} ({this.props.brief.id})
              </span>
              <div>
                <AUheading level="1" size="xl">
                  Edit or submit candidates
                </AUheading>
              </div>
              <p>Buyers will only be able to view your submitted candidates after the closing date.</p>
              {this.props.responses.length > 0 && (
                <table className={`${stylesMain.defaultStyle} ${stylesMain.marginTop1} col-xs-12`}>
                  <thead>
                    <tr className={stylesMain.headingRow}>
                      <th scope="col" className={`${stylesMain.tableColumnWidth11} ${stylesMain.textAlignLeft}`}>
                        Candidate
                      </th>
                      <th scope="col" className={`${stylesMain.tableColumnWidth3} ${stylesMain.textAlignLeft}`}>
                        Date submitted
                      </th>
                      <th scope="col" className={`${stylesMain.tableColumnWidth2} ${stylesMain.textAlignLeft}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.responses.map(response => (
                      <tr key={`item.${response.id}`}>
                        <td className={stylesMain.tableColumnWidth11}>
                          {this.getCandidateNameByResponseId(response.id, true)}
                        </td>
                        <td className={`${stylesMain.tableColumnWidth3} ${stylesMain.textAlignLeft}`}>
                          {response.submitted_at ? (
                            format(response.submitted_at, 'D MMMM YYYY')
                          ) : (
                            <span className={styles.placeHolder}>Not submitted</span>
                          )}
                        </td>
                        <td
                          className={`${stylesMain.tableColumnWidth2} ${stylesMain.textAlignLeft} ${styles.colAction}`}
                        >
                          {this.getActions(response.status, this.props.brief.id, response.id)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {this.props.responses.length === 0 && parseInt(this.props.brief.numberOfSuppliers, 10) > 1 && (
                <p className={styles.lighter}>You can submit up to {this.props.brief.numberOfSuppliers} candidates.</p>
              )}
              {this.props.responses.length === 0 && parseInt(this.props.brief.numberOfSuppliers, 10) === 1 && (
                <p className={styles.lighter}>You can submit 1 candidate.</p>
              )}
            </article>
          </div>
        </div>
        <div className="row">
          <div className={`${stylesMain.marginTop2} col-xs-12`}>
            {this.canSubmitAnotherCandidate() && (
              <a href={`${rootPath}/brief/${this.props.brief.id}/specialist2/respond`} className="au-btn">
                Submit {this.props.responses.length > 0 ? 'another' : 'a'} candidate
              </a>
            )}
            <a
              href={`${rootPath}/digital-marketplace/opportunities/${this.props.brief.id}`}
              className={this.canSubmitAnotherCandidate() ? `au-btn au-btn--tertiary` : ''}
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
