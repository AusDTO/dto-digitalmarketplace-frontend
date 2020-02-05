import React, { Component } from 'react'
import { Form } from 'react-redux-form'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import { AUcheckbox } from '@gov.au/control-input/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { rootPath } from 'marketplace/routes'
import EditOpportunityTable from './EditOpportunityTable'

import styles from '../../../main.scss'

export const itemWasEdited = (item, edit) => edit !== '' && edit !== item

class EditOpportunity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasErrors: false,
      understandsEditProcess: false
    }

    this.showCheckBox = this.showCheckBox.bind(this)
    this.validateEditProcessCheckBox = this.validateEditProcessCheckBox.bind(this)
  }

  showCheckBox = () => {
    const { brief, edits } = this.props
    return itemWasEdited(brief.title, edits.title) || itemWasEdited(brief.dates.closing_date, edits.closingDate)
  }

  validateEditProcessCheckBox = () => {
    const { understandsEditProcess } = this.state

    if (this.showCheckBox() && !understandsEditProcess) {
      this.setState({
        hasErrors: true
      })
    }

    return understandsEditProcess
  }

  render = () => {
    const { brief, edits, isOpenToAll, location, model, onSubmitEdits } = this.props
    const { hasErrors } = this.state
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
                      Select the checkbox to confirm you understand invited sellers can view previous versions of your
                      updates.
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
            <AUbutton type="submit">Submit changes</AUbutton>
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
