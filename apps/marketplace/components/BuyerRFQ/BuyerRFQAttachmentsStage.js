import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'
import dmapi from 'marketplace/services/apiClient'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import range from 'lodash/range'

export class BuyerRFQAttachmentsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileCount: 1
    }
  }

  componentDidMount() {
    this.updateDoneStatus()
    this.updateFileCountFromProps()
  }

  componentDidUpdate() {
    this.updateDoneStatus()
    this.updateFileCountFromProps()
  }

  updateFileCountFromProps() {
    if (this.state.fileCount < this.props[this.props.model].attachedDocumentURL.length) {
      this.setState({
        fileCount: this.props[this.props.model].attachedDocumentURL.length
      })
    }
  }

  updateDoneStatus() {
    const { model } = this.props
    if (this.props[model].attachedDocumentURL.length > 0 && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if (this.props[model].attachedDocumentURL.length === 0 && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
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
          Attachments
        </AUheadings>
        <p>The files you upload here will be attached to the email sent to your selected sellers.</p>
        {range(this.state.fileCount).map(i => (
          <FilesInput
            key={i}
            label="Attachment upload"
            hint="Attachment must be PDF or ODT format and a maximum of 20MB"
            fieldLabel="Choose attachment"
            name="attachedDocumentURL"
            model={`${model}.attachedDocumentURL.${i}`}
            formFields={1}
            url={`/brief/${this.props[model].id}/attachments`}
            api={dmapi}
            fileId={i}
            onReset={this.props.saveBrief}
            onUploadSuccess={this.props.saveBrief}
          />
        ))}
        <p>
          <a href="#add" onClick={() => this.addFileField()}>
            Add another
          </a>
        </p>
      </div>
    )
  }
}

BuyerRFQAttachmentsStage.propTypes = {
  model: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired,
  saveBrief: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQAttachmentsStage)
