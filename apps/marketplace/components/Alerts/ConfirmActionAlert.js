import React, { Component } from 'react'

import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

import styles from './ConfirmActionAlert.scss'

class ConfirmActionAlert extends Component {
  constructor(props) {
    super(props)

    this.actionRef = React.createRef()
    this.alertRef = React.createRef()

    this.focusAlert = this.focusAlert.bind(this)
  }

  componentDidMount = () => {
    this.focusAlert()
  }

  componentDidUpdate = () => {
    this.focusAlert()
  }

  focusAlert = () => {
    window.scrollTo(0, this.alertRef.offsetTop)
    this.actionRef.focus()
  }

  render() {
    const { cancelButtonText, confirmButtonText, content, handleCancelClick, handleConfirmClick, type } = this.props

    return (
      <div
        ref={ref => {
          this.alertRef = ref
        }}
      >
        <AUpageAlert as={type}>
          {content}
          <div className={styles.actionsContainer}>
            <button className="au-btn" onClick={handleConfirmClick}>
              {confirmButtonText}
            </button>
            <button
              className="au-btn au-btn--secondary"
              onClick={handleCancelClick}
              ref={ref => {
                this.actionRef = ref
              }}
            >
              {cancelButtonText}
            </button>
          </div>
        </AUpageAlert>
      </div>
    )
  }
}

export default ConfirmActionAlert
