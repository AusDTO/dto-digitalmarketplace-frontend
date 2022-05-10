import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    let { value, limit, name, id, onBlur, onFocus, className = '', describedby, hint, disabled, readOnly } = this.props
    let { wordsLeft } = this.state

    let counter = wordsLeft
    if (counter < 0) {
      counter *= -1
    }

    if (limit) {
      className = classNames(className, {
        'under-50': limit <= 50,
        'under-100': limit <= 100 && limit > 50,
        'under-200': limit <= 200 && limit > 100,
        'over-200': limit > 200,
      })
    }

    return (
      <div>
        <textarea
          className={className}
          name={name}
          id={id}
          defaultValue={value}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-describedby={describedby}
          onChange={this.onChange.bind(this)}
          disabled={disabled}
          readOnly={readOnly}
        ></textarea>
        {limit ? (
          <span className="word-count-counter" aria-live="polite">{this.limitText(counter, wordsLeft)}</span>
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
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string
}

export default Textarea
