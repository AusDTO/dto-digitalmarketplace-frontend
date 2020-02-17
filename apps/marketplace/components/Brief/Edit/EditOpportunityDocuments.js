import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { required } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'

import styles from '../../../main.scss'

class EditOpportunityDocuments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToEditsTable: false,
      attachments: [],
      requirementsDocument: [],
      responseTemplate: []
    }

    if (props[props.model].attachments && props[props.model].attachments.length > 0) {
      this.state.attachments = props[props.model].attachments
    } else if (props.brief.attachments && props.brief.attachments.length > 0) {
      this.state.attachments = props.brief.attachments
    }

    if (props[props.model].requirementsDocument && props[props.model].requirementsDocument.length > 0) {
      this.state.requirementsDocument = props[props.model].requirementsDocument
    } else if (props.brief.requirementsDocument && props.brief.requirementsDocument.length > 0) {
      this.state.requirementsDocument = props.brief.requirementsDocument
    }

    if (props[props.model].responseTemplate && props[props.model].responseTemplate.length > 0) {
      this.state.responseTemplate = props[props.model].responseTemplate
    } else if (props.brief.responseTemplate && props.brief.responseTemplate.length > 0) {
      this.state.responseTemplate = props.brief.responseTemplate
    }

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  handleCancelClick = () => {
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleContinueClick = data => {
    const newData = { ...data }
    newData.attachments = [...this.state.attachments]
    newData.requirementsDocument = [...this.state.requirementsDocument]
    newData.responseTemplate = [...this.state.responseTemplate]
    this.props.updateModel(newData)
    this.props.setOnlySellersEdited(false)
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleReplaceDocumentClick = () => {}

  renderDocumentRow(document) {
    return (
      <tr key={document}>
        <td>{document}</td>
        <td>
          <a href="#replace" className="au-btn au-btn--tertiary" onClick={this.handleReplaceDocumentClick}>
            Replace document
          </a>
        </td>
      </tr>
    )
  }

  render = () => {
    const { model } = this.props
    const { redirectToEditsTable } = this.state

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
            required
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
          <table className={`col-xs-12 ${styles.defaultStyle} ${styles.textAlignLeft}`}>
            <tbody>{this.state.attachments.map(document => this.renderDocumentRow(document))}</tbody>
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
