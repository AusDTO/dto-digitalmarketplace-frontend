import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import AUtextInput from '@gov.au/text-inputs/lib/js/react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './ClosingDateControl.scss'

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

export class ClosingDate extends Component {
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
      <div className={`row ${styles.container}`}>
        <div className="col-xs-12">
          <AUheading level="2" size="sm">
            Closing date
          </AUheading>
          <p>
            We recommend publishing for at least 2 weeks to allow interested sellers to respond.
            Responses will be available after 6pm Canberra time on this date.
          </p>
        </div>
        <div className={`col-xs-12 col-md-6 ${styles.inputsContainer}`}>
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
              min="2018"
              max="2099"
            />
          </div>
        </div>
      </div>
    )
  }
}

ClosingDate.defaultProps = {
  onDateChange: () => {},
  value: ''
}

ClosingDate.propTypes = {
  onDateChange: PropTypes.func,
  value: PropTypes.string
}

const ClosingDateControl = props => (
  <Control
    id={props.id}
    model={props.model}
    component={ClosingDate}
    onDateChange={props.onDateChange}
    mapProps={{
      value: ownProps => ownProps.viewValue,
      formModel: ownProps => ownProps.model
    }}
  />
)

ClosingDateControl.defaultProps = {
  onDateChange: () => {}
}

ClosingDateControl.propTypes = {
  id: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  onDateChange: PropTypes.func
}

export default ClosingDateControl
