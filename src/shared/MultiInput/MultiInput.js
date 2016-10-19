import React from 'react'

class MultiInput extends React.Component {
	static propTypes = {
		rows: React.PropTypes.array,
		defaultRows: React.PropTypes.number,
		onChange: React.PropTypes.func
	}

	static defaultProps = {
		onChange: () => {},
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

	onChange(e) {
		const { inputs } = this.state;
		const { onChange } = this.props
		onChange(inputs)
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
		let { inputs } = this.state;
		this.setState({
			inputs: inputs.filter(r => r.id !== id)
		})
	}

	render() {
		const { inputs } = this.state;
		return (
			<div>
				{inputs.map(({ id, value }, i) => {
					let fieldName = `${name}-${i}`;
					return (
						<div key={id}>
							<label>{i + 1}</label>
							<input type="text" name={fieldName} onChange={this.onChange.bind(this)} id={fieldName} defaultValue={value} />
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