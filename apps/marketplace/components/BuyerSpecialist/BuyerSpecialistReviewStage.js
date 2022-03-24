import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { getBriefLastQuestionDate } from 'marketplace/components/helpers'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import ErrorAlert from 'marketplace/components/Alerts/ErrorAlert'
import BuyerSpecialistStages from './BuyerSpecialistStages'
import styles from './BuyerSpecialistReviewStage.scss'

export class BuyerSpecialistReviewStage extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const { blackoutPeriod } = this.props
    const isBlackoutPeriod = blackoutPeriod.startDate && blackoutPeriod.endDate
    let closingTime = '6pm'
    if (isBlackoutPeriod && isAfter(new Date(this.props[this.props.model].closedAt), blackoutPeriod.startDate)) {
      closingTime = '11:55pm'
    }

    return (
      <Form model={this.props.model} onSubmit={this.props.onSubmit} validators={{}}>
        <div>
          <AUheading level="1" size="xl">
            Review and publish
          </AUheading>
          <ErrorAlert model={this.props.model} messages={{}} />
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
                {format(getBriefLastQuestionDate(new Date(this.props[this.props.model].closedAt)), 'dddd D MMMM YYYY')}
              </div>
              <div className="col-xs-12 col-sm-8">The last day sellers can ask questions.</div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                {format(this.props[this.props.model].closedAt, 'dddd D MMMM YYYY')}
              </div>
              <div className="col-xs-12 col-sm-8">
                The last day you can publish answers to all sellers&apos; questions.
                <br />
                The last day sellers can apply.
                <br />
                The opportunity will close at {closingTime} Canberra time.
              </div>
            </div>
          </div>
          {this.props.stagesTodo.length > 0 ? (
            <div>
              <AUheading level="2" size="sm">
                Before you publish your opportunity, you need to complete information in:
              </AUheading>
              <ul>
                {this.props.stagesTodo.map(stage => (
                  <li key={stage}>
                    <Link to={stage}>{BuyerSpecialistStages.find(s => s.slug === stage).title || ''}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <AUheading level="2" size="lg">
                Once you press publish
              </AUheading>
              <ul>
                <li>A summary of this request will be visible on the Digital Marketplace.</li>
                <li>Only invited sellers and other buyers will be able to view attached documents.</li>
              </ul>
              {this.props.formButtons}
            </div>
          )}
        </div>
      </Form>
    )
  }
}

BuyerSpecialistReviewStage.defaultProps = {
  onSubmit: () => {},
  stagesTodo: [],
  blackoutPeriod: {
    startDate: null,
    endDate: null
  }
}

BuyerSpecialistReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  stagesTodo: PropTypes.array,
  onSubmit: PropTypes.func,
  blackoutPeriod: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  blackoutPeriod: state.brief.blackoutPeriod
})

export default connect(mapStateToProps)(BuyerSpecialistReviewStage)
