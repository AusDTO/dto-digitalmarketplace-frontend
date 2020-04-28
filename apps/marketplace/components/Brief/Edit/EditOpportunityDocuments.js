import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect, Link } from 'react-router-dom'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import format from 'date-fns/format'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import dmapi from 'marketplace/services/apiClient'
import { requiredFile } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'

import styles from '../../../main.scss'

export const hasRequirementsDoc = (brief, edits) =>
  !brief.requirementsDocument ||
  brief.requirementsDocument.length === 0 ||
  edits.requirementsDocument.filter(x => x).length > 0

export const hasResponseTemplate = (brief, edits) =>
  !brief.responseTemplate || brief.responseTemplate.length === 0 || edits.responseTemplate.filter(x => x).length > 0

export const isValid = (brief, edits) => hasRequirementsDoc(brief, edits) && hasResponseTemplate(brief, edits)

class EditOpportunityDocuments extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0)

    this.state = {
      daysOpportunityOpenFor: differenceInCalendarDays(
        format(new Date(props.brief.dates.closing_time), 'YYYY-MM-DD'),
        props.brief.dates.published_date
      ),
      daysUntilOpportunityCloses: differenceInCalendarDays(props.brief.dates.closing_time, new Date()),
      showClosingDateWarning: false,
      redirectToEditsTable: false,
      initial: {}
    }

    this.state.daysUntilOpportunityCloses =
      this.state.daysUntilOpportunityCloses < 0 ? 0 : this.state.daysUntilOpportunityCloses

    if (
      this.state.daysUntilOpportunityCloses <= 2 ||
      this.state.daysUntilOpportunityCloses <= Math.round(this.state.daysOpportunityOpenFor / 2)
    ) {
      this.state.showClosingDateWarning = true
    }

    // populate the form model with documents from the brief if the form properties are empty and the documents have not been edited
    const data = { ...props[props.model] }
    const { attachments, requirementsDocument, responseTemplate, documentsEdited } = props[props.model]
    if (
      !documentsEdited &&
      attachments &&
      attachments.length === 0 &&
      props.brief.attachments &&
      props.brief.attachments.length > 0
    ) {
      data.attachments = [...props.brief.attachments]
    } else if (documentsEdited) {
      data.attachments = [...attachments]
    }
    if (
      requirementsDocument &&
      requirementsDocument.length === 0 &&
      props.brief.requirementsDocument &&
      props.brief.requirementsDocument.length > 0
    ) {
      data.requirementsDocument = [...props.brief.requirementsDocument]
    } else if (documentsEdited) {
      data.requirementsDocument = [...requirementsDocument]
    }
    if (
      responseTemplate &&
      responseTemplate.length === 0 &&
      props.brief.responseTemplate &&
      props.brief.responseTemplate.length > 0
    ) {
      data.responseTemplate = [...props.brief.responseTemplate]
    } else if (documentsEdited) {
      data.responseTemplate = [...responseTemplate]
    }
    this.props.updateModel(data)

    // keep the initial state of the form
    this.state.initial = { ...data }

    // This reset clears any invalid state from the parent form which prevents submit events from this component.
    props.resetValidity(props.model)

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
    this.handleDocumentChange = this.handleDocumentChange.bind(this)
  }

  handleCancelClick() {
    // restore to the form's initial state
    const data = { ...this.state.initial }
    this.props.updateModel(data)
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleContinueClick() {
    const data = { ...this.props[this.props.model] }
    const { attachments, requirementsDocument, responseTemplate } = this.props[this.props.model]
    data.attachments = [...attachments.filter(x => x)]
    data.requirementsDocument = [...requirementsDocument.filter(x => x)]
    data.responseTemplate = [...responseTemplate.filter(x => x)]
    this.props.updateModel(data)
    this.props.setOnlySellersEdited(false)
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleDocumentChange() {
    this.props.setDocumentsEdited(true)
  }

  renderDocumentRow(index, type) {
    const { model, brief } = this.props
    const getErrorMessage = docType => {
      let error = ''
      switch (docType) {
        case 'requirementsDocument':
          error = 'You must supply a requirements document'
          break
        case 'responseTemplate':
          error = 'You must supply a response template'
          break
        default:
          break
      }
      return error
    }
    const typeSwitch = {
      attachments: 'another',
      requirementsDocument: 'requirements',
      responseTemplate: 'response template'
    }
    return (
      <div key={`${type}-${index}`} className={`${styles.marginTop1} ${styles.greyBorderBottom1}`}>
        <FilesInput
          key={`${type}-${index}`}
          fieldLabel={`Upload ${typeSwitch[type]} document`}
          name={type}
          model={`${model}.${type}.${index}`}
          formFields={1}
          url={`/brief/${brief.id}/attachments`}
          api={dmapi}
          fileId={index}
          validators={{
            requiredFile: val => type === 'attachments' || requiredFile(val)
          }}
          messages={{
            requiredFile: getErrorMessage(type)
          }}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          onReset={this.handleDocumentChange}
          onUploadSuccess={this.handleDocumentChange}
        />
      </div>
    )
  }

  render = () => {
    const { model, brief } = this.props
    const { redirectToEditsTable, showClosingDateWarning, daysUntilOpportunityCloses } = this.state
    const { attachments, requirementsDocument, responseTemplate } = this.props[model]
    const documentCount = attachments.length + requirementsDocument.length + responseTemplate.length

    if (redirectToEditsTable) {
      return <Redirect to="/" />
    }

    return (
      <Form
        model={model}
        onSubmit={this.handleContinueClick}
        onSubmitFailed={() => {}}
        validateOn="submit"
        validators={{
          '': {
            hasRequirementsDoc: values => hasRequirementsDoc(brief, values),
            hasResponseTemplate: values => hasResponseTemplate(brief, values)
          }
        }}
      >
        <div className="row">
          <AUheading level="1" size="xl">
            Documents
          </AUheading>
          <p className={`${styles.marginTop1} ${styles.darkGrayText}`}>
            Documents must be in .DOCX, .XLSX, .PPTX, or .PDF format and no more than 32MB in size.
          </p>
          {documentCount === 0 && <p>There are no documents currently attached to this opportunity.</p>}
          {requirementsDocument.length > 0 && (
            <div className={`${styles.marginBottom2} ${styles.marginTop2}`}>
              <AUheading level="2" size="md">
                Requirements document
              </AUheading>
              {requirementsDocument.map((document, index) => this.renderDocumentRow(index, 'requirementsDocument'))}
            </div>
          )}
          {responseTemplate.length > 0 && (
            <div className={styles.marginBottom2}>
              <AUheading level="2" size="md">
                Response template
              </AUheading>
              {responseTemplate.map((document, index) => this.renderDocumentRow(index, 'responseTemplate'))}
            </div>
          )}
          <div className={`${styles.marginBottom2} ${styles.marginTop2}`}>
            <AUheading level="2" size="md">
              {responseTemplate.length > 0 || requirementsDocument.length > 0 ? (
                <span>Other attachments</span>
              ) : (
                <span>Attachments</span>
              )}
            </AUheading>
            {attachments.map((document, index) => (document ? this.renderDocumentRow(index, 'attachments') : ''))}
            <FilesInput
              fieldLabel={attachments.filter(x => x).length > 0 ? `Upload another attachment` : `Upload an attachment`}
              name="attachments"
              model={`${model}.attachments.${attachments.filter(x => x).length + 1}`}
              formFields={1}
              url={`/brief/${brief.id}/attachments`}
              api={dmapi}
              fileId={attachments.filter(x => x).length + 1}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onReset={this.handleDocumentChange}
              onUploadSuccess={this.handleDocumentChange}
            />
          </div>
        </div>
        {showClosingDateWarning && (
          <div className={`row ${styles.marginTop1}`}>
            <AUpageAlert as="warning" className={styles.pageAlert}>
              <AUheading level="2" size="lg">
                {daysUntilOpportunityCloses === 0 && 'Opportunity closing today!'}
                {daysUntilOpportunityCloses !== 0 &&
                  `Opportunity closing in ${daysUntilOpportunityCloses} day${`${
                    daysUntilOpportunityCloses > 1 ? 's' : ''
                  }`}!`}
              </AUheading>
              <p className={styles.noMaxWidth}>
                We recommend you <Link to="/closing-date">extend the closing date</Link> to allow invited sellers enough
                time to prepare and submit their responses.
              </p>
            </AUpageAlert>
          </div>
        )}
        <div className={`row ${styles.marginTop2}`}>
          <AUbutton type="submit">Continue</AUbutton>
          <AUbutton as="tertiary" onClick={this.handleCancelClick}>
            Cancel update
          </AUbutton>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  resetValidity: model => dispatch(actions.setValidity(model, true)),
  setOnlySellersEdited: onlySellersEdited =>
    dispatch(actions.change(`${props.model}.onlySellersEdited`, onlySellersEdited)),
  updateModel: data => dispatch(actions.change(props.model, data)),
  setDocumentsEdited: edited => dispatch(actions.change(`${props.model}.documentsEdited`, edited))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunityDocuments)
