import React from 'react'
import PropTypes from 'prop-types'

class MultiInput extends React.Component {
  static propTypes = {
    rows: PropTypes.array,
    defaultRows: PropTypes.number,
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    disabled: false
  }

  constructor(props) {
    super(props);

    let inputs;
    if (props.rows && props.rows.length) {
      inputs = props.rows.map((row, i) => this.createRow(i, row))
    }

    this.state = {
      inputs: inputs || Array
        .from({ length: props.defaultRows || 1 })
        .map((_, i) => this.createRow(i))
    };
  }

  /**
   * Pad out new row
   * @param  {number}
   * @param  {String}
   * @return {object}
   */
  createRow(id: number, value: string = '') {
    return { id, value }
  }

  /**
   * Get an array of values from the inputs.
   * Removes empty values
   * @return {array}
   */
  getValues() {
    return this.state.inputs.map(input => input.value).filter(i => i);
  }

  onChange(id: number, e: ReactEvent) {
    const { onChange } = this.props;

    // @see https://fb.me/react-event-pooling
    e.persist();

    this.setState((previousState) => {
      let newInputs = previousState.inputs.map(input => {
        if (input.id === id) {
          input.value = e.target.value;
        }

        return input;
      });

      return { inputs: newInputs };
    }, () => onChange(this.getValues()));

  }

  addRow(e: ReactEvent) {
    e.preventDefault();
    const { inputs } = this.state;
    const lastRow = inputs[inputs.length - 1];

    this.setState({
      inputs: inputs.concat(this.createRow(lastRow.id + 1))
    });

  }

  removeRow(id: number, e: ReactEvent) {
    e.preventDefault()
    const { inputs } = this.state;
    const { onChange } = this.props;

    this.setState({
      inputs: inputs.filter(r => r.id !== id)
    }, () => onChange(this.getValues()));
  }

  render() {
    const { inputs } = this.state;
    const { name, onBlur, onFocus, className = '', describedby, hint, disabled } = this.props;
    return (
      <div>
        {inputs.map(({ id, value }, i) => {
          let fieldName = `${name}[]`;
          let fieldId = `${name}-${i}`
          return (
            <div key={id} className="list-entry row">
              <div className="col-xs-12 col-sm-9">
                <label htmlFor={fieldId} className="text-box-number-label">{i + 1}.</label>
                <input
                  type="text"
                  name={fieldName}
                  id={fieldId}
                  onChange={this.onChange.bind(this, id)}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  className={`text-box ${className}`}
                  aria-describedby={hint && describedby}
                  defaultValue={value}
                  disabled={disabled}
                />
              </div>
              {i > 0 && !disabled && (
                <button type="button" className="button-secondary col-xs-12 col-sm-3" onClick={this.removeRow.bind(this, id)}>
                  remove <span className="visuallyhidden">number {i + 1}</span>
                </button>
              )}
            </div>
          )
        })}
        {!disabled && (
          <button type="button" className="button-secondary" onClick={this.addRow.bind(this)}>
            Add another row
          </button>
        )}
      </div>
    )
  }
}

export default MultiInput;