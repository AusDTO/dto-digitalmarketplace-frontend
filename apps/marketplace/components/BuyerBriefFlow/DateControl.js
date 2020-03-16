import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import AUtextInput from '@gov.au/text-inputs/lib/js/react'
import { padStart } from 'marketplace/components/helpers'
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
    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState(curState => {
      const newState = { ...curState }
      newState[name] = value
      return newState
    })
  }

  handleBlur(e) {
    const name = e.target.name
    let value = e.target.value
    value = name === 'year' ? value : padStart(value, 2, '0')
    this.setState(curState => {
      const newState = { ...curState }
      newState[name] = value
      this.props.onDateChange(newState)
      return newState
    })
  }

  handleInput = e => {
    e.persist()
    this.props.onDateInput(e)
  }

  render() {
    return (
      <div className={`row ${this.props.className}`}>
        <div className="col-xs-12">
          <label htmlFor={this.props.id} className="question-heading au-text-input__label">
            {this.props.label}
          </label>
          <div>{this.props.description}</div>
        </div>
        <div id={this.props.id} className={`col-xs-12 col-md-6 ${styles.inputsContainer}`}>
          <div>
            <label htmlFor="day">Day</label>
            <AUtextInput
              block
              id="day"
              type="number"
              name="day"
              value={this.state.day}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onInput={this.handleInput}
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
              onBlur={this.handleBlur}
              onInput={this.handleInput}
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
              onBlur={this.handleBlur}
              onInput={this.handleInput}
              min="2016"
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
  onDateInput: () => {},
  value: '',
  label: '',
  className: '',
  description: ''
}

DateComponent.propTypes = {
  onDateChange: PropTypes.func,
  onDateInput: PropTypes.func,
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
    onDateInput={props.onDateInput}
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
  onDateInput: () => {},
  className: '',
  label: '',
  validators: {}
}

DateControl.propTypes = {
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  onDateChange: PropTypes.func,
  onDateInput: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  validators: PropTypes.object
}

export default DateControl
