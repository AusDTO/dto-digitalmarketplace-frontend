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

  emptyRow(id, value = '') {
    return { id, value }
  }

  constructor(props) {
    super(props);

    this.state = {
      inputs: props.rows || Array
        .from({ length: props.defaultRows || 1 })
        .map((_, i) => this.emptyRow(i))
    };
  }

  /**
   * Get an array of values from the inputs.
   * Removes empty values
   * @return {array}
   */
  getValues() {
    return this.state.inputs.map(input => input.value).filter(i => i);
  }

  onChange(id, e) {
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

  addRow(e) {
    e.preventDefault();
    const { inputs } = this.state;
    const highestRow = inputs.reduce((current, previous) => {
      if (current.id > previous.id) {
        return current;
      } else {
        return previous;
      }
    })

    this.setState({
      inputs: inputs.concat(this.emptyRow(highestRow.id + 1))
    });

  }

  removeRow(id, e) {
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
          return (
            <div key={id}>
              <label>{i + 1}</label>
              <input
                type="text"
                name={fieldName}
                id={fieldName}
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