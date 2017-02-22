import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import format from 'date-fns/format';
import get from 'lodash/get';

class Datefield extends React.Component {

  state = {
    day: void 0,
    month: void 0,
    year: void 0
  }

  constructor(props) {
    super(props);

    if (props.date && typeof props.date === 'string') {
      let propDate = new Date(props.date);
      this.state = {
        day: format(propDate, 'DD'),
        month: format(propDate, 'MM'),
        year: format(propDate, 'YYYY')
      }
    }
    else {
      props.setDate(props.model, '2017-01-01');
    }
  }

  onChange(e) {
    const { model, setDate } = this.props;
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      const { year, month, day } = this.state;

      let date = format(new Date(Number(year), Number(month) - 1, Number(day)), 'YYYY-MM-DD');

      setDate(model, date);
    });
  }

  render() {
    const { id, htmlFor, label, description } = this.props;
    const {
      day,
      month,
      year
    } = this.state;

    return (
      <div className="datefield">
        <label htmlFor={htmlFor} className="question-heading">{label}</label>
        {description && (
          <p className="hint" id={`${id}-hint`}>{description}</p>
        )}

        <div className="field">
          <label htmlFor={htmlFor} className="question-heading">DD</label>
          <input
            type="text"
            name="day"
            maxLength="2"
            onChange={this.onChange.bind(this)}
            defaultValue={day}
          />
        </div>

        <div className="field">
          <label htmlFor={htmlFor} className="question-heading">MM</label>
          <input
            type="text"
            name="month"
            maxLength="2"
            onChange={this.onChange.bind(this)}
            defaultValue={month}
          />
        </div>

        <div className="field">
          <label htmlFor={htmlFor} className="question-heading">YYYY</label>
          <input
            type="text"
            name="year"
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

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (model, date) => {
      return dispatch(actions.change(model, date));
    }
  }
}

Datefield.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  model: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.string,
  ]).isRequired,
  description: React.PropTypes.string,
  pattern: React.PropTypes.string,
  type: React.PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Datefield);
