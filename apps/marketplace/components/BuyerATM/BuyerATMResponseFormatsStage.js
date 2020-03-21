import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { AUcallout } from '@gov.au/callout/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import RadioList from 'shared/form/RadioList'
import { rootPath } from 'marketplace/routes'
import styles from './BuyerATMResponseFormatsStage.scss'

const BuyerATMResponseFormatsStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredChoice: formValues => formValues.requestMoreInfo,
        atleastOneFormat: formValues =>
          !formValues.requestMoreInfo || formValues.requestMoreInfo === 'no' || formValues.evaluationType.length > 0
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheading level="1" size="xl">
      Response formats
    </AUheading>
    <AUcallout description="" className={styles.noticeBar}>
      Sellers submit up to 500 words to each response criteria.
      <br />
      If you need proposals now, switch to <a href={`${rootPath}/outcome-choice`}>seek proposals and quotes</a>.
    </AUcallout>
    <ErrorAlert
      model={props.model}
      messages={{
        requiredChoice: 'You must specify if you need sellers to supply any other information',
        atleastOneFormat: 'You must select at least one response format'
      }}
    />
    <AUheading level="2" size="lg">
      Do you need sellers to provide any other information?
    </AUheading>
    <RadioList
      id="requestMoreInfo"
      label=""
      name="requestMoreInfo"
      model={`${props.model}.requestMoreInfo`}
      options={[
        {
          label: 'No',
          value: 'no'
        },
        {
          label: 'Yes',
          value: 'yes'
        }
      ]}
      messages={{}}
      onChange={() => props.resetEvaluationType()}
    />
    {props[props.model].requestMoreInfo === 'yes' && (
      <div className={styles.formats}>
        <fieldset>
          <legend>Select what you need</legend>
          <CheckboxDetailsField
            model={`${props.model}.evaluationType[]`}
            id={`casestudy`}
            name={`casestudy`}
            label="Case study"
            value="Case study"
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
            value="References"
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
            value="Résumés"
            detailsModel={props.model}
            validators={{
              required
            }}
            messages={{}}
          />
          <CheckboxDetailsField
            model={`${props.model}.evaluationType[]`}
            id={`response_format_presentation`}
            name={`response_format_presentation`}
            label="Presentation"
            value="Presentation"
            detailsModel={props.model}
            validators={{}}
            messages={{}}
          />
          <CheckboxDetailsField
            model={`${props.model}.evaluationType[]`}
            id={`response_format_prototype`}
            name={`response_format_prototype`}
            label="Prototype"
            value="Prototype"
            detailsModel={props.model}
            validators={{}}
            messages={{}}
          />
        </fieldset>
      </div>
    )}
    {props.formButtons}
  </Form>
)

BuyerATMResponseFormatsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerATMResponseFormatsStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  resetEvaluationType: () => dispatch(actions.change(`${props.model}.evaluationType`, []))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerATMResponseFormatsStage)
