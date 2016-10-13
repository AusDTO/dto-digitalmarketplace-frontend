import React, { Component, PropTypes } from 'react'

class Textarea extends Component {
  state = {
    wordsLeft: void 0
  }

  countWords(s: string) {
    //exclude  start and end white-space
    s = s.replace(/(^\s*)|(\s*$)/gi,'')

    //2 or more space to 1
    s = s.replace(/[ ]{2,}/gi,' ')

    // exclude newline with a start spacing
    s = s.replace(/\n /,'\n')

    s = s.replace(/\n/, ' ')

    return s.split(' ').length
  }

  onChange(e) {
    const content = this.refs.textarea.value
    const words = this.countWords(content)
    const { limit } = this.props
    console.log(words)
    this.setState({
      wordsLeft: limit - words,
      maxLength: content.length
    })
  }


  render() {
    const { value, limit } = this.props
    const { wordsLeft = limit, maxLength } = this.state
    return (
      <div>
        <textarea
          ref="textarea"
          defaultValue={value}

          onChange={this.onChange.bind(this)}
        ></textarea>
        {limit ? (
          <span className="limit">{wordsLeft} Remaining</span>
        ) : ''}

      </div>
    )
  }
}

Textarea.propTypes = {
  limit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.string
}

export default Textarea
