import React, { Component, PropTypes } from 'react'

class Textarea extends Component {

  static defaultProps = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {}
  }

  constructor(props) {
    super(props)
    const { value = '', limit = 0 } = props
    const words = this.countWords(value)

    this.state = {
      wordsLeft: limit - words,
    }
  }

  countWords(s: string) {
    const count =  s.match(/\S+/g) || [];
    return count.length;
  }

  onChange(e) {
    const content = e.target.value
    const words = this.countWords(content)
    const { limit, onChange } = this.props
    this.setState({
      wordsLeft: limit - words,
    })
    onChange(content);
  }

  limitText(counter: number, wordsLeft: number) {
    let words = 'words'
    let affix = 'remaining'

    if (counter === 1 || counter === -1) {
      words = 'word'
    }

    if (wordsLeft < 0) {
      affix = 'too many'
    }

    return `${counter} ${words} ${affix}`
  }

  render() {
    const { value, limit, name, id, onBlur, onFocus, className = '' } = this.props
    let { wordsLeft } = this.state

    let counter = wordsLeft
    if (counter < 0) {
      counter *= -1
    }

    return (
      <div>
        <textarea
          ref="textarea"
          className={className}
          name={name}
          id={id}
          defaultValue={value}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={this.onChange.bind(this)}
        ></textarea>
        {limit ? (
          <span className="limit">{this.limitText(counter, wordsLeft)}</span>
        ) : ''}
      </div>
    )
  }
}

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  limit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.string
}

export default Textarea
