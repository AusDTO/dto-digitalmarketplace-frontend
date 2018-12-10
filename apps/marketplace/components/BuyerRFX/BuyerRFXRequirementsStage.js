import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'
import Textarea from 'shared/form/Textarea'
import NoticeBar from 'marketplace/components/NoticeBar/NoticeBar'
import dmapi from 'marketplace/services/apiClient'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import range from 'lodash/range'
import ErrorAlert from './ErrorAlert'
import styles from './BuyerRFXRequirementsStage.scss'

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
        <AUheadings level="1" size="xl">
          Requirements
        </AUheadings>
        <NoticeBar heavyFont className={styles.noticeBar}>
          Only invited sellers and other buyers can view attached documents and industry briefing details you provide.
        </NoticeBar>
        <ErrorAlert
          title="An error occurred"
          model={model}
          messages={{
            requiredRequirementsDocument: 'You must upload a requirements document',
            requiredResponseTemplate: 'You must upload a response template'
          }}
        />
        <AUheadings level="2" size="sm">
          Requirements document
        </AUheadings>
        <FilesInput
          title="Requirements document"
          hint="Documents must be in .DOC .XLS .PPT or .PDF format."
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
            <AUheadings level="2" size="sm">
              Response template
            </AUheadings>
            <FilesInput
              title="Response template"
              hint="Documents must be in .DOC .XLS .PPT or .PDF format."
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
        <AUheadings level="2" size="sm">
          Additional documents (optional)
        </AUheadings>
        {range(this.state.fileCount).map(i => (
          <FilesInput
            key={i}
            title="Additional documents (optional)"
            hint="Documents must be in .DOC .XLS .PPT or .PDF format."
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
