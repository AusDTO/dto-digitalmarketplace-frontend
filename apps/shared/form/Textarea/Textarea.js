/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from '../scss/Textarea.scss'

class Textarea extends Component {
  static defaultProps = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onCustomChange: () => {}
  }

  constructor(props) {
    super(props)
    const { value = '', limit = 0, minimum = 0 } = props
    const words = this.countWords(value)

    this.state = {
      wordsLeft: limit - words,
      wordsToGo: minimum - words
    }

    this.countWords = this.countWords.bind(this)
    this.limitText = this.limitText.bind(this)
    this.toGoText = this.toGoText.bind(this)
    this.updateWordCounter = this.updateWordCounter.bind(this)
  }

  componentDidUpdate = prevProps => {
    const { value } = this.props

    if (value !== prevProps.value) {
      this.updateWordCounter(value)
    }
  }

  updateWordCounter = content => {
    const { limit, minimum } = this.props
    const words = this.countWords(content)

    this.setState({
      wordsLeft: limit - words,
      wordsToGo: minimum - words
    })
  }

  countWords(s: string) {
    const count = (s && s.match(/\S+/g)) || []
    return count.length
  }

  onChange(e) {
    const content = e.target.value
    const { onChange, onCustomChange } = this.props

    this.updateWordCounter(content)
    onChange(content)
    onCustomChange(content)
  }

  limitText(counter: number, wordsLeft: number) {
    let words = 'words'
    let affix = 'left'

    if (counter === 1 || counter === -1) {
      words = 'word'
    }

    if (wordsLeft < 0) {
      affix = 'too many'
    }
    if (affix === 'too many'){
      return ""
    }
    return `${counter} ${words} ${affix}`
  }

  toGoText(counter, wordsToGo) {
    let words = 'words'
    let affix = 'to go'

    if (counter === 1 || counter === -1) {
      words = 'word'
    }

    if (counter <= 0) {
      words = ''
      counter = ''
    }

    if (wordsToGo <= 0) {
      affix = ''
    }

    return `${counter} ${words} ${affix}`
  }

  render() {
    let {
      value,
      limit,
      minimum,
      name,
      id,
      onBlur,
      onFocus,
      className = '',
      describedby,
      hint,
      rows,
      disabled
    } = this.props
    let { wordsLeft, wordsToGo } = this.state

    let counter = wordsLeft
    if (counter < 0) {
      counter *= -1
    }

    let toGoCounter = wordsToGo
    if (toGoCounter < 0) {
      toGoCounter = 0
    }

    if (limit) {
      className = classNames(className, {
        'under-50': limit <= 50,
        'under-100': limit <= 100 && limit > 50,
        'under-200': limit <= 200 && limit > 100,
        'over-200': limit > 200
      })
    }

    return (
      <div>
        <textarea
          className={className}
          name={name}
          id={id}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-describedby={describedby}
          onChange={this.onChange.bind(this)}
          rows={rows}
          disabled={disabled}
        />
        {limit && (
          <span
            className={`word-count-counter ${styles.wordCount} ${wordsLeft < 0 ? styles.invalid : styles.valid}`}
            aria-live="polite"
          >
            {this.limitText(counter, wordsLeft)}
          </span>
        )}
        {minimum && (
          <span
            className={`word-count-counter ${styles.wordCount} ${wordsToGo < 0 ? styles.invalid : styles.valid}`}
            aria-live="polite"
          >
            {this.toGoText(toGoCounter, wordsToGo)}
          </span>
        )}
      </div>
    )
  }
}

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  rows: PropTypes.string
}

export default Textarea
