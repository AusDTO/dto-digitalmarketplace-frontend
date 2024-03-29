import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Control, actions } from 'react-redux-form'
import { Link } from 'react-router-dom'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import CheckboxDetailsField from 'shared/form/CheckboxDetailsField'
import { required, validPhoneNumber } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import { rootPath } from 'marketplace/routes'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
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

export const done = formValues =>
  requiredClient(formValues) &&
  requiredRefereeName(formValues) &&
  requiredRefereeNumber(formValues) &&
  requiredBackground(formValues) &&
  requiredStartDate(formValues) &&
  requiredEndDate(formValues) &&
  validDates(formValues) &&
  requiredEvidence(formValues)

class SellerAssessmentEvidenceStage extends Component {
  constructor(props) {
    super(props)
    this.handleClientDetailsCheck = this.handleClientDetailsCheck.bind(this)
  }

  componentDidMount() {
    this.setAllOtherCriteriaFromFirst()
  }

  setAllOtherCriteriaFromFirst() {
    if ('criteria' in this.props[this.props.model] && this.props[this.props.model].criteria.length > 0) {
      const firstCriteriaId = this.props[this.props.model].criteria[0]
      this.updateAllOtherCriteriaFromFirst('client', this.props[this.props.model].evidence[firstCriteriaId].client)
      this.updateAllOtherCriteriaFromFirst(
        'refereeName',
        this.props[this.props.model].evidence[firstCriteriaId].refereeName
      )
      this.updateAllOtherCriteriaFromFirst(
        'refereeNumber',
        this.props[this.props.model].evidence[firstCriteriaId].refereeNumber
      )
      this.updateAllOtherCriteriaFromFirst(
        'startDate',
        this.props[this.props.model].evidence[firstCriteriaId].startDate
      )
      this.updateAllOtherCriteriaFromFirst('endDate', this.props[this.props.model].evidence[firstCriteriaId].endDate)
      this.updateAllOtherCriteriaFromFirst(
        'background',
        this.props[this.props.model].evidence[firstCriteriaId].background
      )
    }
  }

  getPreviousFailedCriteria() {
    const failed = []
    if ('evidence' in this.props.meta && this.props.meta.evidence.failedCriteria) {
      Object.keys(this.props.meta.evidence.failedCriteria).map(id => failed.push(parseInt(id, 10)))
    }
    return failed
  }

  isCriteriaDetailsDisabled(criteriaId) {
    return this.props[this.props.model].evidence[criteriaId].sameAsFirst
  }

  handleClientDetailsCheck(criteriaId, e) {
    const checked = e.target.value
    this.props.updateCriteriaSameAsFirst(criteriaId, checked)
    if (checked) {
      const firstCriteriaId = this.props[this.props.model].criteria[0]
      this.props.updateEvidenceFieldValue(
        criteriaId,
        'client',
        this.props[this.props.model].evidence[firstCriteriaId].client
      )
      this.props.updateEvidenceFieldValue(
        criteriaId,
        'refereeName',
        this.props[this.props.model].evidence[firstCriteriaId].refereeName
      )
      this.props.updateEvidenceFieldValue(
        criteriaId,
        'refereeNumber',
        this.props[this.props.model].evidence[firstCriteriaId].refereeNumber
      )
      this.props.updateEvidenceFieldValue(
        criteriaId,
        'startDate',
        this.props[this.props.model].evidence[firstCriteriaId].startDate
      )
      this.props.updateEvidenceFieldValue(
        criteriaId,
        'endDate',
        this.props[this.props.model].evidence[firstCriteriaId].endDate
      )
      this.props.updateEvidenceFieldValue(
        criteriaId,
        'background',
        this.props[this.props.model].evidence[firstCriteriaId].background
      )
    }
  }

  updateAllOtherCriteriaFromFirst(fieldName, fieldValue) {
    const firstCriteriaId = this.props[this.props.model].criteria[0]
    Object.keys(this.props[this.props.model].evidence).map(criteriaId => {
      if (
        parseInt(criteriaId, 10) !== firstCriteriaId &&
        this.props[this.props.model].evidence[criteriaId].sameAsFirst
      ) {
        this.props.updateEvidenceFieldValue(criteriaId, fieldName, fieldValue)
      }
      return true
    })
  }

  render() {
    const previouslyFailedCriteria = this.getPreviousFailedCriteria()

    return (
      <Form
        model={this.props.model}
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
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        validateOn="submit"
      >
        <AUpageAlert as="error">
          <p>
            Requests for category assessments are closed. You can apply on{' '}
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://www.buyict.gov.au" rel="external" target="_blank">
              BuyICT
            </a>{' '}
            <strong>from 30 May</strong>.
          </p>
        </AUpageAlert>
        <AUheadings level="1" size="xl">
          Evidence
        </AUheadings>
        {this.props[this.props.model].criteria.length < 1 ? (
          <p>
            Before providing evidence, you must first select which{' '}
            <Link to="criteria">criteria you are responding to</Link>.
          </p>
        ) : (
          <React.Fragment>
            <ErrorAlert
              model={this.props.model}
              messages={{
                requiredClient: 'You must provide a client for each criteria response',
                requiredRefereeName: 'You must provide a referee name for each criteria response',
                requiredRefereeNumber: 'You must provide a valid referee phone number for each criteria response',
                requiredBackground: 'You must provide background for each criteria response',
                requiredStartDate: 'You must select a start date for each criteria response',
                requiredEndDate: 'You must select an end date for each criteria response',
                validDates: 'The start date must be before the end date for each criteria response',
                requiredEvidence: `The evidence for each criteria must be at least ${minimumWordRequirement} words in length`
              }}
            />
            {this.props[this.props.model].criteria.map((criteriaId, index) => (
              <div
                key={criteriaId}
                className={`${styles.criteria} ${
                  previouslyFailedCriteria.includes(criteriaId) ? styles.previouslyFailed : ''
                }`}
              >
                {previouslyFailedCriteria.includes(criteriaId) && (
                  <AUpageAlert as="warning">
                    <AUheadings level="2" size="lg">
                      Update your evidence
                    </AUheadings>
                    <p>
                      Please update the evidence of this criteria based on the{' '}
                      <a
                        href={`${rootPath}/seller-assessment/${this.props.meta.evidence.previousEvidenceId}/feedback`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        assessor&apos;s feedback
                      </a>{' '}
                      and resubmit for assessment.
                    </p>
                  </AUpageAlert>
                )}
                <AUheadings level="2" size="lg">
                  Criteria:
                </AUheadings>
                <p className={styles.criteriaText}>{getCriteriaName(criteriaId, this.props.meta.domain.criteria)}</p>
                {index !== 0 && (
                  <p>
                    <CheckboxDetailsField
                      model={`${this.props.model}.evidence[${criteriaId}].sameAsFirst`}
                      id={`client_check_${criteriaId}`}
                      name={`client_check_${criteriaId}`}
                      checked={this.props[this.props.model].evidence[criteriaId].sameAsFirst}
                      onClick={e => this.handleClientDetailsCheck(criteriaId, e)}
                      label="Client details are the same as the first criteria"
                      detailsModel={this.props.model}
                      validators={{}}
                      messages={{}}
                      disabled
                    />
                  </p>
                )}
                <Textfield
                  model={`${this.props.model}.evidence[${criteriaId}].client`}
                  defaultValue={this.props[this.props.model].evidence[criteriaId].client}
                  disabled
                  label="Client"
                  name={`client_${criteriaId}`}
                  id={`client_${criteriaId}`}
                  htmlFor={`client_${criteriaId}`}
                  maxLength={100}
                  validators={{
                    required
                  }}
                  onChange={e => {
                    if (index === 0) {
                      this.updateAllOtherCriteriaFromFirst('client', e.target.value)
                    }
                    return true
                  }}
                />
                <Textfield
                  model={`${this.props.model}.evidence[${criteriaId}].refereeName`}
                  defaultValue={this.props[this.props.model].evidence[criteriaId].refereeName}
                  disabled
                  label="Client referee's full name"
                  description="The referee must be an employee of the client who can verify your involvement in the project."
                  name={`referee_name_${criteriaId}`}
                  id={`referee_name_${criteriaId}`}
                  htmlFor={`referee_name_${criteriaId}`}
                  maxLength={100}
                  validators={{
                    required
                  }}
                  onChange={e => {
                    if (index === 0) {
                      this.updateAllOtherCriteriaFromFirst('refereeName', e.target.value)
                    }
                    return true
                  }}
                />
                <Textfield
                  model={`${this.props.model}.evidence[${criteriaId}].refereeNumber`}
                  disabled
                  defaultValue={this.props[this.props.model].evidence[criteriaId].refereeNumber}
                  label="Referee's phone number"
                  description="Please include the area code for landlines."
                  name={`referee_number_${criteriaId}`}
                  id={`referee_number_${criteriaId}`}
                  htmlFor={`referee_number_${criteriaId}`}
                  maxLength={100}
                  validators={{
                    required,
                    validPhoneNumber
                  }}
                  onChange={e => {
                    if (index === 0) {
                      this.updateAllOtherCriteriaFromFirst('refereeNumber', e.target.value)
                    }
                    return true
                  }}
                />
                <div className={styles.evidenceDates}>
                  <div>
                    <strong>Start of project</strong>
                    <Control.select
                      model={`${this.props.model}.evidence[${criteriaId}].startDate`}
                      disabled
                      id={`startDate_${criteriaId}`}
                      name={`startDate_${criteriaId}`}
                      mapProps={{
                        className: 'au-select'
                      }}
                      onChange={e => {
                        if (index === 0) {
                          this.updateAllOtherCriteriaFromFirst('startDate', e.target.value)
                        }
                        return true
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
                      model={`${this.props.model}.evidence[${criteriaId}].endDate`}
                      disabled
                      id={`endDate_${criteriaId}`}
                      name={`endDate_${criteriaId}`}
                      mapProps={{
                        className: 'au-select'
                      }}
                      onChange={e => {
                        if (index === 0) {
                          this.updateAllOtherCriteriaFromFirst('endDate', e.target.value)
                        }
                        return true
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
                  model={`${this.props.model}.evidence[${criteriaId}].background`}
                  disabled
                  label="Background"
                  description="Describe the background of the project you worked on."
                  name={`background_${criteriaId}`}
                  id={`background_${criteriaId}`}
                  htmlFor={`background_${criteriaId}`}
                  validators={{
                    required
                  }}
                  onCustomChange={value => {
                    if (index === 0) {
                      this.updateAllOtherCriteriaFromFirst('background', value)
                    }
                    return true
                  }}
                />
                <p>Your evidence for the criteria should:</p>
                <ul>
                  <li>Explain the activities you were specifically responsible for, what you did, and why.</li>
                  <li>Avoid ambiguity e.g. &apos;we have extensive experience in...&apos;.</li>
                  <li>Describe the result or outcome of your activities.</li>
                </ul>
                <Textarea
                  key={criteriaId}
                  model={`${this.props.model}.evidence[${criteriaId}].response`}
                  label={`Evidence for '${getCriteriaName(criteriaId, this.props.meta.domain.criteria)}'`}
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
                  disabled
                />
              </div>
            ))}
            {this.props.formButtons}
          </React.Fragment>
        )}
      </Form>
    )
  }
}

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

const mapDispatchToProps = (dispatch, props) => ({
  updateCriteriaSameAsFirst: (criteriaId, same) =>
    dispatch(actions.change(`${props.model}.evidence[${criteriaId}].sameAsFirst`, same)),
  updateEvidenceFieldValue: (criteriaId, fieldName, fieldValue) =>
    dispatch(actions.change(`${props.model}.evidence[${criteriaId}][${fieldName}]`, fieldValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellerAssessmentEvidenceStage)
