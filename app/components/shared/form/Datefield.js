import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import format from 'date-fns/format'
import get from 'lodash/get'

import './scss/Datefield.scss'

class Datefield extends React.Component {
  state = {
    day: void 0,
    month: void 0,
    year: void 0
  }

  constructor(props) {
    super(props)
    const { date, model, setDate } = this.props
    if (date && typeof date === 'string') {
      let propDate = new Date(date)
      this.state = {
        day: format(propDate, 'DD'),
        month: format(propDate, 'MM'),
        year: format(propDate, 'YYYY')
      }
    } else {
      setDate(model, '2017-01-01')
    }
  }

  onChange(e) {
    const { model, setDate } = this.props
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        const { year, month, day } = this.state
        let date = format(
          new Date(Number((year.length === 2 ? '20' : '') + year), Number(month) - 1, Number(day)),
          'YYYY-MM-DD'
        )
        setDate(model, date)
      }
    )
  }

  render() {
    const { id, htmlFor, label, description } = this.props
    const { day, month, year } = this.state
    /*eslint-disable jsx-a11y/label-has-for*/
    return (
      <div styleName="date-input">
        <label htmlFor={htmlFor} className="question-heading">
          {label}
        </label>
        {description &&
          <p className="hint" id={`${id}-hint`}>
            {description}
          </p>}

        <div styleName="fields flush">
          <label htmlFor={htmlFor} styleName="date-heading">
            Day
          </label>
          <input type="text" name="day" id="day" maxLength="2" onChange={this.onChange.bind(this)} defaultValue={day} />
        </div>

        <div styleName="slashSpacer">/</div>

        <div styleName="fields flush">
          <label htmlFor={htmlFor} styleName="date-heading">
            Month
          </label>
          <input
            type="text"
            name="month"
            id="month"
            maxLength="2"
            onChange={this.onChange.bind(this)}
            defaultValue={month}
          />
        </div>

        <div styleName="slashSpacer">/</div>

        <div styleName="fields">
          <label htmlFor={htmlFor} styleName="date-heading">
            Year
          </label>
          <input
            type="text"
            name="year"
            id="year"
            maxLength="4"
            onChange={this.onChange.bind(this)}
            defaultValue={year}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    date: get(state, ownProps.model)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDate: (model, date) => {
      return dispatch(actions.change(model, date))
    }
  }
}

Datefield.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  model: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  description: PropTypes.string,
  pattern: PropTypes.string,
  type: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Datefield)
