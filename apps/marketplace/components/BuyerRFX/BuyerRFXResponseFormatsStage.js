import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import styles from './BuyerRFXResponseFormatsStage.scss'

const atleastOneFormat = v =>
  v.evaluationType && (v.evaluationType.includes('Written proposal') || v.evaluationType.includes('Response template'))

const atleastOneProposal = v =>
  !v.evaluationType.includes('Written proposal') ||
  (v.evaluationType.includes('Written proposal') && v.proposalType && v.proposalType.length > 0)

const onlyProposalOrTemplate = v =>
  !atleastOneFormat(v) ||
  !(v.evaluationType.includes('Written proposal') && v.evaluationType.includes('Response template'))

const handleClick = (e, props) => {
  if (!e.target.checked) {
    props.resetProposalCheck()
  }
}

export const done = v => atleastOneFormat(v) && atleastOneProposal(v) && onlyProposalOrTemplate(v)

const BuyerRFXResponseFormatsStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        atleastOneFormat,
        atleastOneProposal,
        onlyProposalOrTemplate
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheading level="1" size="xl">
      Response formats
    </AUheading>
    <ErrorAlert
      model={props.model}
      messages={{
        atleastOneFormat: 'You must choose what you would like sellers to provide through the Marketplace',
        atleastOneProposal: 'You must select at least one proposal type.',
        onlyProposalOrTemplate: 'You can only select either "Written proposal" or "Completed response template".'
      }}
    />
    <AUheading level="2" size="md">
      Select what sellers need to provide through the Marketplace:
    </AUheading>
    <div className={styles.formats}>
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id="response_format_proposal"
        name="response_format_proposal"
        label="Written proposal"
        description="Select what you would like sellers to include:"
        value="Written proposal"
        detailsModel={props.model}
        validators={{}}
        messages={{}}
        onClick={e => handleClick(e, props)}
      />
      <div>
        <div className={styles.subFormats}>
          <CheckboxDetailsField
            model={`${props.model}.proposalType[]`}
            id="proposal_costings"
            name="proposal_costings"
            label="Breakdown of costs"
            value="Breakdown of costs"
            detailsModel={props.model}
            disabled={!props[props.model].evaluationType.includes('Written proposal')}
            validators={{}}
            messages={{}}
          />
          <CheckboxDetailsField
            model={`${props.model}.proposalType[]`}
            id="proposal_casestudy"
            name="proposal_casestudy"
            label="Case study"
            value="Case study"
            detailsModel={props.model}
            disabled={!props[props.model].evaluationType.includes('Written proposal')}
            validators={{}}
            messages={{}}
          />
          <CheckboxDetailsField
            model={`${props.model}.proposalType[]`}
            id="proposal_references"
            name="proposal_references"
            label="References"
            value="References"
            detailsModel={props.model}
            disabled={!props[props.model].evaluationType.includes('Written proposal')}
            validators={{}}
            messages={{}}
          />
          <CheckboxDetailsField
            model={`${props.model}.proposalType[]`}
            id="proposal_resumes"
            name="proposal_resumes"
            label="Résumés"
            value="Résumés"
            detailsModel={props.model}
            disabled={!props[props.model].evaluationType.includes('Written proposal')}
            validators={{}}
            messages={{}}
          />
        </div>
      </div>
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id="response_format_template"
        name="response_format_template"
        label="Completed response template"
        description={
          <span>
            You will need to upload your own template or the{' '}
            <a href="/static/media/documents/Response-Template.docx" target="_blank" rel="noopener noreferrer">
              Marketplace template (DOCX 67 KB)
            </a>
            . If you use the Marketplace template, make sure you update it with your Agency&apos;s requirements.
          </span>
        }
        value="Response template"
        detailsModel={props.model}
        validators={{}}
        messages={{}}
      />
    </div>
    <AUheading level="2" size="md">
      Select any additional assessment methods:
    </AUheading>
    <div className={styles.formats}>
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id="response_format_interview"
        name="response_format_interview"
        label="Interview"
        description="An interview can help you understand a seller's approach to deliver your outcome, e.g. by demonstrating a live product or technical prototype."
        value="Interview"
        detailsModel={props.model}
        validators={{}}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id="response_format_presentation"
        name="response_format_presentation"
        label="Presentation"
        description="A presentation can help you understand a seller's approach to deliver your outcome, e.g. by demonstrating a live product or technical prototype."
        value="Presentation"
        detailsModel={props.model}
        validators={{}}
        messages={{}}
      />
    </div>
    {props.formButtons}
  </Form>
)

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

const mapDispatchToProps = (dispatch, props) => ({
  resetProposalCheck: () => dispatch(actions.change(`${props.model}.proposalType[]`, []))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerRFXResponseFormatsStage)
