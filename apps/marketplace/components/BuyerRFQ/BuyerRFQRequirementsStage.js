import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'
import dmapi from 'marketplace/services/apiClient'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import { requiredFile } from 'marketplace/components/validators'
import range from 'lodash/range'

export class BuyerRFQRequirementsStage extends Component {
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
      <div>
        <AUheadings level="1" size="xl">
          Requirements
        </AUheadings>
        <AUheadings level="2" size="sm">
          Requirements document
        </AUheadings>
        <p>This document will be displayed publicly. Do not include internal or private information.</p>
        <FilesInput
          title="Requirements document"
          fieldLabel="Upload document"
          name="requirementsDocument"
          model={`${model}.requirementsDocument.0`}
          formFields={1}
          url={`/brief/${this.props[model].id}/attachments`}
          api={dmapi}
          fileId={0}
          onReset={this.props.saveModel}
          onUploadSuccess={this.props.saveModel}
          validators={{
            requiredFile
          }}
          messages={{
            requiredFile: 'You must upload a requirements document'
          }}
        />
        {this.props[model].evaluationType.includes('Response template') && (
          <div>
            <AUheadings level="2" size="sm">
              Response template
            </AUheadings>
            <p>This document will be displayed publicly. Do not include internal or private information.</p>
            <FilesInput
              title="Response template"
              fieldLabel="Upload template"
              name="responseTemplate"
              model={`${model}.responseTemplate.0`}
              formFields={1}
              url={`/brief/${this.props[model].id}/attachments`}
              api={dmapi}
              fileId={0}
              onReset={this.props.saveModel}
              onUploadSuccess={this.props.saveModel}
              validators={{
                requiredFile
              }}
              messages={{
                requiredFile: 'You must upload a response template'
              }}
            />
          </div>
        )}
        <AUheadings level="2" size="sm">
          Additional documents (optional)
        </AUheadings>
        <p>This document will be displayed publicly. Do not include internal or private information.</p>
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
          />
        ))}
        {this.state.fileCount < 10 && (
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
        )}
      </div>
    )
  }
}

BuyerRFQRequirementsStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveModel: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQRequirementsStage)
