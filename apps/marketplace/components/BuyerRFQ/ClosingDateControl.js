import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control } from 'react-redux-form'
import format from 'date-fns/format'
import StatefulError from 'shared/form/StatefulError'
import { validDate } from 'marketplace/components/validators'
import AUtextInput from '@gov.au/text-inputs/lib/js/react'
import AUheading from '@gov.au/headings/lib/js/react.js'
import styles from './ClosingDateControl.scss'

class ClosingDate extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onDateChange(e.target.name, e.target.value)
  }

  render() {
    const parseValue = value => {
      let date = {
        day: '',
        month: '',
        year: ''
      }
      if (value) {
        const propDate = new Date(value)
        date = {
          day: format(propDate, 'DD'),
          month: format(propDate, 'MM'),
          year: format(propDate, 'YYYY')
        }
      }
      return date
    }
    const { day, month, year } = parseValue(this.props.value)

    return (
      <div className={`row ${styles.container}`}>
        <div className="col-xs-12">
          <AUheading level="2" size="sm">
            Closing date
          </AUheading>
          <p>Responses will be available after 6pm Canberra time on this date.</p>
        </div>
        <div className={`col-xs-12 col-md-6 ${styles.inputsContainer}`}>
          <div>
            <label htmlFor="day">Day</label>
            <AUtextInput
              block
              id="day"
              type="number"
              name="day"
              value={day}
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
              value={month}
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
              value={year}
              onChange={this.handleChange}
              min="2018"
              max="2099"
            />
          </div>
        </div>
        {this.props.messages && (
          <div className="col-xs-12">
            <StatefulError
              model={this.props.formModel}
              messages={this.props.messages}
              showMessagesDuringFocus="false"
              id={this.props.id}
            />
          </div>
        )}
      </div>
    )
  }
}

const ClosingDateControl = props => (
  <Control
    id={props.id}
    model={props.model}
    component={ClosingDate}
    validators={{
      validDate
    }}
    messages={{
      validDate: 'You must input a valid date in the future.'
    }}
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
