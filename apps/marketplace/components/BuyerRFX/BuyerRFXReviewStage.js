import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import isWeekend from 'date-fns/is_weekend'
import BuyerRFXStages from './BuyerRFXStages'
import styles from './BuyerRFXReviewStage.scss'

const getStageNameBySlug = stageToFind => {
  const match = BuyerRFXStages.find(stage => stage.slug === stageToFind)
  return match ? match.title : ''
}

const nextWeekDay = date => {
  let newDate = date
  while (isWeekend(newDate)) {
    newDate = addDays(newDate, 1)
  }
  return newDate
}

const getLastQuestionDate = closingDate => {
  const today = new Date()
  let lastQuestionDate = new Date()
  if (closingDate < addDays(today, 3)) {
    lastQuestionDate = nextWeekDay(subDays(closingDate, 1))
    if (today > lastQuestionDate) {
      lastQuestionDate = today
    }
  } else if (closingDate < addDays(today, 8)) {
    lastQuestionDate = nextWeekDay(addDays(today, 2))
  } else {
    lastQuestionDate = nextWeekDay(addDays(today, 5))
  }
  if (lastQuestionDate > closingDate) {
    lastQuestionDate = closingDate
  }
  return lastQuestionDate
}

const getLastAnswerDate = closingDate => {
  let lastAnswerDate = subDays(closingDate, 1)
  if (lastAnswerDate < getLastQuestionDate(closingDate)) {
    lastAnswerDate = closingDate
  }
  return lastAnswerDate
}

const BuyerRFXReviewStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    {props.stagesTodo.length > 0 ? (
      <div>
        <AUheading level="1" size="xl">
          Review and publish
        </AUheading>
        <p>Before you publish your brief, you need to complete information in:</p>
        <ul>
          {props.stagesTodo.map(stage => (
            <li key={stage}>
              <Link to={stage}>{getStageNameBySlug(stage)}</Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <AUheading level="1" size="xl">
          Review and publish
        </AUheading>
        <p>If you publish today, you must be aware of the following dates:</p>
        <div className={styles.milestones}>
          <div className="row">
            <div className="col-xs-12 col-sm-4">Today</div>
            <div className="col-xs-12 col-sm-8">
              Invited sellers can ask questions about your requirements and apply for the brief.
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              {format(getLastQuestionDate(new Date(props[props.model].closedAt)), 'D MMMM')}
            </div>
            <div className="col-xs-12 col-sm-8">The last day sellers can ask questions.</div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              {format(getLastAnswerDate(new Date(props[props.model].closedAt)), 'D MMMM')}
            </div>
            <div className="col-xs-12 col-sm-8">
              The last day you can publish answers to all sellers&apos; questions.
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">{format(props[props.model].closedAt, 'D MMMM')}</div>
            <div className="col-xs-12 col-sm-8">
              The last day sellers can apply.
              <br />
              The opportunity will close at 6pm Canberra time.
            </div>
          </div>
        </div>
        <AUheading level="2" size="lg">
          Once you press publish
        </AUheading>
        <ul>
          <li>A summary of this request will be visible on the Digital Marketplace.</li>
          <li>
            Only invited sellers and other buyers can view attached documents{props[props.model].industryBriefing && (
              <span> and industry briefing details</span>
            )}.
          </li>
          <li>An email will be sent to the sellers&apos; business contacts inviting them to view and respond.</li>
        </ul>
        {props.formButtons}
      </div>
    )}
  </Form>
)

BuyerRFXReviewStage.defaultProps = {
  onSubmit: () => {},
  stagesTodo: []
}

BuyerRFXReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  stagesTodo: PropTypes.array,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFXReviewStage)
