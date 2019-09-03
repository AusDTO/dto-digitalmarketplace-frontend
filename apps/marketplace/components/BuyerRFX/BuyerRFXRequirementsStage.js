import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'
import Textarea from 'shared/form/Textarea'
import dmapi from 'marketplace/services/apiClient'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import range from 'lodash/range'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import styles from './BuyerRFXRequirementsStage.scss'

const RequirementsTemplateHint = (
  <span>
    You can use the{' '}
    <a href="/static/media/documents/Requirements-Document-template.docx" target="_blank" rel="noreferer noopener">
      Marketplace template (DOCX 58 KB)
    </a>{' '}
    if you do not have your own. Make sure you update it with your Agency&apos;s requirements.
  </span>
)

const ResponseTemplateHint = (
  <span>
    You can use the{' '}
    <a href="/static/media/documents/Response-Template.docx" target="_blank" rel="noreferer noopener">
      Marketplace template (DOCX 67 KB)
    </a>{' '}
    if you do not have your own.
  </span>
)

export class BuyerRFXRequirementsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileCount: 1
    }
  }

  componentDidMount() {
    this.updateFileCountFromProps()
  }

  componentDidUpdate() {
    this.updateFileCountFromProps()
  }

  updateFileCountFromProps() {
    if (this.state.fileCount < this.props[this.props.model].attachments.length) {
      this.setState({
        fileCount: this.props[this.props.model].attachments.length
      })
    }
  }

  addFileField() {
    this.setState(curState => {
      const newState = { ...curState }
      newState.fileCount += 1
      return newState
    })
  }

  render() {
    const { model } = this.props
    return (
      <Form
        model={model}
        validators={{
          '': {
            requiredRequirementsDocument: formValues =>
              formValues.requirementsDocument &&
              formValues.requirementsDocument.length > 0 &&
              formValues.requirementsDocument.every(val => val),
            requiredResponseTemplate: formValues =>
              !formValues.evaluationType.includes('Response template') ||
              (formValues.evaluationType.includes('Response template') &&
                formValues.responseTemplate &&
                formValues.responseTemplate.length > 0 &&
                formValues.responseTemplate.every(val => val))
          }
        }}
        onSubmit={this.props.onSubmit}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Requirements
        </AUheading>
        <AUcallout description="" className={styles.noticeBar}>
          <strong>
            Only invited sellers and other buyers can view attached documents. Only invited sellers can view industry
            briefing details you provide.
          </strong>
        </AUcallout>
        <ErrorAlert
          model={model}
          messages={{
            requiredRequirementsDocument: 'You must upload a requirements document',
            requiredResponseTemplate: 'You must upload a response template'
          }}
        />
        <p>Documents must be in .DOC .XLS .PPT or .PDF format.</p>
        <AUheading level="2" size="sm">
          Requirements document
        </AUheading>
        <FilesInput
          title="Requirements document"
          description={RequirementsTemplateHint}
          fieldLabel="Upload document"
          name="requirementsDocument"
          model={`${model}.requirementsDocument.0`}
          formFields={1}
          url={`/brief/${this.props[model].id}/attachments`}
          api={dmapi}
          fileId={0}
          onReset={this.props.saveModel}
          onUploadSuccess={this.props.saveModel}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        />
        {this.props[model].evaluationType.includes('Response template') && (
          <div>
            <AUheading level="2" size="sm">
              Response template
            </AUheading>
            <FilesInput
              title="Response template"
              description={ResponseTemplateHint}
              fieldLabel="Upload template"
              name="responseTemplate"
              model={`${model}.responseTemplate.0`}
              formFields={1}
              url={`/brief/${this.props[model].id}/attachments`}
              api={dmapi}
              fileId={0}
              onReset={this.props.saveModel}
              onUploadSuccess={this.props.saveModel}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
          </div>
        )}
        <AUheading level="2" size="sm">
          Additional documents (optional)
        </AUheading>
        {range(this.state.fileCount).map(i => (
          <FilesInput
            key={i}
            title="Additional documents (optional)"
            fieldLabel="Upload document"
            name="attachments"
            model={`${model}.attachments.${i}`}
            formFields={1}
            url={`/brief/${this.props[model].id}/attachments`}
            api={dmapi}
            fileId={i}
            onReset={this.props.saveModel}
            onUploadSuccess={this.props.saveModel}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />
        ))}
        {this.state.fileCount < 10 && (
          <div className={styles.addAnother}>
            <p>
              <a
                href="#add"
                onClick={e => {
                  e.preventDefault()
                  this.addFileField()
                }}
              >
                Add another
              </a>
            </p>
          </div>
        )}
        <Textarea
          model={`${model}.industryBriefing`}
          label="Industry briefing (optional)"
          description="Make sure you include the date, time and access details of your briefing."
          name="industryBriefing"
          id="industryBriefing"
          htmlFor="industryBriefing"
          defaultValue={this.props[model].industryBriefing}
          controlProps={{ limit: 150 }}
        />
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerRFXRequirementsStage.defaultProps = {
  onSubmit: () => {}
}

BuyerRFXRequirementsStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveModel: PropTypes.func.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFXRequirementsStage)
