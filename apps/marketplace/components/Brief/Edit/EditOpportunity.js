import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { rootPath } from 'marketplace/routes'
import EditOpportunityTable from './EditOpportunityTable'
import { hasEdits, itemWasEdited, documentsWasEdited } from './helpers'
import { isValid as DocumentsIsValid } from './EditOpportunityDocuments'

import styles from '../../../main.scss'

class EditOpportunity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasErrors: false,
      showNoEditsAlert: false,
      showDocumentsErrorAlert: false,
      understandsEditProcess: false
    }

    this.showCheckBox = this.showCheckBox.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.validateEditProcessCheckBox = this.validateEditProcessCheckBox.bind(this)
  }

  handleSubmitClick = e => {
    const { brief, edits } = this.props
    const editsPending = hasEdits(brief, edits)

    if (!editsPending) {
      this.setState({
        showNoEditsAlert: true
      })

      e.preventDefault()
    }

    if (edits.documentsEdited && !DocumentsIsValid(brief, edits)) {
      this.setState({
        showDocumentsErrorAlert: true
      })

      e.preventDefault()
    }
  }

  showCheckBox = () => {
    const { brief, edits } = this.props
    return (
      itemWasEdited(brief.title, edits.title) ||
      itemWasEdited(brief.dates.closing_date, edits.closingDate) ||
      documentsWasEdited(brief, edits)
    )
  }

  validateEditProcessCheckBox = () => {
    const { understandsEditProcess } = this.state
    const showCheckBox = this.showCheckBox()

    if (showCheckBox && !understandsEditProcess) {
      this.setState({
        hasErrors: true
      })
    }

    return showCheckBox ? understandsEditProcess : true
  }

  render = () => {
    const { brief, edits, isOpenToAll, location, model, onSubmitEdits } = this.props
    const { hasErrors, showNoEditsAlert, showDocumentsErrorAlert } = this.state
    const checkBoxValidator = this.validateEditProcessCheckBox
    const showCheckBox = this.showCheckBox()

    return (
      <div className="col-xs-12">
        <Form
          model={model}
          onSubmit={onSubmitEdits}
          onSubmitFailed={() => {}}
          validateOn="submit"
          validators={{
            '': {
              checkBoxValidator
            }
          }}
        >
          <div className="row">
            <AUheading level="1" size="xl">
              Edit live opportunity
            </AUheading>
            {showNoEditsAlert && (
              <AUpageAlert as="error">
                <strong>You have not made any changes to the opportunity.</strong>
              </AUpageAlert>
            )}
            {showDocumentsErrorAlert && (
              <AUpageAlert as="error">
                <strong>
                  You have errors in the <Link to="/documents">edit documents</Link> section.
                </strong>
              </AUpageAlert>
            )}
            <p className={styles.fontSizeMd}>
              If you&apos;re having issues making the changes you need, <a href="/contact-us">contact us</a>.
            </p>
          </div>
          <div className="row">
            <EditOpportunityTable brief={brief} edits={edits} isOpenToAll={isOpenToAll} location={location} />
          </div>
          {hasErrors && (
            <div className="row">
              <ErrorAlert
                model={model}
                messages={{
                  checkBoxValidator: (
                    <AUbutton
                      as="tertiary"
                      className={`${styles.border0} ${styles.padding0}`}
                      onClick={() => document.getElementById('understandsEditProcess').focus()}
                    >
                      {isOpenToAll
                        ? 'Select the checkbox to confirm you understand sellers will be able to view previous versions of your updates.'
                        : 'Select the checkbox to confirm you understand invited sellers can view previous versions of your updates.'}
                    </AUbutton>
                  )
                }}
              />
            </div>
          )}
          {showCheckBox && (
            <div className="row">
              <AUcheckbox
                className={`${styles.marginTop2} ${hasErrors ? 'au-control-input--invalid' : ''}`}
                id="understandsEditProcess"
                label={
                  isOpenToAll
                    ? 'I understand if I submit these changes, sellers will be able to view previous versions of my updates.'
                    : 'I understand if I submit these changes, invited sellers will be notified and can view previous versions of my updates.'
                }
                name="understandsEditProcess"
                onChange={() => {}}
                onClick={e => {
                  this.setState({
                    hasErrors: false,
                    understandsEditProcess: e.target.checked
                  })
                }}
              />
            </div>
          )}
          <div className={`row ${styles.marginTop2}`}>
            <AUbutton onClick={this.handleSubmitClick} type="submit">
              Submit changes
            </AUbutton>
            <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/overview/${brief.lot}`}>
              Cancel all updates
            </AUbutton>
          </div>
        </Form>
      </div>
    )
  }
}

export default EditOpportunity
