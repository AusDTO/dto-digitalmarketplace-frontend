import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import { getBriefLastQuestionDate, getLockoutStatus } from 'marketplace/components/helpers'
import format from 'date-fns/format'
import BuyerRFXStages from './BuyerRFXStages'
import styles from './BuyerRFXReviewStage.scss'

export class BuyerRFXReviewStage extends Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const { lockoutPeriod, model } = this.props
    const { closingTime } = getLockoutStatus(lockoutPeriod, this.props[model].closedAt)

    return (
      <Form model={this.props.model} onSubmit={this.props.onSubmit}>
        {this.props.stagesTodo.length > 0 ? (
          <div>
            <AUheading level="1" size="xl">
              Review and publish
            </AUheading>
            <p>Before you publish your opportunity, you need to complete information in:</p>
            <ul>
              {this.props.stagesTodo.map(stage => (
                <li key={stage}>
                  <Link to={stage}>{BuyerRFXStages.find(s => s.slug === stage).title || ''}</Link>
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
                  Invited sellers can ask questions about your requirements and apply for the opportunity.
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  {format(
                    getBriefLastQuestionDate(new Date(this.props[this.props.model].closedAt)),
                    'dddd D MMMM YYYY'
                  )}
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
            <AUheading level="2" size="lg">
              Once you press publish
            </AUheading>
            <ul>
              <li>A summary of this request will be visible on the Digital Marketplace.</li>
              <li>Only invited sellers and other buyers will be able to view attached documents.</li>
              {this.props[this.props.model].industryBriefing && (
                <li>Only invited sellers will be able to view industry briefing details you provide.</li>
              )}
              <li>An email will be sent to the sellers&apos; business contacts inviting them to view and respond.</li>
            </ul>
            {this.props.formButtons}
          </div>
        )}
      </Form>
    )
  }
}

BuyerRFXReviewStage.defaultProps = {
  onSubmit: () => {},
  stagesTodo: [],
  lockoutPeriod: {
    startDate: null,
    endDate: null
  }
}

BuyerRFXReviewStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  stagesTodo: PropTypes.array,
  onSubmit: PropTypes.func,
  lockoutPeriod: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model),
  lockoutPeriod: state.brief.lockoutPeriod
})

export default connect(mapStateToProps)(BuyerRFXReviewStage)
