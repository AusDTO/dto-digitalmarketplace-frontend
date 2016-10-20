import React from 'react'

class MultiInput extends React.Component {
  static propTypes = {
    rows: React.PropTypes.array,
    defaultRows: React.PropTypes.number,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  }

  constructor(props) {
    super(props);

    let inputs;
    if (props.rows) {
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
    const { name, onBlur, onFocus } = this.props;
    return (
      <div>
        {inputs.map(({ id, value }, i) => {
          let fieldName = `${name}[]`;
          let fieldId = `${name}-${i}`;
          return (
            <div key={id}>
              <label>{i + 1}</label>
              <input
                type="text"
                name={fieldName}
                id={fieldId}
                onChange={this.onChange.bind(this, id)}
                onBlur={onBlur}
                onFocus={onFocus}
                defaultValue={value} />
              {i > 0 && (
                <a href="#" onClick={this.removeRow.bind(this, id)}>remove</a>
              )}
            </div>
          )
        })}
        <a href="#" onClick={this.addRow.bind(this)}>Add another row</a>
      </div>
    )
  }
}

export default MultiInput;