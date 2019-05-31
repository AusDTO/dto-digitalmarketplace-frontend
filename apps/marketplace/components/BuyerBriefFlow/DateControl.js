import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import AUtextInput from '@gov.au/text-inputs/lib/js/react'
import styles from './DateControl.scss'

const parseValue = value => {
  let date = {
    day: '',
    month: '',
    year: ''
  }
  if (value && value.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
    date = {
      day: value.split('-')[2] ? value.split('-')[2] : '',
      month: value.split('-')[1] ? value.split('-')[1] : '',
      year: value.split('-')[0] ? value.split('-')[0] : ''
    }
  }
  return date
}

export class DateComponent extends Component {
  constructor(props) {
    super(props)

    const { day, month, year } = parseValue(props.value)
    this.state = {
      day,
      month,
      year
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState(curState => {
      const newState = { ...curState }
      newState[name] = value
      this.props.onDateChange(newState)
      return newState
    })
  }

  render() {
    return (
      <div className={`row ${this.props.className}`}>
        <div className="col-xs-12">
          <label htmlFor="closing_date" className="question-heading au-text-input__label">
            {this.props.label}
          </label>
          <div>{this.props.description}</div>
        </div>
        <div id="closing_date" className={`col-xs-12 col-md-6 ${styles.inputsContainer}`}>
          <div>
            <label htmlFor="day">Day</label>
            <AUtextInput
              block
              id="day"
              type="number"
              name="day"
              value={this.state.day}
              onChange={this.handleChange}
              min="1"
              max="31"
              placeholder="DD"
            />
          </div>
          <div>
            <label htmlFor="month">Month</label>
            <AUtextInput
              block
              id="month"
              type="number"
              name="month"
              value={this.state.month}
              onChange={this.handleChange}
              min="1"
              max="12"
              placeholder="MM"
            />
          </div>
          <div>
            <label htmlFor="year">Year</label>
            <AUtextInput
              block
              id="year"
              type="number"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
              min="2019"
              max="2099"
              placeholder="YYYY"
            />
          </div>
        </div>
      </div>
    )
  }
}

DateComponent.defaultProps = {
  onDateChange: () => {},
  value: '',
  label: '',
  className: '',
  description: ''
}

DateComponent.propTypes = {
  onDateChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string
}

const DateControl = props => (
  <Control
    id={props.id}
    model={props.model}
    component={DateComponent}
    onDateChange={props.onDateChange}
    className={props.className}
    label={props.label}
    description={props.description}
    mapProps={{
      value: ownProps => ownProps.viewValue,
      formModel: ownProps => ownProps.model
    }}
    validators={props.validators}
  />
)

DateControl.defaultProps = {
  onDateChange: () => {},
  className: '',
  label: '',
  validators: {}
}

DateControl.propTypes = {
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  onDateChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  validators: PropTypes.object
}

export default DateControl
