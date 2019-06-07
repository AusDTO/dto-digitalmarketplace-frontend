import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import { Link } from 'react-router-dom'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import parse from 'date-fns/parse'
import styles from './SellerAssessmentEvidenceStage.scss'

export const getCriteriaName = (id, criteria) => {
  let name = ''
  const matching = criteria.find(c => c.id === id)
  if (matching && matching.name) {
    name = matching.name
  }
  return name
}

const getMonths = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months
}

const getYears = () => {
  const year = parseInt(format(new Date(), 'YYYY'), 10)
  return [year - 4, year - 3, year - 2, year - 1, year]
}

const minimumWordRequirement = 100

const minimumEvidenceWords = val => (val.match(/\S+/g) || []).length >= minimumWordRequirement

export const validDates = formValues =>
  formValues.evidence &&
  formValues.evidence.from &&
  formValues.evidence.to &&
  formValues.evidence.from.month &&
  formValues.evidence.from.year &&
  formValues.evidence.to.month &&
  formValues.evidence.to.year &&
  ((parseInt(formValues.evidence.from.year, 10) === parseInt(formValues.evidence.to.year, 10) &&
    getMonths().indexOf(formValues.evidence.from.month) <= getMonths().indexOf(formValues.evidence.to.month)) ||
    parseInt(formValues.evidence.from.year, 10) < parseInt(formValues.evidence.to.year, 10)) &&
  !isAfter(parse(`01-${formValues.evidence.to.month}-${formValues.evidence.to.year}`), parse(new Date()))

export const requiredEvidence = formValues =>
  formValues.evidence &&
  formValues.evidence.criteriaResponses &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId =>
        formValues.evidence.criteriaResponses[criteriaId] &&
        required(formValues.evidence.criteriaResponses[criteriaId]) &&
        minimumEvidenceWords(formValues.evidence.criteriaResponses[criteriaId])
    ))

const SellerAssessmentEvidenceStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        validDates: formValues => validDates(formValues),
        requiredClient: formValues => formValues.evidence && required(formValues.evidence.client),
        requiredBackground: formValues => formValues.evidence && required(formValues.evidence.background),
        requiredEvidence: formValues => requiredEvidence(formValues)
      }
    }}
    onSubmit={props.onSubmit}
    onSubmitFailed={props.onSubmitFailed}
    validateOn="submit"
  >
    <AUheadings level="1" size="xl">
      Evidence
    </AUheadings>
    {props[props.model].criteria.length < 1 ? (
      <p>
        Before providing evidence, you must first select which <Link to="criteria">criteria you are responding to</Link>
        .
      </p>
    ) : (
      <div>
        <ErrorAlert
          title="An error occurred"
          model={props.model}
          messages={{
            validDates:
              'You must supply dates for the evidence, the "from" date must be before the "to" date, and the "to" date has to be before now',
            requiredClient: 'You must add the name of the client',
            requiredBackground: 'You must add the background',
            requiredEvidence: `You must add evidence for all criteria selected and each response must be at least ${minimumWordRequirement} words in length`
          }}
        />
        <div className={styles.evidenceDates}>
          <strong>From</strong>
          <Control.select
            model={`${props.model}.evidence.from.month`}
            id="from-month"
            name="from-month"
            mapProps={{
              className: 'au-select'
            }}
            defaultValue={props[props.model].evidence.from.month}
          >
            <option value="" key="0">
              Select a month...
            </option>
            {getMonths().map(month => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </Control.select>
          <Control.select
            model={`${props.model}.evidence.from.year`}
            id="from-year"
            name="from-year"
            mapProps={{
              className: 'au-select'
            }}
            defaultValue={props[props.model].evidence.from.year}
          >
            <option value="" key="0">
              Select a year...
            </option>
            {getYears().map(year => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </Control.select>
          <strong>To</strong>
          <Control.select
            model={`${props.model}.evidence.to.month`}
            id="to-month"
            name="to-month"
            mapProps={{
              className: 'au-select'
            }}
            defaultValue={props[props.model].evidence.to.month}
          >
            <option value="" key="0">
              Select a month...
            </option>
            {getMonths().map(month => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </Control.select>
          <Control.select
            model={`${props.model}.evidence.to.year`}
            id="to-year"
            name="to-year"
            mapProps={{
              className: 'au-select'
            }}
            defaultValue={props[props.model].evidence.to.year}
          >
            <option value="" key="0">
              Select a year...
            </option>
            {getYears().map(year => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </Control.select>
        </div>
        <Textfield
          model={`${props.model}.evidence.client`}
          label="Client"
          name="client"
          id="client"
          htmlFor="client"
          defaultValue={props[props.model].evidence.client}
          maxLength={100}
          showMaxLength
          validators={{
            required
          }}
        />
        <Textarea
          model={`${props.model}.evidence.background`}
          label="Background"
          name="background"
          id="background"
          htmlFor="background"
          defaultValue={props[props.model].evidence.background}
          validators={{
            required
          }}
        />
        <AUheadings level="2" size="lg">
          Criteria evidence
        </AUheadings>
        <p>
          <strong>For each criteria provide at least {minimumWordRequirement} words explaining:</strong>
        </p>
        <ul>
          <li>What you were specifically responsible for</li>
          <li>
            What specific activities you did and why. Avoid ambiguity e.g. &quot;we have extensive experience
            in...&quot;
          </li>
          <li>Describe the result or outcome of your activities</li>
        </ul>
        {props[props.model].criteria.map(criteriaId => (
          <Textarea
            key={criteriaId}
            model={`${props.model}.evidence.criteriaResponses.${criteriaId}`}
            label={getCriteriaName(criteriaId, props.meta.criteria)}
            name={`criteria_${criteriaId}`}
            id={`criteria_${criteriaId}`}
            htmlFor={`criteria_${criteriaId}`}
            defaultValue={props[props.model].evidence.criteriaResponses[criteriaId]}
            controlProps={{ minimum: minimumWordRequirement, rows: '10' }}
            validators={{
              required
            }}
            messages={{
              minimumWords: `Your criteria response has not yet reached the ${minimumWordRequirement} word minimum requirement`
            }}
          />
        ))}
        {props.formButtons}
      </div>
    )}
  </Form>
)

SellerAssessmentEvidenceStage.defaultProps = {
  onSubmit: () => {},
  onSubmitFailed: () => {}
}

SellerAssessmentEvidenceStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentEvidenceStage)
