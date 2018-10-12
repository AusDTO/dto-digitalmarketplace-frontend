import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ClosingDateControl from './ClosingDateControl'

class BuyerRFQMarketApproachStage extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(name, value) {
    let date = this.props[this.props.model].closedAt
    switch (name) {
      case 'day':
        date = `${date
          .split('-')
          .slice(0, 2)
          .join('-')}-${value}`
        break
      case 'month':
        date = `${date.split('-').slice(0, 1)}-${value}-${date.split('-').slice(-1)}`
        break
      case 'year':
        date = `${value}-${date
          .split('-')
          .slice(1)
          .join('-')}`
        break
      default:
        break
    }
    this.props.setDate(date)
  }

  render() {
    const { model } = this.props
    return (
      <div>
        <AUheading level="1" size="xl">
          Market approach
        </AUheading>
        <ClosingDateControl
          id="closed_at"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[this.props.model].closedAt}
        />
        <Textarea
          model={`${model}.industryBriefing`}
          label="Industry briefing (optional)"
          description="Make sure you include the date, time and access details of your briefing. This information will only be available to invited sellers."
          name="industryBriefing"
          id="industryBriefing"
          htmlFor="industryBriefing"
          defaultValue={this.props[model].industryBriefing}
          controlProps={{ limit: 150 }}
        />
      </div>
    )
  }
}

BuyerRFQMarketApproachStage.propTypes = {
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQMarketApproachStage)
