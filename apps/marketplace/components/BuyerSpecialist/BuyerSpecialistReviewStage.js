import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions, Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { getBriefLastQuestionDate } from 'marketplace/components/helpers'
import format from 'date-fns/format'
import BuyerSpecialistStages from './BuyerSpecialistStages'
import styles from './BuyerSpecialistReviewStage.scss'
import { required } from 'marketplace/components/validators'
import ErrorAlert from 'marketplace/components/BuyerBriefFlow/ErrorAlert'
import DateControl from 'marketplace/components/BuyerBriefFlow/DateControl'

class BuyerSpecialistReviewStage extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    this.props.setDate(`${date.year}-${date.month}-${date.day}`)
  }

  render() {
    const props = this.props
    return (
      <Form
        model={props.model}
        onSubmit={props.onSubmit}
        validators={{
          '': {
            requiredClosedAt: v => required(v.closedAt)
          }
        }}>
        <div>
          <AUheading level="1" size="xl">
            Review and publish
        </AUheading>
          <ErrorAlert
            title="An error occurred"
            model={props.model}
            messages={{
              closedAtIsValid: 'You must add a closing date at least 2 days from now',
              requiredClosedAt: 'You must enter the closing date for this opportunity',
              contactValidPhone: 'Contact number must be a valid phone number, including an area code'
            }}
          />
          <DateControl
            id="closedAt"
            model={`${props.model}.closedAt`}
            onDateChange={this.handleDateChange}
            defaultValue={props[props.model].closedAt}
            className={styles.closedAtControl}
            label="Closing date for opportunity"
            description="This date must be at least 2 days after you publish this request. Responses will be available after 6pm Canberra time."
          />
          <AUheading level="2" size="sm">
            If you publish today, you must be aware of the following dates:
          </AUheading>
          <div className={styles.milestones}>
            <div className="row">
              <div className="col-xs-12 col-sm-4">Today</div>
              <div className="col-xs-12 col-sm-8">
                Invited sellers can ask questions about your requirements and apply for the opportunity.
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                {format(getBriefLastQuestionDate(new Date(props[props.model].closedAt)), 'dddd D MMMM YYYY')}
              </div>
              <div className="col-xs-12 col-sm-8">The last day sellers can ask questions.</div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">{format(props[props.model].closedAt, 'dddd D MMMM YYYY')}</div>
              <div className="col-xs-12 col-sm-8">
                The last day you can publish answers to all sellers&apos; questions.
              <br />
                The last day sellers can apply.
              <br />
                The opportunity will close at 6pm Canberra time.
            </div>
            </div>
          </div>
          {props.stagesTodo.length > 0 ? (
            <div>
              <AUheading level="2" size="sm">
                Before you publish your opportunity, you need to complete information in:
            </AUheading>
              <ul>
                {props.stagesTodo.map(stage => (
                  <li key={stage}>
                    <Link to={stage}>{BuyerSpecialistStages.find(s => s.slug === stage).title || ''}</Link>
                  </li>
                ))}
              </ul>
            </div>) : (
              <div>
                <AUheading level="2" size="lg">
                  Once you press publish
            </AUheading>
                <ul>
                  <li>A summary of this request be will visible on the Digital Marketplace.</li>
                  <li>Only invited sellers and other buyers will be able to view attached documents.</li>
                </ul>
                {props.formButtons}
              </div>
            )}
        </div>
      </Form>
    )
  }
}

BuyerSpecialistReviewStage.defaultProps = {
  onSubmit: () => { },
  stagesTodo: []
}

BuyerSpecialistReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  stagesTodo: PropTypes.array,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSpecialistReviewStage)
