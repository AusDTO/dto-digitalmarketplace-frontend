import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import dmapi from 'marketplace/services/apiClient'
import { requiredFile } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import FilesInput from 'shared/form/FilesInput'

import styles from '../../../main.scss'

class EditOpportunityDocuments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToEditsTable: false,
      initial: {}
    }

    // populate the form model with documents from the brief if the form properties are empty
    const data = { ...props[props.model] }
    const { attachments, requirementsDocument, responseTemplate } = props[props.model]
    if (attachments && attachments.length === 0 && props.brief.attachments && props.brief.attachments.length > 0) {
      data.attachments = [...props.brief.attachments]
    }
    if (
      requirementsDocument &&
      requirementsDocument.length === 0 &&
      props.brief.requirementsDocument &&
      props.brief.requirementsDocument.length > 0
    ) {
      data.requirementsDocument = [...props.brief.requirementsDocument]
    }
    if (
      responseTemplate &&
      responseTemplate.length === 0 &&
      props.brief.responseTemplate &&
      props.brief.responseTemplate.length > 0
    ) {
      data.responseTemplate = [...props.brief.responseTemplate]
    }
    this.props.updateModel(data)

    // keep the initial state of the form
    this.state.initial = { ...data }

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
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

  renderDocumentRow(document, index, type, atleastOne) {
    if (typeof document !== 'string' || (!atleastOne && document === '')) {
      return null
    }
    const { model, brief } = this.props
    return (
      <tr key={`${type}-${index}`}>
        <td>
          <FilesInput
            fieldLabel="Upload another document"
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
              requiredFile: 'You must upload your written proposal'
            }}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />
        </td>
      </tr>
    )
  }

  render = () => {
    const { model, brief } = this.props
    const { redirectToEditsTable } = this.state
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
            hasRequirementsDoc: values =>
              !brief.requirementsDocument ||
              brief.requirementsDocument.length === 0 ||
              values.requirementsDocument.length > 0,
            hasResponseTemplate: values =>
              !brief.responseTemplate || brief.responseTemplate.length === 0 || values.responseTemplate.length > 0
          }
        }}
      >
        <div className="row">
          <AUheading level="1" size="xl">
            Documents
          </AUheading>
          <p>
            If you need to remove a document, <a href="/contact-us">contact us</a>.
          </p>
          <AUheading level="2" size="lg">
            Existing documents
          </AUheading>
          {documentCount === 0 && <p>There are no documents currently attached to this opportunity.</p>}
          <table className={`col-xs-12 ${styles.defaultStyle} ${styles.textAlignLeft}`}>
            <React.Fragment>
              <thead>
                <tr>
                  <td>Attachments</td>
                </tr>
              </thead>
              <tbody>
                {attachments.map((document, index) => this.renderDocumentRow(document, index, 'attachments'))}
                <tr>
                  <td>
                    <FilesInput
                      fieldLabel="Upload another document"
                      name="attachments"
                      model={`${model}.attachments.${attachments.length}`}
                      formFields={1}
                      url={`/brief/${brief.id}/attachments`}
                      api={dmapi}
                      fileId={attachments.length}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    />
                  </td>
                </tr>
              </tbody>
            </React.Fragment>
            {requirementsDocument.length > 0 && (
              <React.Fragment>
                <thead>
                  <tr>
                    <td>Requirements document</td>
                  </tr>
                </thead>
                <tbody>
                  {requirementsDocument.map((document, index) =>
                    this.renderDocumentRow(document, index, 'requirementsDocument', true)
                  )}
                </tbody>
              </React.Fragment>
            )}
            {responseTemplate.length > 0 && (
              <React.Fragment>
                <thead>
                  <tr>
                    <td>Response template</td>
                  </tr>
                </thead>
                <tbody>
                  {responseTemplate.map((document, index) =>
                    this.renderDocumentRow(document, index, 'responseTemplate', true)
                  )}
                </tbody>
              </React.Fragment>
            )}
          </table>
        </div>
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
  setOnlySellersEdited: onlySellersEdited =>
    dispatch(actions.change(`${props.model}.onlySellersEdited`, onlySellersEdited)),
  updateModel: data => dispatch(actions.change(props.model, data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunityDocuments)
