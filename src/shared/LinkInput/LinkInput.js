import React from 'react'
import {validLink} from '../../validators'

import './LinkInput.css'

class LinkInput extends React.Component {
    static propTypes = {
        rows: React.PropTypes.array,
        defaultRows: React.PropTypes.number,
        onChange: React.PropTypes.func,
        name: React.PropTypes.string.isRequired
    }

    static defaultProps = {
        onChange: () => {
        },
        onBlur: () => {
        },
        onFocus: () => {
        },
    }

    constructor(props) {
        super(props);

        let inputs;
        if (props.rows && props.rows.length) {
            // handle legacy data
            if (typeof props.rows[0] === 'string') {
                inputs = props.rows.map(value => {
                    return {url: value}
                });
                inputs = inputs.map((row, i) => this.createRow(i, row));
            } else {
                inputs = props.rows.map((row, i) => this.createRow(i, row))
            }
        }

        this.state = {
            inputs: inputs || Array
                .from({length: props.defaultRows || 1})
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
        return {id, value}
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
        const {onChange} = this.props;

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

            return {inputs: newInputs};
        }, () => onChange(this.getValues()));

    }

    addRow(e: ReactEvent) {
        e.preventDefault();
        const {inputs} = this.state;
        const lastRow = inputs[inputs.length - 1];

        this.setState({
            inputs: inputs.concat(this.createRow(lastRow.id + 1))
        });

    }

    removeRow(id: number, e: ReactEvent) {
        e.preventDefault()
        const {inputs} = this.state;
        const {onChange} = this.props;

        this.setState({
            inputs: inputs.filter(r => r.id !== id)
        }, () => onChange(this.getValues()));
    }

    render() {
        const {inputs} = this.state;
        const {name, onBlur, onFocus, className = '', describedby, hint, errors} = this.props;
        return (
            <div>
                {inputs.map(({id, value}, i) => {
                    return (
                        <span key={id}>
                            {i > 0 && <span><hr styleName="hr"/>

                                <div className="row">
                                        <div className="col-xs-8 col-sm-10">
                                          <h3 style={{marginTop: 0, marginBottom:0}}>Additional link (optional)</h3>
                                        </div>
                                        <div className="col-xs-4 col-sm-2">
                                             <button type="button" className="button-secondary col-xs-12 col-sm-3"
                                                     styleName="remove-button"
                                                     onClick={this.removeRow.bind(this, id)}>
                                        Remove <span className="visuallyhidden">number {i + 1}</span>
                                    </button>
                                        </div>
                                    </div>
                            </span>}
                            <div className="row">
                                        <div className="col-xs-12 col-sm-10">
                <div className="field">
                  <label htmlFor={`${name}-title-${i}`} className="question-heading">Link Title</label>
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
                        defaultValue={value.title}
                        style={{outline: "0"}}/>
                </div>

                <div className="field">
                    <label htmlFor={`${name}-url-${i}`} className="question-heading">Link URL</label>
                    {!validLink(this.state.inputs[i].value.url) && errors}
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
                        defaultValue={value.url}
                        style={ (!validLink(this.state.inputs[i].value.url) ? {}: {outline:"0"}) }/>
                 </div>
              </div>

            </div>
              </span>
                    )
                })}
                <button type="button" className="button-secondary" styleName="anotherLinkButton" onClick={this.addRow.bind(this)}>
                    Add another link
                </button>
            </div>
        )
    }
}

export default LinkInput;