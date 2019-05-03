import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form, Control } from 'react-redux-form'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import formProps from 'shared/form/formPropsSelector'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import RadioList from 'shared/form/RadioList'
import AUselect from '@gov.au/select/lib/js/react.js'
import styles from './BuyerSpecialistResponseFormatsStage.scss'

const requiredNumberOfSuppliers = v => v.numberOfSuppliers
const rangeNumberOfSuppliers = v =>
  !v.numberOfSuppliers || (parseInt(v.numberOfSuppliers, 10) > 0 && parseInt(v.numberOfSuppliers, 10) <= 6)
const isNumberMaxRate = v => !v.maxRate || (v.maxRate && parseFloat(v.maxRate))
const requiredSecurityClearance = v => v.securityClearance
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
  rangeNumberOfSuppliers(v) &&
  isNumberMaxRate(v) &&
  requiredSecurityClearance(v) &&
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
        rangeNumberOfSuppliers,
        isNumberMaxRate,
        requiredSecurityClearance,
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
        requiredNumberOfSuppliers: 'You must specify how many candidates each seller can submit',
        rangeNumberOfSuppliers: 'Number of candidates must be from 1 to 6',
        requiredSecurityClearance: 'You must select security clearance',
        requiredSecurityClearanceCurrent: 'You must select current security clearance',
        requiredSecurityClearanceOther: 'You must enter security clearance details'
      }}
    />
    <Textfield
      model={`${props.model}.numberOfSuppliers`}
      label="How many candidates can each seller submit?"
      name="numberOfSuppliers"
      id="numberOfSuppliers"
      htmlFor="numberOfSuppliers"
      defaultValue={props[props.model].numberOfSuppliers}
      validators={{}}
      type="number"
    />
    <div className={styles.formats}>
      <fieldset>
        <legend>What will you use to evaluate candidates?</legend>
        <CheckboxDetailsField
          model={`${props.model}.evaluationType[]`}
          id={`responses_to_evaluation_critiera`}
          name={`responses_to_evaluation_critiera`}
          label="Responses to evaluation criteria"
          value="Responses to evaluation criteria"
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
          id={`scenario_or_tests`}
          name={`scenario_or_tests`}
          label="Scenario or tests"
          value="Scenario or tests"
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
      type="number"
      step="any"
      prefix={'$'}
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
        label=""
        id="securityClearanceOther"
        htmlFor="securityClearanceOther"
        defaultValue={props[props.model].securityClearanceOther}
        controlProps={{ limit: 1000 }}
        validators={{}}
        messages={{
          limitWords: 'Other security clearance do has exceeded the 1000 word limit'
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
