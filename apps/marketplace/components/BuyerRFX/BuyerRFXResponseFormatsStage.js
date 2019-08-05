import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import styles from './BuyerRFXResponseFormatsStage.scss'

export const atleastOneFormat = formValues =>
  formValues.evaluationType &&
  (formValues.evaluationType.includes('Written proposal') || formValues.evaluationType.includes('Response template'))

export const atleastOneProposal = formValues =>
  !formValues.evaluationType.includes('Written proposal') ||
  (formValues.evaluationType.includes('Written proposal') &&
    formValues.proposalType &&
    formValues.proposalType.length > 0)

class BuyerRFXResponseFormatsStage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposalDisabled: this.props[this.props.model].evaluationType.includes('Response template'),
      templateDisabled: this.props[this.props.model].evaluationType.includes('Written proposal')
    }
    this.handleEvaluationTypeClick = this.handleEvaluationTypeClick.bind(this)
  }

  handleEvaluationTypeClick(e) {
    const checked = e.target.checked
    switch (e.target.name) {
      case 'response_format_proposal':
        this.setState({
          templateDisabled: checked
        })
        break
      case 'response_format_template':
        this.setState({
          proposalDisabled: checked
        })
        break
      default:
        break
    }
  }

  render() {
    return (
      <Form
        model={this.props.model}
        validators={{
          '': { atleastOneFormat, atleastOneProposal }
        }}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUheadings level="1" size="xl">
          Response formats
        </AUheadings>
        <ErrorAlert
          title="An error occurred"
          model={this.props.model}
          messages={{
            atleastOneFormat: 'You must choose what you would like sellers to provide through the Marketplace',
            atleastOneProposal: 'You must select at least one proposal type.'
          }}
        />
        <AUheadings level="2" size="md">
          Select what sellers need to provide through the Marketplace:
        </AUheadings>
        <div className={styles.formats}>
          <CheckboxDetailsField
            model={`${this.props.model}.evaluationType[]`}
            id={`response_format_proposal`}
            name={`response_format_proposal`}
            label="Written proposal"
            description="Select what you would like sellers to include:"
            value="Written proposal"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
            disabled={this.state.proposalDisabled}
            onClick={this.handleEvaluationTypeClick}
          />
          <div>
            <div className={styles.subFormats}>
              <CheckboxDetailsField
                model={`${this.props.model}.proposalType[]`}
                id={`proposal_costings`}
                name={`proposal_costings`}
                label="Breakdown of costs"
                value="Breakdown of costs"
                detailsModel={this.props.model}
                disabled={!this.props[this.props.model].evaluationType.includes('Written proposal')}
                validators={{}}
                messages={{}}
              />
              <CheckboxDetailsField
                model={`${this.props.model}.proposalType[]`}
                id={`proposal_casestudy`}
                name={`proposal_casestudy`}
                label="Case study"
                value="Case study"
                detailsModel={this.props.model}
                disabled={!this.props[this.props.model].evaluationType.includes('Written proposal')}
                validators={{}}
                messages={{}}
              />
              <CheckboxDetailsField
                model={`${this.props.model}.proposalType[]`}
                id={`proposal_references`}
                name={`proposal_references`}
                label="References"
                value="References"
                detailsModel={this.props.model}
                disabled={!this.props[this.props.model].evaluationType.includes('Written proposal')}
                validators={{}}
                messages={{}}
              />
              <CheckboxDetailsField
                model={`${this.props.model}.proposalType[]`}
                id={`proposal_resumes`}
                name={`proposal_resumes`}
                label="Résumés"
                value="Résumés"
                detailsModel={this.props.model}
                disabled={!this.props[this.props.model].evaluationType.includes('Written proposal')}
                validators={{}}
                messages={{}}
              />
            </div>
          </div>
          <CheckboxDetailsField
            model={`${this.props.model}.evaluationType[]`}
            id={`response_format_template`}
            name={`response_format_template`}
            label="Completed response template"
            description={
              <span>
                You will need to upload your own template or the{' '}
                <a href="/static/media/documents/Response-Template.docx" target="_blank" rel="noreferer noopener">
                  Marketplace template (DOCX 67 KB)
                </a>
                . If you use the Marketplace template, make sure you update it with your Agency&apos;s requirements.
              </span>
            }
            value="Response template"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
            disabled={this.state.templateDisabled}
            onClick={this.handleEvaluationTypeClick}
          />
        </div>
        <AUheadings level="2" size="md">
          Select any additional assessment methods:
        </AUheadings>
        <div className={styles.formats}>
          <CheckboxDetailsField
            model={`${this.props.model}.evaluationType[]`}
            id={`response_format_presentation`}
            name={`response_format_presentation`}
            label="Presentation"
            description="A presentation can help you understand a seller's approach to deliver your outcome, e.g. by demonstrating a live product or technical prototype."
            value="Presentation"
            detailsModel={this.props.model}
            validators={{}}
            messages={{}}
          />
        </div>
        {this.props.formButtons}
      </Form>
    )
  }
}

BuyerRFXResponseFormatsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerRFXResponseFormatsStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFXResponseFormatsStage)
