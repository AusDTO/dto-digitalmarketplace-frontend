import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form, Control } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import RadioList from 'shared/form/RadioList'
import AUselect from '@gov.au/select/lib/js/react.js'
import styles from './BuyerSpecialistResponseFormatsStage.scss'

const requiredNumberOfSuppliers = v => v.numberOfSuppliers
const validNumberOfSuppliers = v =>
  !requiredNumberOfSuppliers(v) || Number(v.numberOfSuppliers) === parseInt(v.numberOfSuppliers, 10)
const rangeNumberOfSuppliers = v =>
  !requiredNumberOfSuppliers(v) ||
  !validNumberOfSuppliers(v) ||
  (parseInt(v.numberOfSuppliers, 10) > 0 && parseInt(v.numberOfSuppliers, 10) <= 6)
const isNumberMaxRate = v => !v.maxRate || (v.maxRate && parseFloat(v.maxRate))
const isNumberGreaterThanZero = v => !v.maxRate || !isNumberMaxRate(v) || parseFloat(v.maxRate) > 0
const requiredSecurityClearance = v => v.securityClearance
const requiredSecurityClearanceObtain = v => {
  if (!v.securityClearance) {
    return true
  }
  if (v.securityClearance === 'abilityToObtain' && !v.securityClearanceObtain) {
    return false
  }
  return true
}
const requiredSecurityClearanceCurrent = v => {
  if (!v.securityClearance) {
    return true
  }
  if (v.securityClearance === 'mustHave' && !v.securityClearanceCurrent) {
    return false
  }
  return true
}
const requiredSecurityClearanceOther = v => {
  if (!v.securityClearance) {
    return true
  }
  if (v.securityClearance === 'other' && !v.securityClearanceOther) {
    return false
  }
  return true
}

export const done = v =>
  requiredNumberOfSuppliers(v) &&
  validNumberOfSuppliers(v) &&
  rangeNumberOfSuppliers(v) &&
  isNumberMaxRate(v) &&
  isNumberGreaterThanZero(v) &&
  requiredSecurityClearance(v) &&
  requiredSecurityClearanceObtain(v) &&
  requiredSecurityClearanceCurrent(v) &&
  requiredSecurityClearanceOther(v)

const securityClearanceDropDown = props => (
  <AUselect
    block
    id={`${props.id}-security-clearance-select`}
    options={[
      {
        text: 'Select security clearance',
        value: ''
      },
      {
        text: 'Baseline clearance',
        value: 'baseline'
      },
      {
        text: 'Negative Vetting Level 1',
        value: 'nv1'
      },
      {
        text: 'Negative Vetting Level 2',
        value: 'nv2'
      },
      {
        text: 'Positive Vetting',
        value: 'pv'
      }
    ]}
    {...props}
  />
)

const BuyerSpecialistResponseFormatsStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredNumberOfSuppliers,
        validNumberOfSuppliers,
        rangeNumberOfSuppliers,
        isNumberMaxRate,
        isNumberGreaterThanZero,
        requiredSecurityClearance,
        requiredSecurityClearanceObtain,
        requiredSecurityClearanceCurrent,
        requiredSecurityClearanceOther
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Seller responses
    </AUheadings>
    <ErrorAlert
      title="An error occurred"
      model={props.model}
      messages={{
        isNumberMaxRate: `Maximum ${
          props[props.model].preferredFormatForRates === 'dailyRate' ? 'daily' : 'hourly'
        } rate must be a number`,
        isNumberGreaterThanZero: `Maximum ${
          props[props.model].preferredFormatForRates === 'dailyRate' ? 'daily' : 'hourly'
        } rate must be greater than zero`,
        requiredNumberOfSuppliers: 'You must specify how many candidates each seller can submit.',
        validNumberOfSuppliers: 'Number of candidates is an invalid number',
        rangeNumberOfSuppliers: 'Number of candidates must be from 1 to 6.',
        requiredSecurityClearance: 'You must define the security clearance requirements',
        requiredSecurityClearanceObtain: 'You must select a type of security clearance.',
        requiredSecurityClearanceCurrent: 'You must select a type of security clearance.',
        requiredSecurityClearanceOther: 'You must enter security clearance requirements'
      }}
    />
    <Textfield
      model={`${props.model}.numberOfSuppliers`}
      label="How many candidates can each seller submit?"
      description="You can request a maximum of 6 candidates"
      name="numberOfSuppliers"
      id="numberOfSuppliers"
      htmlFor="numberOfSuppliers"
      defaultValue={props[props.model].numberOfSuppliers}
      validators={{}}
    />
    <div className={styles.formats}>
      <fieldset>
        <legend>What will you use to evaluate candidates?</legend>
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`responses_to_evaluation_critiera`}
          name={`responses_to_evaluation_critiera`}
          label="Responses to selection criteria"
          value="Responses to selection criteria"
          detailsModel={props.model}
          disabled
          validators={{}}
          messages={{}}
        />
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`resumes`}
          name={`resumes`}
          label="Résumés"
          value="Résumés"
          detailsModel={props.model}
          disabled
          validators={{}}
          messages={{}}
        />
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`references`}
          name={`references`}
          label="References"
          value="References"
          detailsModel={props.model}
          validators={{}}
          messages={{}}
        />
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`interviews`}
          name={`interviews`}
          label="Interviews"
          value="Interviews"
          detailsModel={props.model}
          validators={{}}
          messages={{}}
        />
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`scenarios_or_tests`}
          name={`scenarios_or_tests`}
          label="Scenarios or tests"
          value="Scenarios or tests"
          detailsModel={props.model}
          validators={{}}
          messages={{}}
        />
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`presentations`}
          name={`presentations`}
          label="Presentations"
          value="Presentations"
          detailsModel={props.model}
          validators={{}}
          messages={{}}
        />
      </fieldset>
    </div>
    <RadioList
      id="preferredFormatForRates"
      label="What is your preferred format for rates?"
      name="preferredFormatForRates"
      model={`${props.model}.preferredFormatForRates`}
      options={[
        {
          label: 'Daily rate',
          value: 'dailyRate'
        },
        {
          label: 'Hourly rate',
          value: 'hourlyRate'
        }
      ]}
      messages={{}}
      onChange={() => props.preferredFormatForRatesChange(`${props.model}.preferredFormatForRates`)}
    />
    <Textfield
      model={`${props.model}.maxRate`}
      label={`Maximum ${
        props[props.model].preferredFormatForRates === 'dailyRate' ? 'daily' : 'hourly'
      } rate, including GST (optional)`}
      name="maxRate"
      id="maxRate"
      htmlFor="maxRate"
      defaultValue={props[props.model].maxRate}
      maxLength={100}
      validators={{}}
      prefix={'$'}
      className={styles.maxRate}
      topRightComponent={
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476-Panel-categories-and-rates"
          rel="external noopener noreferrer"
          target="_blank"
        >
          View market rates
        </a>
      }
    />
    <Textfield
      model={`${props.model}.budgetRange`}
      label="Additional budget information (optional)"
      name="budgetRange"
      id="budgetRange"
      htmlFor="budgetRange"
      defaultValue={props[props.model].budgetRange}
      maxLength={100}
      validators={{}}
      showMaxLength
    />
    <RadioList
      id="securityClearance"
      label="What are the security clearance requirements?"
      name="securityClearance"
      model={`${props.model}.securityClearance`}
      options={[
        {
          label: 'None required',
          value: 'noneRequired'
        },
        {
          label: 'Ability to obtain a security clearance',
          value: 'abilityToObtain'
        },
        {
          label: 'Must have a current security clearance',
          value: 'mustHave'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ]}
      messages={{}}
      onChange={() => props.securityClearanceChange(`${props.model}.securityClearance`)}
    />
    {props[props.model].securityClearance === 'abilityToObtain' && (
      <Control
        model={`${props.model}.securityClearanceObtain`}
        component={securityClearanceDropDown}
        id="securityClearanceObtain"
      />
    )}
    {props[props.model].securityClearance === 'mustHave' && (
      <Control
        model={`${props.model}.securityClearanceCurrent`}
        component={securityClearanceDropDown}
        id="securityClearanceCurrent"
      />
    )}
    {props[props.model].securityClearance === 'other' && (
      <Textarea
        model={`${props.model}.securityClearanceOther`}
        name="securityClearanceOther"
        label="Describe your security clearance requirements"
        id="securityClearanceOther"
        htmlFor="securityClearanceOther"
        defaultValue={props[props.model].securityClearanceOther}
        controlProps={{ limit: 50 }}
        validators={{}}
        messages={{
          limitWords: 'Other security clearance has exceeded the 50 word limit'
        }}
      />
    )}
    {props.formButtons}
  </Form>
)

BuyerSpecialistResponseFormatsStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

BuyerSpecialistResponseFormatsStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  preferredFormatForRatesChange: value => dispatch(actions.change(`${props.model}.preferredFormatForRates`, value)),
  securityClearanceChange: value => dispatch(actions.change(`${props.model}.securityClearance`, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSpecialistResponseFormatsStage)
