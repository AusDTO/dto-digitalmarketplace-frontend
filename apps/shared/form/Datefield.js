/* eslint-disable react/jsx-no-bind */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import format from 'date-fns/format'
import get from 'lodash/get'

import styles from './Datefield.scss'

class Datefield extends React.Component {
  constructor(props) {
    super(props)
    const { date, model, setDate } = this.props
    if (date && typeof date === 'string') {
      const propDate = new Date(date)
      this.state = {
        day: format(propDate, 'DD'),
        month: format(propDate, 'MM'),
        year: format(propDate, 'YYYY')
      }
    } else {
      setDate(model, '2017-01-01')
    }
  }

  state = {
    day: null,
    month: null,
    year: null
  }

  onChange(e) {
    const { model, setDate } = this.props
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        const { year, month, day } = this.state
        const date = format(
          new Date(Number((year && year.length === 2 ? '20' : '') + year), Number(month) - 1, Number(day)),
          'YYYY-MM-DD'
        )
        setDate(model, date)
      }
    )
  }

  render() {
    const { id, label, description } = this.props
    const { day, month, year } = this.state
    return (
      <div className="date-input">
        <label htmlFor="day" className="question-heading uikit-text-input__label">
          {label}
        </label>
        {description &&
          <p className="hint" id={`${id}-hint`}>
            {description}
          </p>}

        <div className={styles.field}>
          <label htmlFor="day" className="uikit-text-input__label">
            Day
          </label>
          <input
            className="uikit-text-input uikit-text-input--block"
            type="text"
            name="day"
            id="day"
            maxLength="2"
            onChange={this.onChange.bind(this)}
            defaultValue={day}
          />
        </div>

        <div className={styles.spacer}>/</div>

        <div className={styles.field}>
          <label htmlFor="month" className="uikit-text-input__label">
            Month
          </label>
          <input
            type="text"
            name="month"
            id="month"
            maxLength="2"
            onChange={this.onChange.bind(this)}
            defaultValue={month}
            className="uikit-text-input uikit-text-input--block"
          />
        </div>

        <div className={styles.spacer}>/</div>

        <div className={styles.field}>
          <label htmlFor="year" className="uikit-text-input__label">
            Year
          </label>
          <input
            type="text"
            name="year"
            id="year"
            maxLength="4"
            onChange={this.onChange.bind(this)}
            defaultValue={year}
            className="uikit-text-input uikit-text-input--block"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  date: get(state, ownProps.model)
})

const mapDispatchToProps = dispatch => ({
  setDate: (model, date) => dispatch(actions.change(model, date))
})

Datefield.defaultProps = {
  description: null
}

Datefield.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  description: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Datefield)
