import React from 'react'

class LinkInput extends React.Component {
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
    if (props.rows && props.rows.length) {
        // handle legacy data
        if (typeof props.rows[0] === 'string') {
            inputs = props.rows.map(value => {return {url: value}});
            inputs = inputs.map((row, i) => this.createRow(i, row));
        } else {
            inputs = props.rows.map((row, i) => this.createRow(i, row))
        }
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
          input.value = {}
          if (e.target.parentNode) {
              Object.values(e.target.parentNode.getElementsByTagName('input')).forEach(field => {
                  input.value[field.getAttribute('data-field')] = field.value
              })
          }
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
    const { name, onBlur, onFocus, className = '', describedby, hint } = this.props;
    return (
      <div>
        {inputs.map(({ id, value }, i) => {
          return (
            <div key={id} className="link-entry list-entry row">
              <div className="col-xs-12 col-sm-9">
                <strong>{i + 1}.</strong><br/>
                <label htmlFor={`${name}-title-${i}`} > Title:</label>
                <input
                    type="text"
                    name={`${name}-title[]`}
                    id={`${name}-title-${i}`}
                    data-field="title"
                    onChange={this.onChange.bind(this, id)}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className={`text-box ${className}`}
                    aria-describedby={hint && describedby}
                    defaultValue={value.title} />
                <label htmlFor={`${name}-url-${i}`}>URL:</label>
                <input
                    type="text"
                    name={`${name}-url[]`}
                    id={`${name}-url-${i}`}
                    data-field="url"
                    onChange={this.onChange.bind(this, id)}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    className={`text-box ${className}`}
                    aria-describedby={hint && describedby}
                    defaultValue={value.url} />

              </div>
              {i > 0 && (
                <button type="button" className="button-secondary col-xs-12 col-sm-3" onClick={this.removeRow.bind(this, id)}>
                  remove <span className="visuallyhidden">number {i + 1}</span>
                </button>
              )}
            </div>
          )
        })}
        <button type="button" className="button-secondary" onClick={this.addRow.bind(this)}>
          Add another row
        </button>
      </div>
    )
  }
}

export default LinkInput;