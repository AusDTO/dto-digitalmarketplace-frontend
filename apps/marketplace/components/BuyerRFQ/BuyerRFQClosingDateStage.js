import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import formProps from 'shared/form/formPropsSelector'
import AUheading from '@gov.au/headings/lib/js/react.js'
import ClosingDateControl from './ClosingDateControl'

class BuyerRFQClosingDateStage extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidUpdate() {
    this.updateDoneStatus()
  }

  componentDidMount() {
    this.updateDoneStatus()
  }

  updateDoneStatus() {
    const { model } = this.props
    if (this.props[model].closedAt && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if (!this.props[model].closedAt && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
    }
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
          Closing date
        </AUheading>
        <ClosingDateControl
          id="closed_at"
          model={`${model}.closedAt`}
          onDateChange={this.handleDateChange}
          defaultValue={this.props[this.props.model].closedAt}
        />
      </div>
    )
  }
}

BuyerRFQClosingDateStage.propTypes = {
  model: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setDate: date => dispatch(actions.change(`${props.model}.closedAt`, date))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyerRFQClosingDateStage)
