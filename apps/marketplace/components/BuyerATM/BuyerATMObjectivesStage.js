import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'
import Textarea from 'shared/form/Textarea'
import dmapi from 'marketplace/services/apiClient'
import AUheading from '@gov.au/headings/lib/js/react.js'
import range from 'lodash/range'
import { required } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'

export class BuyerATMRequirementsStage extends Component {
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
            requiredBackgroundInformation: formValues => required(formValues.backgroundInformation),
            requiredOutcome: formValues => required(formValues.outcome),
            requiredEndUsers: formValues => required(formValues.endUsers),
            requiredWorkAlreadyDone: formValues => required(formValues.workAlreadyDone)
          }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheading level="1" size="xl">
          Objectives
        </AUheading>
        <ErrorAlert
          model={model}
          messages={{
            requiredBackgroundInformation: 'Enter the reason the work is being done',
            requiredOutcome: 'Enter the key problem to be solved',
            requiredEndUsers: 'Enter the user needs for your opportunity',
            requiredWorkAlreadyDone: 'Enter the work already done for your opportunity'
          }}
        />
        <Textarea
          model={`${this.props.model}.backgroundInformation`}
          label="Why is the work being done?"
          name="backgroundInformation"
          id="backgroundInformation"
          htmlFor="backgroundInformation"
          defaultValue={this.props[this.props.model].backgroundInformation}
          controlProps={{ limit: 500 }}
          validators={{
            required
          }}
          messages={{
            limitWords: '"Why is the work being done?" has exceeded the 500 word limit'
          }}
        />
        <Textarea
          model={`${this.props.model}.outcome`}
          label="What's the key problem you need to solve?"
          name="outcome"
          id="outcome"
          htmlFor="outcome"
          defaultValue={this.props[this.props.model].outcome}
          controlProps={{ limit: 500 }}
          validators={{
            required
          }}
          messages={{
            limitWords: '"What\'s the key problem you need to solve?" has exceeded the 500 word limit'
          }}
        />
        <Textarea
          model={`${this.props.model}.endUsers`}
          label="Describe the users and their needs"
          name="endUsers"
          id="endUsers"
          htmlFor="endUsers"
          defaultValue={this.props[this.props.model].endUsers}
          controlProps={{ limit: 500 }}
          validators={{
            required
          }}
          messages={{
            limitWords: '"Describe the users and their needs" has exceeded the 500 word limit'
          }}
        />
        <Textarea
          model={`${this.props.model}.workAlreadyDone`}
          label="What work has already been done?"
          name="workAlreadyDone"
          id="workAlreadyDone"
          htmlFor="workAlreadyDone"
          defaultValue={this.props[this.props.model].workAlreadyDone}
          controlProps={{ limit: 500 }}
          validators={{
            required
          }}
          messages={{
            limitWords: '"What work has already been done?" has exceeded the 500 word limit'
          }}
        />
        {this.props[model].evaluationType.includes('Response template') && (
          <div>
            <AUheading level="2" size="sm">
              Response template
            </AUheading>
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
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
          </div>
        )}
        <AUheading level="2" size="sm">
          Additional documents (optional)
        </AUheading>
        <p>
          Documents must be in .DOC .XLS .PPT or .PDF format and can be viewed by anyone with a Digital Marketplace
          account. Do not include internal or private information.
        </p>
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
        <Textarea
          model={`${model}.industryBriefing`}
          label="Industry briefing (optional)"
          description="Make sure you include the information to be provided, date, time and access details of your briefing."
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

BuyerATMRequirementsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerATMRequirementsStage.propTypes = {
  model: PropTypes.string.isRequired,
  saveModel: PropTypes.func.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerATMRequirementsStage)
