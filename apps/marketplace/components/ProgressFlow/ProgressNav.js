import React from 'react'
import PropTypes from 'prop-types'
import AUprogressIndicator from '@gov.au/progress-indicator/lib/js/react.js'
import styles from './ProgressNav.scss'

const ProgressFlow = props => {
  const items = props.items.slice(0)
  const { onNavChange } = props
  items.map(item => {
    const newItem = item
    newItem.onClick = () => {
      onNavChange(item)
    }
    return newItem
  })

  return (
    <div className={styles.progressIndicator}>
      <AUprogressIndicator items={items} />
    </div>
  )
}

ProgressFlow.defaultProps = {
  onNavChange: () => {}
}

ProgressFlow.propTypes = {
  items: PropTypes.array.isRequired,
  onNavChange: PropTypes.func
}

export default ProgressFlow
