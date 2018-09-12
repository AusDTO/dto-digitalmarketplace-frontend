import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import { requiredFile } from 'marketplace/components/validators'
import FilesInput from 'shared/form/FilesInput'
import dmapi from 'marketplace/services/apiClient'
import AUheadings from '@gov.au/headings/lib/js/react.js'

export class BuyerRFQRequirementsStage extends Component {
  componentDidUpdate() {
    const { model } = this.props
    if (this.props[model].attachedDocumentURL.length > 0 && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if (this.props[model].attachedDocumentURL.length === 0 && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
    }
  }

  render() {
    const { model } = this.props
    return (
      <div>
        <AUheadings level="1" size="xl">
          Requirements
        </AUheadings>
        <FilesInput
          label="Requirements upload"
          hint="Attachment must be PDF or ODT format and a maximum of 20MB"
          fieldLabel="Upload document"
          description="Upload your completed Request for Quote template. This will be attached to the email."
          name="attachedDocumentURL"
          model={`${model}.attachedDocumentURL.1`}
          formFields={1}
          url={`/brief/1/requirements`}
          api={dmapi}
          fileId={1}
          validators={{
            requiredFile
          }}
          messages={{
            requiredFile: 'Choose a file for your requirements'
          }}
        />
      </div>
    )
  }
}

BuyerRFQRequirementsStage.propTypes = {
  model: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQRequirementsStage)
