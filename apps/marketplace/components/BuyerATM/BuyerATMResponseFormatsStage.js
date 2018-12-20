import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import NoticeBar from 'marketplace/components/NoticeBar/NoticeBar'
import ErrorAlert from './ErrorAlert'
import styles from './BuyerATMResponseFormatsStage.scss'

const BuyerATMResponseFormatsStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        atleastOneFormat: formValues => formValues.evaluationType && formValues.evaluationType.length > 0
      }
    }}
    onSubmit={props.onSubmit}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Response formats
    </AUheadings>
    <NoticeBar heavyFont className={styles.noticeBar}>
      In this EOI/RFI process sellers submit up to 500 words to each criteria you provide. If you need proposals or
      quotes now, go to <a href="#request proposals">request proposals[TODO]</a>.
    </NoticeBar>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        atleastOneFormat: 'You must select at least one response format',
        atleastOneProposal: 'You must select at least one proposal type if you are requesting a written proposal.'
      }}
    />
    <AUheadings level="2" size="md">
      Select what sellers need to provide through the Marketplace
    </AUheadings>
    <div className={styles.formats}>
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`criteria_response`}
        name={`criteria_response`}
        label="500 word responses to your criteria"
        value="criteria_response"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`casestudy`}
        name={`casestudy`}
        label="Case study"
        value="casestudy"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`references`}
        name={`references`}
        label="References"
        value="references"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`resumes`}
        name={`resumes`}
        label="Résumés"
        value="resumes"
        detailsModel={props.model}
        validators={{
          required
        }}
        messages={{}}
      />
    </div>
    <AUheadings level="2" size="md">
      What else do you need sellers to provide for the EOI/RFI? (optional)
    </AUheadings>
    <div className={styles.formats}>
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`response_format_presentation`}
        name={`response_format_presentation`}
        label="Presentation"
        value="presentation"
        description="A presentation can help you understand a seller's approach to deliver your outcome, e.g. by demonstrating a live product or technical prototype."
        detailsModel={props.model}
        validators={{}}
        messages={{}}
      />
      <CheckboxDetailsField
        model={`${props.model}.evaluationType[]`}
        id={`response_format_prototype`}
        name={`response_format_prototype`}
        label="Prototype"
        value="prototype"
        detailsModel={props.model}
        validators={{}}
        messages={{}}
      />
    </div>
    {props.formButtons}
  </Form>
)

BuyerATMResponseFormatsStage.defaultProps = {
  onSubmit: () => {}
}

BuyerATMResponseFormatsStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerATMResponseFormatsStage)
