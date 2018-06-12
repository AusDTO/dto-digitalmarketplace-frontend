/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Control } from 'react-redux-form'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUbutton from '@gov.au/buttons/lib/js/react.js'
import Textfield from 'shared/form/Textfield'
import { required, validEmail } from 'shared/validators'
import ErrorBox from 'shared/form/ErrorBox'

import styles from './BriefInviteAssessorsForm.scss'

const BriefInviteAssessorsForm = ({
  model,
  assessors,
  setFocus,
  handleSubmit,
  handleRemoveClick,
  remainingCount,
  submitClicked
}) => (
  <div>
    <ErrorBox
      title="There was a problem inviting an evaluator"
      model={model}
      setFocus={setFocus}
      submitClicked={submitClicked}
    />
    <AUheading size="xl" level="1">
      Your evaluators
    </AUheading>
    {assessors.length === 0 ? (
      <p>You have no evaluators added.</p>
    ) : (
      <div className={`remove-assessor ${styles.container} `}>
        {assessors.map(email => (
          <div className="row" key={email}>
            <div className="col-md-4 col-sm-4">{email}</div>
            <div className="col-md-2 col-sm-2">
              <div className={`${styles.badge} au-display-xs`}>Invite sent</div>
            </div>
            <div className="col-md-6 col-sm-6">
              <AUbutton as="tertiary" onClick={e => handleRemoveClick(email, e)}>
                Remove evaluator
              </AUbutton>
            </div>
          </div>
        ))}
      </div>
    )}
    <AUheading size="lg" level="2">
      Invite evaluators
    </AUheading>
    <p className={styles.remainingCount}>{`(${remainingCount} remaining)`}</p>
    <p>We will email your chosen evaluators requesting their input in the evaluation process.</p>
    <Form model={model} id="briefResponse" onSubmit={data => handleSubmit(data)}>
      <Textfield
        model={`${model}.email_address`}
        name="email_address"
        id="email_address"
        type="email"
        htmlFor="email_address"
        label="Email address"
        validators={{ required, validEmail }}
        messages={{
          required: 'Evaluator email is required',
          validEmail: 'A validly formatted email is required.'
        }}
      />
      <span className="au-control-input au-control-input--full">
        <Control.checkbox
          model=".view_day_rates"
          id="view_day_rates"
          name="view_day_rates"
          value="no"
          mapProps={{
            className: 'au-control-input__input'
          }}
        />
        <label className="au-control-input__text" htmlFor="view_day_rates">
          Allow this evaluator to see the candidate’s day rates.
        </label>
      </span>
      <AUbutton type="submit" className={styles.submitButton} onClick={submitClicked}>
        Send invite
      </AUbutton>
    </Form>
  </div>
)

BriefInviteAssessorsForm.defaultProps = {
  model: '',
  assessors: []
}

BriefInviteAssessorsForm.propTypes = {
  model: PropTypes.string.isRequired,
  assessors: PropTypes.array.isRequired,
  setFocus: PropTypes.func,
  handleSubmit: PropTypes.func,
  remainingCount: PropTypes.number,
  handleRemoveClick: PropTypes.func,
  submitClicked: PropTypes.func
}

export default BriefInviteAssessorsForm
