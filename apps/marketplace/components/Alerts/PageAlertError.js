import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import styles from './PageAlertError.scss'

class PageAlertError extends Component {
  constructor(props) {
    super(props)

    this.alertRef = React.createRef()
    this.focusAlert = this.focusAlert.bind(this)
  }

  componentDidMount = () => {
    this.focusAlert()
  }

  focusAlert = () => {
    window.scrollTo(0, this.alertRef.offsetTop)
    this.alertRef.focus()
  }

  render = () => {
    const { children } = this.props

    return (
      <div
        ref={ref => {
          this.alertRef = ref
        }}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <AUpageAlert as="error" className={styles.container}>
          <AUheading level="2" size="lg">
            An error occurred
          </AUheading>
          <ul>{children}</ul>
        </AUpageAlert>
      </div>
    )
  }
}

PageAlertError.defaultProps = {
  children: []
}

PageAlertError.propTypes = {
  children: PropTypes.array
}

export default PageAlertError
