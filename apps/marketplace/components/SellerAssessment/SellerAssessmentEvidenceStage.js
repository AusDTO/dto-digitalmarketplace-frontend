import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import { Link } from 'react-router-dom'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required, validPhoneNumber } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import styles from './SellerAssessmentEvidenceStage.scss'

export const getCriteriaName = (id, criteria) => {
  let name = ''
  const matching = criteria.find(c => c.id === id)
  if (matching && matching.name) {
    name = matching.name
  }
  return name
}

const getYears = () => {
  const year = parseInt(format(new Date(), 'YYYY'), 10)
  return [year - 6, year - 5, year - 4, year - 3, year - 2, year - 1, year]
}

const minimumWordRequirement = 100

const minimumEvidenceWords = val => (val.match(/\S+/g) || []).length >= minimumWordRequirement

export const requiredClient = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId => formValues.evidence[criteriaId] && required(formValues.evidence[criteriaId].client)
    ))

export const requiredRefereeName = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId => formValues.evidence[criteriaId] && required(formValues.evidence[criteriaId].refereeName)
    ))

export const requiredRefereeNumber = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId =>
        formValues.evidence[criteriaId] &&
        required(formValues.evidence[criteriaId].refereeNumber) &&
        validPhoneNumber(formValues.evidence[criteriaId].refereeNumber)
    ))

export const requiredBackground = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId => formValues.evidence[criteriaId] && required(formValues.evidence[criteriaId].background)
    ))

export const requiredStartDate = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId => formValues.evidence[criteriaId] && required(formValues.evidence[criteriaId].startDate)
    ))

export const requiredEndDate = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId => formValues.evidence[criteriaId] && required(formValues.evidence[criteriaId].endDate)
    ))

export const validDates = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.some(
      criteriaId =>
        formValues.evidence[criteriaId] &&
        (!formValues.evidence[criteriaId].startDate || !formValues.evidence[criteriaId].endDate)
    ) ||
    formValues.criteria.every(
      criteriaId =>
        formValues.evidence[criteriaId] &&
        (formValues.evidence[criteriaId].endDate === 'ongoing' ||
          parseInt(formValues.evidence[criteriaId].startDate, 10) <=
            parseInt(formValues.evidence[criteriaId].endDate, 10))
    ))

export const requiredEvidence = formValues =>
  formValues.evidence &&
  Object.keys(formValues.evidence).length > 0 &&
  (formValues.criteria.length === 0 ||
    formValues.criteria.every(
      criteriaId =>
        formValues.evidence[criteriaId] &&
        required(formValues.evidence[criteriaId].response) &&
        minimumEvidenceWords(formValues.evidence[criteriaId].response)
    ))

const SellerAssessmentEvidenceStage = props => (
  <Form
    model={props.model}
    validators={{
      '': {
        requiredClient: formValues => requiredClient(formValues),
        requiredRefereeName: formValues => requiredRefereeName(formValues),
        requiredRefereeNumber: formValues => requiredRefereeNumber(formValues),
        requiredBackground: formValues => requiredBackground(formValues),
        requiredStartDate: formValues => requiredStartDate(formValues),
        requiredEndDate: formValues => requiredEndDate(formValues),
        validDates: formValues => validDates(formValues),
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
      <React.Fragment>
        <ErrorAlert
          title="An error occurred"
          model={props.model}
          messages={{
            requiredClient: 'You must provide a client for each criteria response',
            requiredRefereeName: 'You must provide a referee name for each criteria response',
            requiredRefereeNumber: 'You must provide a valid referee phone number for each criteria response',
            requiredBackground: 'You must provide background for each criteria response',
            requiredStartDate: 'You must select a start date for each criteria response',
            requiredEndDate: 'You must select an end date for each criteria response',
            validDates: 'The start date must be before the end date for each criteria response',
            requiredEvidence: `You must add evidence for all criteria selected and each response must be at least ${minimumWordRequirement} words in length`
          }}
        />
        {props[props.model].criteria.map(criteriaId => (
          <React.Fragment key={criteriaId}>
            <AUheadings level="2" size="lg">
              Criteria:
            </AUheadings>
            <p className={styles.criteriaText}>{getCriteriaName(criteriaId, props.meta.criteria)}</p>
            <Textfield
              model={`${props.model}.evidence[${criteriaId}].client`}
              defaultValue={props[props.model].evidence[criteriaId].client}
              label="Client"
              name={`client_${criteriaId}`}
              id={`client_${criteriaId}`}
              htmlFor={`client_${criteriaId}`}
              maxLength={100}
              showMaxLength
              validators={{
                required
              }}
            />
            <Textfield
              model={`${props.model}.evidence[${criteriaId}].refereeName`}
              defaultValue={props[props.model].evidence[criteriaId].refereeName}
              label="Referee's full name"
              description="We may contact your referee to confirm your involvement in the project."
              name={`referee_name_${criteriaId}`}
              id={`referee_name_${criteriaId}`}
              htmlFor={`referee_name_${criteriaId}`}
              maxLength={100}
              showMaxLength
              validators={{
                required
              }}
            />
            <Textfield
              model={`${props.model}.evidence[${criteriaId}].refereeNumber`}
              defaultValue={props[props.model].evidence[criteriaId].refereeNumber}
              label="Referee's phone number"
              description="Please include the area code for landlines."
              name={`referee_number_${criteriaId}`}
              id={`referee_number_${criteriaId}`}
              htmlFor={`referee_number_${criteriaId}`}
              maxLength={100}
              showMaxLength
              validators={{
                required,
                validPhoneNumber
              }}
            />
            <div className={styles.evidenceDates}>
              <div>
                <strong>Start of project</strong>
                <Control.select
                  model={`${props.model}.evidence[${criteriaId}].startDate`}
                  id={`startDate_${criteriaId}`}
                  name={`startDate_${criteriaId}`}
                  mapProps={{
                    className: 'au-select'
                  }}
                >
                  <option value="" key="0">
                    Select start date
                  </option>
                  {getYears().map(year => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </Control.select>
              </div>
              <div>
                <strong>End of project</strong>
                <Control.select
                  model={`${props.model}.evidence[${criteriaId}].endDate`}
                  id={`endDate_${criteriaId}`}
                  name={`endDate_${criteriaId}`}
                  mapProps={{
                    className: 'au-select'
                  }}
                >
                  <option value="" key="0">
                    Select end date
                  </option>
                  {getYears().map(year => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                  <option value="ongoing" key={getYears().length + 1}>
                    ongoing
                  </option>
                </Control.select>
              </div>
            </div>
            <Textarea
              model={`${props.model}.evidence[${criteriaId}].background`}
              label="Background"
              description="Describe the background of the project you worked on."
              name={`background_${criteriaId}`}
              id={`background_${criteriaId}`}
              htmlFor={`background_${criteriaId}`}
              validators={{
                required
              }}
            />
            <Textarea
              key={criteriaId}
              model={`${props.model}.evidence[${criteriaId}].response`}
              label="Evidence of meeting the criteria"
              description="To meet the criteria, explain the activities you were specifically response for, what you did, and why. Avoid ambiguity e.g. 'we have extensive experience in ...'. Describe the result or outcome of your activities."
              name={`criteria_${criteriaId}`}
              id={`criteria_${criteriaId}`}
              htmlFor={`criteria_${criteriaId}`}
              controlProps={{ minimum: minimumWordRequirement, rows: '10' }}
              validators={{
                required
              }}
              messages={{
                minimumWords: `Your criteria response has not yet reached the ${minimumWordRequirement} word minimum requirement`
              }}
            />
          </React.Fragment>
        ))}
        {props.formButtons}
      </React.Fragment>
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
